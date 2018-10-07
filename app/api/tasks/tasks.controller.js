const TaskService = require('../../services/task.service');
const TaskConvertor = require('./task.convertor');

function findAll(callback) {
    TaskService.getAll((error, tasks) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, tasks.map(TaskConvertor.toDto));
    });
}

exports.findAll = findAll;
