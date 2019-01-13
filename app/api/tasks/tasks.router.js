const express = require('express');
const router = express.Router();
const TaskController = require('./tasks.controller');
const Task = require('../../models').Task;
const url = require('url');
const TaskStatus = require('../../models/task-status');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
    res.redirect('/tasks');
});

router.get('/tasks', function (req, res) {
    const queryParams = url.parse(req.url, true).query;
    TaskController.find(queryParams.statusId, function (error, tasks) {
        if (error) throw error;
        res.json(tasks);
    })
});

router.delete('/tasks/:id', function (req, res) {
    Task.destroy({where: {id: req.params.id}})
        .then(res.end())
        .catch(err => {throw err});
});

router.put('/tasks', function (req, res) {
    const taskDto = req.body;
    TaskController.update(taskDto, updatedTaskDto => res.json(updatedTaskDto));
});

router.put('/selectAll', function (req, res) {
    const checked = req.body.checked;
    TaskController.updateAll(checked, tasks => res.json(tasks));
});

router.post('/tasks', function (req, res) {
    const params = {
        title: req.body.title,
        status_id: TaskStatus.NOT_STARTED
    };
    Task.create(params)
        .then(task => res.json(task.dataValues.id))
        .catch(err => {throw err});
});

router.post('/deleteAllCompleted', function (req, res) {
    Task.destroy({where: {id: {[Op.in]: req.body.ids}}})
        .then(res.end())
        .catch(err => {throw err});
});

module.exports = router;