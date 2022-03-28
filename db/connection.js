const { connect } = require('http2');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root',
    database: 'store_db'
})

connection.connect()

module.exports = connection;