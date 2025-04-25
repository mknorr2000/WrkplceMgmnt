import db from "../../../../../lib/db"; // Corrected import path

// Helper function to extract the numeric ID from the URL
const extractIdFromUrl = (url) => {
  const rawId = url.pathname.split("/").slice(-2, -1)[0];
  return rawId.replace(/\D/g, ""); // Remove all non-numeric characters
};

// POST: Create a new booking for a workplace
export async function POST(req) {
  const id = extractIdFromUrl(req.nextUrl);

  let reservation_date;
  try {
    const body = await req.json();
    if (!body || !body.reservation_date) {
      throw new Error("Missing or invalid reservation_date in request body");
    }
    reservation_date = body.reservation_date;
  } catch (err) {
    console.error("Error parsing request body:", err);
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const user_id = 1; // Placeholder for user ID (replace with actual user authentication logic)

  try {
    // Check if the workplace is already booked for the given date
    const [existingReservations] = await db.query(
      "SELECT * FROM reservations WHERE seat_id = ? AND reservation_date = ?",
      [id, reservation_date]
    );

    if (existingReservations.length > 0) {
      return new Response(
        JSON.stringify({
          error: "Workplace is already booked for the selected date",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Insert the new reservation into the reservations table
    const [result] = await db.query(
      "INSERT INTO reservations (user_id, seat_id, reservation_date, created_at, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
      [user_id, id, reservation_date]
    );

    if (!result.insertId) {
      throw new Error("Database insertion failed");
    }

    const newBooking = {
      booking_id: result.insertId,
      user_id,
      seat_id: id,
      reservation_date,
    };

    return new Response(JSON.stringify(newBooking), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error creating booking:", err); // Log the error details
    return new Response(JSON.stringify({ error: "Error creating booking" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
