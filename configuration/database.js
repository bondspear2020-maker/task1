const mysql = require('mysql2/promise');

const database = mysql.createPool({
    host: 'mysql',
    port: 3306,
    user: 'maksarovd',
    password: '1',
    database: 'database',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = database;