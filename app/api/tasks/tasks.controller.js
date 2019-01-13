const TaskConverter = require('./task.converter');
const StatusConverter = require('../statuses/status.converter');
const TaskService = require('../../services/task.service');
const Task = require('../../models').Task;
const Status = require('../../models').Status;

function find(statusId, callback) {
    TaskService.find(statusId,
        function (error, tasks) {
            if (error) throw error;
            callback(null, tasks);
        }
    )
}

function findById(id, callback) {
    Task.findByPk(id, {include: {model: Status, as: 'status'}})
        .then(task => TaskConverter.toDto(task))
        .then(callback);
}

function update(taskDto, callback) {
    TaskConverter.toModel(taskDto, function (model) {
        TaskService.update(model, updatedTask => callback(TaskConverter.toDto(updatedTask)));
    });
}

function updateAll(status, callback) {
    StatusConverter.toModel(status, function (statusModel) {
        TaskService.updateAll(statusModel.id, updatedTasks =>
            callback(updatedTasks));
    });
}

exports.find = find;
exports.findById = findById;
exports.update = update;
exports.updateAll = updateAll;

