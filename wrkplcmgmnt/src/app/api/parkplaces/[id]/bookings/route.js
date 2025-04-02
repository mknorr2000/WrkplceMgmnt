import db from '../../../../../lib/db'; // Corrected import path

// Helper function to extract the ID from the URL
const extractIdFromUrl = (url) => url.pathname.split('/').slice(-2, -1)[0];

// POST: Create a new booking for a parking place
export async function POST(req) {
  const id = extractIdFromUrl(req.nextUrl);
  const { start_time, end_time } = await req.json();

  const user_id = 1; // Hardcoded user_id = 1, as user functionality is not implemented yet

  try {
    const [result] = await db.query(
      'INSERT INTO reservations (user_id, parkplace_id, reservation_date, start_time, end_time) VALUES (?, ?, CURDATE(), ?, ?)',
      [user_id, id, start_time, end_time]
    );

    const newBooking = {
      booking_id: result.insertId,
      user_id,
      parkplace_id: id,
      start_time,
      end_time,
    };

    return new Response(JSON.stringify(newBooking), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error creating booking' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}