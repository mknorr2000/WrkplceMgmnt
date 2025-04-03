import db from '../../../../../lib/db'; // Corrected import path

// Helper function to extract the numeric ID from the URL
const extractIdFromUrl = (url) => {
  const rawId = url.pathname.split('/').slice(-2, -1)[0];
  return rawId.replace(/\D/g, ''); // Remove all non-numeric characters
};

// POST: Create a new booking for a parking place
export async function POST(req) {
  const id = extractIdFromUrl(req.nextUrl);

  let reservation_date;
  try {
    const body = await req.json();
    if (!body || !body.reservation_date) {
      throw new Error("Missing or invalid reservation_date in request body");
    }
    reservation_date = body.reservation_date;
    console.log(`Received booking request for parkplace_id=${id} on reservation_date=${reservation_date}`);
  } catch (err) {
    console.error("Error parsing request body:", err);
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const user_id = 1; // Placeholder for user ID (replace with actual user authentication logic)

  try {
    // Check if the parking spot is already booked for the given date
    const [existingReservations] = await db.query(
      'SELECT * FROM reservations WHERE parkplace_id = ? AND reservation_date = ?',
      [id, reservation_date]
    );

    console.log(`Existing reservations for parkplace_id=${id} on reservation_date=${reservation_date}:`, existingReservations);

    if (existingReservations.length > 0) {
      console.error(`Parking spot ${id} is already booked for ${reservation_date}`);
      return new Response(JSON.stringify({ error: 'Parking spot is already booked for the selected date' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Insert the new reservation into the reservations table
    const [result] = await db.query(
      'INSERT INTO reservations (user_id, parkplace_id, reservation_date, created_at, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
      [user_id, id, reservation_date]
    );

    console.log("Insert result:", result);

    if (!result.insertId) {
      console.error("Failed to insert new reservation into the database");
      throw new Error("Database insertion failed");
    }

    const newBooking = {
      booking_id: result.insertId,
      user_id,
      parkplace_id: id,
      reservation_date,
    };

    console.log("New booking created successfully:", newBooking);

    return new Response(JSON.stringify(newBooking), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error creating booking:", err); // Log the error details
    return new Response(JSON.stringify({ error: 'Error creating booking' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}