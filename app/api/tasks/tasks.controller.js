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

function remove(id, callback){
    TaskService.remove(id, (error) => {
        callback(error)
    });
}

exports.findAll = findAll;
exports.remove = remove;
