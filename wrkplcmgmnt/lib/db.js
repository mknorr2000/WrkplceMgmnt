import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Geirby1799!11042",
  database: "database",
});

export default db;
