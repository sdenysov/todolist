const connectionPool = require('../models');
const Task = require('../models/task.model');
const dbUtils = require('../utils/db.utils');
const dataStructureUtils = require('../utils/data-structure.utils');

function getAll(callback) {
    //let sql = "SELECT t.id, t.description, s.name as status FROM tasks t LEFT JOIN status s ON t.id = s.task_id";
    let allTasksSql = "SELECT * FROM tasks";
    let allStatusesSql = "SELECT * FROM statuses";
    connectionPool.getConnection(function(error, connection) {
        if (dbUtils.handleError(error, connection, callback)) return;
        connection.query(allTasksSql, function (error, taskRecords, taskFields) {
            connection.query(allStatusesSql, function (error, statusRecords, statusFields) {
                if (dbUtils.handleError(error, connection, callback)) return;
                connection.release();
                callback(null, createTasks(taskRecords, statusRecords));
            });
        });
    });
}

// function create(inputText) {
//     console.log("Connected post!");
//     let taskDescription = {description: inputText};
//     connection.query("INSERT INTO tasks SET ?", taskDescription, function (err) {
//         if (err) throw err;
//         connection.query("INSERT INTO status (name, task_id) SELECT 'Unresolved', MAX(id) FROM tasks", function (err) {
//             if (err) throw err;
//         });
//     });
// }
//
// function remove(id) {
//     connection.query("DELETE FROM tasks WHERE id =" + id, function (err) {
//         if (err) throw err;
//         connection.query("DELETE FROM status WHERE task_id =" + id, function (err) {
//             if (err) throw err;
//         })
//     });
// }
//
// function countToDoTasks(tasksData, callback){
//     connection.query("SELECT tasks_to_do FROM (SELECT count(Id) AS tasks_to_do FROM sd.status where name = 'Unresolved') AS a", function (err, tasksToDo) {
//         console.log(tasksToDo[0].tasks_to_do);
//         err ? callback(err) : callback(null, tasksToDo[0].tasks_to_do, tasksData)
//     });
// }

exports.getAll = getAll;
// exports.create = create;
// exports.remove = remove;

function createTasks(taskRecords, statusRecords) {
    const statuses = dataStructureUtils.normalize(statusRecords);
    taskRecords.map(taskRecord => {
        return  new Task({
            id: taskRecord.id,
            description: taskRecord.description,
            status: statuses[taskRecord['status_id']]
        });
    });
}
