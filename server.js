let app = require('./app/app');
let http = require('http');
let server = http.createServer(app);

server.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});