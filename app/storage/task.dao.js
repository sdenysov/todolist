const connectionPool = require('../models');
const Task = require('../models/task.model');
const Status = require('../models/status.model');
const dbUtils = require('../utils/db.utils');

function getAll(callback) {
    const allTasksSql = "SELECT * FROM all_tasks_view;";
    connectionPool.query(allTasksSql, function (error, results) {
        if (dbUtils.breakIfErrorExists(error, callback)) return;
        callback(null, createTasks(results));
    })
}

function remove(id, callback) {
    const removeTaskByIdSql = "DELETE FROM tasks WHERE id = ?";
    connectionPool.query(removeTaskByIdSql, id, function (error) {
        if (dbUtils.breakIfErrorExists(error, callback)) return;
        callback();
    });
}

function update(taskData, callback) {
    const updateTaskByIdSql = "UPDATE `tasks` SET `title` = ? WHERE `id` = ?";
    connectionPool.query(updateTaskByIdSql, [taskData.taskTitle, taskData.id], function (error) {
        if (dbUtils.breakIfErrorExists(error, callback)) return;
        callback();
    });
}

function insert(task, callback) {
    const insertTaskSql = "INSERT INTO `tasks` SET `title` = ?, `status_id` = 1";
    connectionPool.query(insertTaskSql, task, function (error) {
        if (dbUtils.breakIfErrorExists(error, callback)) return;
        callback();
    });
}

exports.getAll = getAll;
exports.remove = remove;
exports.update = update;
exports.insert = insert;

function createTasks(records) {
    return records.map(record => {
        return new Task({
            id: record.id,
            title: record.title,
            status: new Status({
                id: record['status_id'],
                name: record['status_name']
            })
        });
    });
}
