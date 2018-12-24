const express = require('express');
const router = express.Router();
const taskController = require('./tasks.controller');
const TaskDao = require('../../storage/task.dao');

router.get('/', (req, res) => {
    res.redirect('/tasks');
});

router.get('/tasks', function (req, res) {
    taskController.findAll(function (error, tasks) {
        if (error) throw error;
        res.json(tasks);
    })
});

router.delete('/tasks/:id', function (req, res) {
    TaskDao.remove(req.params.id, function (error) {
        if (error) throw error;
        res.end();
    });
});

router.put('/tasks', function (req, res) {
    const dataToUpdate = req.body;
    TaskDao.update(dataToUpdate, function (error) {
        if (error) throw error;
        res.end();
    });
});

router.post('/tasks', function (req, res) {
    const taskData = {title: req.body.title};
    TaskDao.insert(taskData, function (error, insertId) {
        if (error) throw error;
        res.json(insertId);
    });
});

module.exports = router;