import db from "../../../../lib/db";

// GET: Alle gebuchten Arbeitsplätze für ein bestimmtes Datum abrufen
export async function GET(req) {
  try {
    const date = req.nextUrl.searchParams.get("date");
    if (!date) {
      return new Response(
        JSON.stringify({ error: "Date parameter is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const [results] = await db.query(
      "SELECT seat_id FROM reservations WHERE reservations_date = ? AND seat_id IS NOT NULL",
      [date]
    );

    const bookedWorkplaces = results.map((row) => row.seat_id);

    return new Response(JSON.stringify(bookedWorkplaces), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching booked workplaces:", err);
    return new Response(
      JSON.stringify({ error: "Error fetching booked workplaces" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
