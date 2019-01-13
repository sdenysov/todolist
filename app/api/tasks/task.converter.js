const TaskStatus = require('../../models/task-status');
const Task = require('../../models').Task;
const StatusConverter = require('../statuses/status.converter');
const Status = require('../../models').Status;

module.exports = {
    toDto: function(task) {
        return {
            id: parseInt(task.id),
            title: task.title,
            checked: task.status_id === TaskStatus.COMPLETED
        };
    },
    toModel: function(taskDto, callback) {
        StatusConverter.toModel(taskDto.checked, function (status) {
            const task = Task.build(
                {
                id: taskDto.id,
                title: taskDto.title,
                status_id: status.id
            });
            callback(task);
        });
    }
};
