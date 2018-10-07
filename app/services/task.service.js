const TaskDao = require('../storage/task.dao');

function getAll(callback) {
    TaskDao.getAll((error, tasks) => {
        callback(error, tasks)
    });
}

module.exports.getAll = getAll;