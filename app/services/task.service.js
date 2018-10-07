const TaskDao = require('../storage/task.dao');

function getAll(callback) {
    TaskDao.getAll((error, tasks) => {
        callback(error, tasks)
    });
}

function remove(id, callback) {
    TaskDao.remove(id, (error) => {
        callback(error)
    });
}

module.exports.getAll = getAll;
module.exports.remove = remove;