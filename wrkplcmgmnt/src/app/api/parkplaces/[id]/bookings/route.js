import db from '../../../../../lib/db'; // Corrected import path

// Helper function to extract the numeric ID from the URL
const extractIdFromUrl = (url) => {
  const rawId = url.pathname.split('/').slice(-2, -1)[0];
  return rawId.replace(/\D/g, ''); // Remove all non-numeric characters
};

// POST: Create a new booking for a parking place
export async function POST(req) {
  const id = extractIdFromUrl(req.nextUrl); // Extract numeric ID
  const { reservation_date } = await req.json(); // Only reservation_date is needed

  const user_id = 1; // Hardcoded user_id = 1, as user functionality is not implemented yet

  try {
    // Check if the parking spot is available
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

    // Insert the booking into the reservations table
    const [result] = await db.query(
      'INSERT INTO reservations (user_id, parkplace_id, reservation_date, created_at, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
      [user_id, id, reservation_date]
    );

    // Update the status of the parking spot in the parkplaces table
    await db.query(
      'UPDATE parkplaces SET is_available = "0" WHERE id = ?',
      [id]
    );

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
  } catch (err) {
    console.error('Error creating booking:', err); // Log the error for debugging
    return new Response(JSON.stringify({ error: 'Error creating booking' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}