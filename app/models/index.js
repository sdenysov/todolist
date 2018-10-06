let mysql = require('mysql');
let pool = mysql.createPool({
    connectionLimit : 10,
    waitForConnections: true,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'sd'
});

pool.on('connection', function (connection) {
    console.log('Connected: connection id: ', connection.id);
});

module.exports = pool;