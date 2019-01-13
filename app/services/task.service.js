const TaskConverter = require('../api/tasks/task.converter');
const Task = require('../models').Task;
const Status = require('../models').Status;


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

function update(task, callback) {
    Task.update({
            title: task.title,
            status_id: task.status_id
        },
        {where: {id: task.id}}).then(function () {
        callback(task);
    });
}

function updateAll(statusId, callback) {
    Task.update({
        status_id: statusId
    }, {where: {}}).then(function () {
       find(null, function (err, tasks){
        if (err) throw err;
        callback(tasks);
       })
    })
}

exports.find = find;
exports.update = update;
exports.updateAll = updateAll;
