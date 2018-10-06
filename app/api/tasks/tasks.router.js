let express = require('express');
let router = express.Router();
let controller = require('./tasks.controller');

router.get('/', (req, res) => {
    res.redirect('/tasks');
});
router.get('/tasks', controller.findAll);
/*router.post('/tasks', controller.create);
router.delete('/tasks', controller.remove);*/

module.exports = router;