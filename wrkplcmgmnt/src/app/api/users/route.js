import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "Geirby1799!11042",
  database: process.env.DB_NAME || "database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// GET: Fetch all users from the database
export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, email, role, department FROM users"
    );
    return NextResponse.json(rows);
  } catch (error) {
    // Return a 500 error response if something goes wrong
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new user in the database
export async function POST(req) {
  try {
    const { email, department, password } = await req.json();
    const role = "user"; // Default role for new users

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Insert the new user into the database
    const [result] = await pool.query(
      "INSERT INTO users (email, role, department, password) VALUES (?, ?, ?, ?)",
      [email, role, department, password]
    );

    // Return a success response with the new user's ID
    return NextResponse.json(
      { message: "User created", id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    // Return a 500 error response if something goes wrong
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Delete a user from the database
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    // Validate that the ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    // Delete the user with the specified ID
    await pool.query("DELETE FROM users WHERE id = ?", [id]);

    // Return a success response
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    // Return a 500 error response if something goes wrong
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
