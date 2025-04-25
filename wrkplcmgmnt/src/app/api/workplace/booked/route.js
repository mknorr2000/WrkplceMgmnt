import db from "../../../../lib/db";

// GET: Fetch all booked workplaces for a specific date
export async function GET(req) {
  try {
    // Extract the date from the query parameters
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

    // Fetch workplaces booked for the given date
    const [results] = await db.query(
      "SELECT seat_id FROM reservations WHERE reservation_date = ? AND seat_id IS NOT NULL",
      [date]
    );

    // Map the results to an array of IDs
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
