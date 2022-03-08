const mysql = require('mysql2');
require("dotenv").config();

// connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: process.env.USER_DB_PASSWORD,
  database: 'management'
});

module.exports = db;