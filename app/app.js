let path = require('path');
let ejsLocals = require('ejs-locals');
let express = require('express');
let cookieParser = require('cookie-parser');
let router = require('./api/tasks/tasks.router');
let app = express();
let bodyParser = require('body-parser');

// view engine setupq
app.engine('ejs', ejsLocals);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('./static'));

app.use('/api/', router);
app.use(/\/.+/, function (req, res) {
    res.redirect('/');
});
app.use('/', function (req, res) {
    res.render('index');
});

module.exports = app;

