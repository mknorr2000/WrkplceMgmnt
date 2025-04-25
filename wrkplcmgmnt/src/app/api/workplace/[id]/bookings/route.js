import db from "../../../../../lib/db";

const extractIdFromUrl = (url) => {
  const rawId = url.pathname.split("/").slice(-2, -1)[0];
  return rawId.replace(/\D/g, ""); // Extract numeric ID
};

export async function POST(req) {
  const id = extractIdFromUrl(req.nextUrl);

  let reservations_date;
  try {
    const body = await req.json();
    if (!body || !body.reservations_date) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid reservations_date" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    reservations_date = body.reservations_date;
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const user_id = 1; // Hardcoded user ID for testing

  try {
    // Check if the workplace is already booked for the given date
    const [existingReservations] = await db.query(
      "SELECT * FROM reservations WHERE seat_id = ? AND reservation_date = ?",
      [id, reservations_date]
    );

    if (existingReservations.length > 0) {
      return new Response(
        JSON.stringify({
          error: "Workplace is already booked for the selected date",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Insert the new reservation into the reservations table
    const [result] = await db.query(
      "INSERT INTO reservations (user_id, seat_id, reservation_date, created_at, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
      [user_id, id, reservations_date]
    );

    if (!result.insertId) {
      return new Response(
        JSON.stringify({ error: "Database insertion failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        booking_id: result.insertId,
        user_id,
        seat_id: id,
        reservations_date,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Error creating booking" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
