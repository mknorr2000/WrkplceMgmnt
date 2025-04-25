import db from "../../../lib/db";

// GET: Alle Arbeitsplätze aus der Datenbank abrufen
export async function GET() {
  try {
    const [workplaces] = await db.query("SELECT * FROM workplaces");

    return new Response(JSON.stringify(workplaces), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching workplaces:", err);
    return new Response(
      JSON.stringify({ error: "Error fetching workplaces" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
