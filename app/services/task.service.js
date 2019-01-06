const Task = require('../models').Task;

module.exports = {
    update: function (task, callback) {
        Task.update({
            title: task.title,
            status_id: task.status_id
        }, {where: {id: task.id}}).then(function () {
            callback(task);
        });
    }
};