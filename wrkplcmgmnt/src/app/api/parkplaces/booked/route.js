import db from '../../../../lib/db'; // Adjust the path to your database connection

// GET: Fetch all booked parking spots for a specific date
export async function GET(req) {
  try {
    // Extract the date from the query parameters
    const date = req.nextUrl.searchParams.get('date');
    if (!date) {
      return new Response(JSON.stringify({ error: 'Date parameter is required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch parking spots booked for the given date
    const [results] = await db.query(
      'SELECT parkplace_id FROM reservations WHERE reservation_date = ?',
      [date]
    );

    console.log('Raw query results for date', date, ':', results); // Log the raw query results for debugging

    // Map the results to an array of IDs
    const bookedParkplaces = results.map((row) => row.parkplace_id);

    console.log('Booked parking spots for date', date, ':', bookedParkplaces); // Log the fetched data for debugging

    return new Response(JSON.stringify(bookedParkplaces), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error('Error fetching booked parking spots:', err); // Log the error for debugging
    return new Response(JSON.stringify({ error: 'Error fetching booked parking spots' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
