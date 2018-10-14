let express = require('express');
let router = express.Router();
let taskController = require('./tasks.controller');

router.get('/', (req, res) => {
    res.redirect('/tasks');
});
router.get('/tasks', function(req, res) {
    renderTaskPage(req, res);
});
router.delete('/tasks/:id', function(req, res) {
    const id = req.params.id;
    taskController.remove(id, function(error) {
        if (error) throw error;
        res.end();
    })
});
router.post('/tasks/:id', function(req, res) {
    const id = req.params.id;
    const taskTitle = req.body.taskTitle;
    let dataToUpdate = {id: id, taskTitle: taskTitle};
    taskController.update(dataToUpdate, function(error) {
        if (error) throw error;
        res.end();
    })
});
router.post('/tasks', function(req, res) {
    const taskTitle = req.body.newTask;
    taskController.insert(taskTitle, function(error) {
        if (error) throw error;
        renderTaskPage(req, res);
    })
});
function renderTaskPage (req, res){
    taskController.findAll(function(error, tasks) {
        if (error) throw error;
        res.render('index', {tasks: tasks});
    })
}

module.exports = router;