import db from '@/lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id');

  if (!user_id) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Fetch reservations from the database using the same logic as parkplaces API
    const query = `SELECT * FROM reservations WHERE user_id = ?`;
    const reservations = await db.query(query, [user_id]);

    return new Response(JSON.stringify(reservations), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch reservations' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}