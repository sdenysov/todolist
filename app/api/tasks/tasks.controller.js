/*let DBService = require('./DBService');*/
const TaskDao = require('../../storage/task.dao');

function findAll(req, res) {
    TaskDao.getAll((err, tasksData) => {
        if (err) throw err;
        /*DBService.countToDoTasks(tasksData, (err, tasksToDo, tasksData) => {
            if (err) throw err;
            res.render('index', {tasksData: tasksData, tasksToDo: tasksToDo});
        })*/
        res.render('index', {tasksData: tasksData});
    });
}
/*

function create(req, res) {
    let taskDescription = req.body.newTask;
    console.log(taskDescription);
    DBService.addNewTask(taskDescription, (err) => {
        if (err) throw err;
        res.redirect('/tasks');
    });
}

function remove(req, res) {
    let id = req.body.task_id;
    DBService.deleteTaskById(id, (err) => {
        if (err) throw err;
        res.redirect('/tasks');
    });
}
*/

exports.findAll = findAll;
/*
exports.create = create;
exports.remove = remove;*/
