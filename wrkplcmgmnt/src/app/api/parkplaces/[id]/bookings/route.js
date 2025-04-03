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
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const user_id = 1;

  try {
    const [availabilityCheck] = await db.query(
      'SELECT is_available FROM parkplaces WHERE id = ?',
      [id]
    );

    if (!availabilityCheck.length || availabilityCheck[0].is_available === "0") {
      return new Response(JSON.stringify({ error: 'Parking spot is not available' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const [result] = await db.query(
      'INSERT INTO reservations (user_id, parkplace_id, reservation_date, created_at, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
      [user_id, id, reservation_date]
    );

    const [updateResult] = await db.query(
      'UPDATE parkplaces SET is_available = "0" WHERE id = ?',
      [id]
    );

    if (updateResult.affectedRows === 0) {
      return new Response(JSON.stringify({ error: 'Failed to update parking spot availability' }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newBooking = {
      booking_id: result.insertId,
      user_id,
      parkplace_id: id,
      reservation_date,
    };

    return new Response(JSON.stringify(newBooking), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Error creating booking' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}