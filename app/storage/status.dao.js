// const connectionPool = require('../models');
// const Status = require('../models/status.model');
//
// function get(id, callback) {
//     let sql = "SELECT * FROM status";
//     connectionPool.query(sql, function (error, results, fields) {
//         if (error) throw error;
//         let tasks = [];
//         error ? callback(error) : callback(null, tasksData)
//     });
// }
//
// function getAll(callback) {
//     //let sql = "SELECT t.id, t.description, s.name as status FROM tasks t LEFT JOIN status s ON t.id = s.task_id";
//     let sql = "SELECT * FROM tasks";
//     connectionPool.query(sql, function (error, results, fields) {
//         if (error) throw error;
//         let tasks = [];
//         error ? callback(error) : callback(null, tasksData)
//     });
// }
//
// function create(inputText) {
//     console.log("Connected post!");
//     let taskDescription = {description: inputText};
//     connection.query("INSERT INTO tasks SET ?", taskDescription, function (err) {
//         if (err) throw err;
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
//
// exports.get = get;
// exports.getAll = getAll;
// exports.create = create;
// exports.remove = remove;
//
// function createStatus(record) {
//     console.log(record);
//     let task = new TaskDto(record);
//
// }
