const TaskConverter = require('./task.convertor');
const TaskDao = require('../../storage/task.dao');

function findAll(callback) {
    TaskDao.getAll((error, tasks) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, tasks.map(TaskConverter.toDto));
    });
}

exports.findAll = findAll;
