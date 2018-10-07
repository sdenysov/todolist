let express = require('express');
let router = express.Router();
let taskController = require('./tasks.controller');

router.get('/', (req, res) => {
    res.redirect('/tasks');
});
router.get('/tasks', function(req, res) {
    taskController.findAll(function(error, tasks) {
        if (error) throw error;
        res.render('index', {tasks: tasks});
    })
});
router.delete('/tasks/:id', function(req, res) {
    const id = ''; //TODO get id from req url params
    // taskController.remove(id, function(error) {
    //     if (error) throw error;
    //     taskController.findAll(function(error, tasks) {
    //         if (error) throw error;
    //         res.render('index', {tasks: tasks});
    //     })
    // })
});

module.exports = router;