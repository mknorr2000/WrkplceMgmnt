// src/lib/db.js

import mysql from 'mysql2/promise'; // MySQL-Connection mit Promises

// Create a connection pool to the MySQL database
const db = mysql.createPool({
  host: 'localhost',    // Your MySQL-Host 
  user: 'root',         // Your mySQL-Username 
  password: 'Geirby1799!11042', // Your mySQL-Password
  database: 'database', // Your mySQL-Database 
});

export default db;