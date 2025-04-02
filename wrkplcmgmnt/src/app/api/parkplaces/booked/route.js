import db from '../../../../lib/db'; // Adjust the path to your database connection

// GET: Fetch all booked parking spots
export async function GET() {
  try {
    // Fetch parking spots where is_available = "0"
    const [results] = await db.query(
      'SELECT id AS parkplace_id FROM parkplaces WHERE is_available = "0"'
    );

    console.log('Raw query results:', results); // Log the raw query results for debugging

    // Update all rows to set is_available = "1"
    await db.query('UPDATE parkplaces SET is_available = "1"');

    // Map the results to an array of IDs
    const bookedParkplaces = results.map((row) => row.parkplace_id);

    console.log('Booked parking spots:', bookedParkplaces); // Log the fetched data for debugging

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
