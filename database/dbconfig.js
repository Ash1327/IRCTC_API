
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ash@1321",
  database: "irctc",
  waitForConnections: true,
  connectionLimit: 10,
queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the database');
    connection.release(); 
  }
});

module.exports = pool.promise();
