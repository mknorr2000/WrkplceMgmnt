import db from '../../../lib/db'; // Corrected import path

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Query the database for the user with the provided email and password
    const [users] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    if (users.length > 0) {
      return new Response(JSON.stringify({ success: true, message: "Login successful" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
