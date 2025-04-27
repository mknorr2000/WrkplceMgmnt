import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return NextResponse.json(
      { message: "Missing or invalid Authorization header" },
      { status: 401 }
    );
  }

  const base64Credentials = authHeader.split(" ")[1];
  const decodedCredentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [email, password] = decodedCredentials.split(":");

  try {
    // Datenbankabfrage: Benutzer mit der angegebenen E-Mail abrufen
    const [rows] = await db.query(
      "SELECT id, email, password, role FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = rows[0];

    // Erstelle die Basic-Zeichenkette aus den Datenbankwerten
    const dbCredentials = Buffer.from(
      `${user.email}:${user.password}`
    ).toString("base64");

    // Vergleiche die Basic-Zeichenkette mit der vom Benutzer gesendeten
    if (base64Credentials === dbCredentials) {
      return NextResponse.json({
        success: true,
        message: "Authentication successful",
        role: user.role, // Gebe die Benutzerrolle zurück
        userId: user.id, // Gebe die Benutzer-ID zurück
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during authentication" },
      { status: 500 }
    );
  }
}
