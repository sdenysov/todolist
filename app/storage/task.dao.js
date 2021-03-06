const connectionPool = require('../models');
const Task = require('../models/task.model');
const Status = require('../models/status.model');
const dbUtils = require('../utils/db.utils');

function getAll(callback) {
    const allTasksSql = "SELECT * FROM all_tasks_view;";
    connectionPool.getConnection(function (error, connection) {
        if (dbUtils.breakIfErrorExists(error, callback)) return;
        connection.query(allTasksSql, function (error, results) {
            if (dbUtils.breakIfErrorExists(error, callback)) return;
            callback(null, createTasks(results));
            connection.release();
        });
    });
}

function remove(id, callback) {
    const removeTaskByIdSql = "DELETE FROM tasks WHERE id = ?";
    connectionPool.getConnection(function (error, connection) {
        if (dbUtils.breakIfErrorExists(error, callback)) return;
        connection.query(removeTaskByIdSql, id, function (error) {
            if (dbUtils.breakIfErrorExists(error, callback)) return;
            callback();
            connection.release();
        });
    });
}

exports.getAll = getAll;
exports.remove = remove;

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
