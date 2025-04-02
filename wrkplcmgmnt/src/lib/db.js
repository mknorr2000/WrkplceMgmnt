// src/lib/db.js

import mysql from 'mysql2/promise'; // MySQL-Verbindung mit Promises

// Erstelle eine Verbindung zur MySQL-Datenbank
const db = mysql.createPool({
  host: 'localhost',    // Deine Host-Adresse (z.B. localhost oder IP)
  user: 'root',         // Dein MySQL-Benutzername
  password: 'Geirby1799!11042', // Dein MySQL-Passwort
  database: 'database', // Der Name deiner Datenbank
});

export default db;