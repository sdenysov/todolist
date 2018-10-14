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

function remove(id, callback){
    TaskDao.remove(id, (error) => {
        callback(error)
    });
}

function update(dataToUpdate, callback){
    TaskDao.update(dataToUpdate, (error) => {
        callback(error)
    });
}

function insert(task, callback){
    TaskDao.insert(task, (error) => {
        callback(error)
    });
}

exports.findAll = findAll;
exports.remove = remove;
exports.update = update;
exports.insert = insert;
