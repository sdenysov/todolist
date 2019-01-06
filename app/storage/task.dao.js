// const connectionPool = require('../models');
// const Task = require('../models/task.model');
// const Status = require('../models/status.model');
// const dbUtils = require('../utils/db.utils');
//
// function get(statusId, callback) {
//     let sql = "SELECT * FROM all_tasks_view";
//     if (statusId) {
//         sql += ' WHERE status_id = ?';
//     }
//     sql += ';';
//     let params = statusId ? [+statusId] : [];
//     connectionPool.query(sql, params, function (error, results) {
//         if (dbUtils.breakIfErrorExists(error, callback)) return;
//         callback(null, createTasks(results));
//     });
// }
//
// function remove(id, callback) {
//     const removeTaskByIdSql = "DELETE FROM tasks WHERE id = ?";
//     connectionPool.query(removeTaskByIdSql, id, function (error) {
//         if (dbUtils.breakIfErrorExists(error, callback)) return;
//         callback();
//     });
// }
//
// function update(dataToUpdate, callback) {
//     const updateTaskByIdSql = "UPDATE tasks" +
//         " SET title = ?, status_id = ?" +
//         " WHERE id = ?";
//     let values = [dataToUpdate.title, dataToUpdate.status_id, dataToUpdate.id];
//     connectionPool.query(updateTaskByIdSql, values, function (error) {
//         if (dbUtils.breakIfErrorExists(error, callback)) return;
//         callback();
//     });
// }
//
// function insert(taskData, callback) {
//     const insertTaskSql = "INSERT INTO `tasks` SET `title` = ?, `status_id` = 1";
//     connectionPool.query(insertTaskSql, taskData.title, function (error, results) {
//         if (dbUtils.breakIfErrorExists(error, callback)) return;
//         callback(null, results.insertId);
//     });
// }
//
// exports.get = get;
// exports.remove = remove;
// exports.update = update;
// exports.insert = insert;
//
// function createTasks(records) {
//     return records.map(record => {
//         return new Task({
//             id: record.id,
//             title: record.title,
//             status: new Status({
//                 id: record['status_id'],
//                 name: record['status_name']
//             })
//         });
//     });
// }
