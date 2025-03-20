// src/api/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // Dein MySQL-Benutzername
  password: 'Geirby1799!11042', // Dein MySQL-Passwort
  database: 'database', // Deine MySQL-Datenbankname
});

db.connect((err) => {
  if (err) {
    console.error('Fehler bei der Verbindung zur Datenbank:', err);
  } else {
    console.log('Datenbankverbindung hergestellt');
  }
});

// Stelle sicher, dass du db nicht schließt, da du sie für weitere Anfragen verwendest
module.exports = db;  // Datenbankverbindung exportieren
