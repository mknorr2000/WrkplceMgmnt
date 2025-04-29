import db from "@/lib/db";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return new Response(
        JSON.stringify({ message: "Missing or invalid Authorization header" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const credentials = atob(authHeader.split(" ")[1]).split(":");
    const [email, password] = credentials;

    const [rows] = await db.query(
      "SELECT id, role FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const user = rows[0];
    return new Response(JSON.stringify({ userId: user.id, role: user.role }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in auth route:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
