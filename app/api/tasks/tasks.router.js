const express = require('express');
const router = express.Router();
const TaskController = require('./tasks.controller');
const Task = require('../../models').Task;
const url = require('url');
const TaskService = require('../../services/task.service');

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
    Task.destroy({
        where: {
            id: req.params.id
        }
    }).then(res.end())
        .catch(err => err);
    // TaskDao.remove(req.params.id, function (error) {
    //     if (error) throw error;
    //     res.end();
    // });
});

router.put('/tasks', function (req, res) {
    const taskDto = req.body;
    TaskController.update(taskDto, updatedTaskDto => res.json(updatedTaskDto));
});

router.post('/tasks', function (req, res) {
    /*const taskData = {title: req.body.title};*/
    Task.create({
        title: req.body.title,
        status_id: 1
    }).then(task => res.json(task.dataValues.id))
        .catch(err => err);
    // TaskDao.insert(taskData, function (error, insertId) {
    //     if (error) throw error;
    //     res.json(insertId);
    // });
});

module.exports = router;