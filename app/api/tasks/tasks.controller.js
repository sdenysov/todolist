const TaskConverter = require('./task.convertor');
const TaskService = require('../../services/task.service');
const Task = require('../../models').Task;
const Status = require('../../models').Status;

function find(statusId, callback) {
    const params = {include: {model: Status, as: 'status'}};
    if (statusId) {
        params.where = {status_id: statusId};
    }
    Task.findAll(params)
        .then(function (tasks) {
            return callback(null, tasks.map(TaskConverter.toDto))
        })
        .catch(function (err) {
            return callback(err)
        });
}

function findById(id, callback) {
    Task.findByPk(id, {include: {model: Status, as: 'status'}})
        .then(task => TaskConverter.toDto(task))
        .then(callback);
}

function update(taskDto, callback) {
    const taskModelForUpdate = TaskConverter.toModel(taskDto);
    TaskService.update(taskModelForUpdate, callback);
}

exports.find = find;
exports.findById = findById;
exports.update = update;
