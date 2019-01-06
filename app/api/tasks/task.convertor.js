const TaskStatus = require('../../models/task-status');
const Task = require('../../models').Task;

module.exports = {
    toDto: function(task) {
        return {
            id: task.id,
            title: task.title,
            checked: task.status.name === TaskStatus.COMPLETED
        };
    },
    toModel: function(taskDto) {
        return new Task(taskDto);
    }
};
