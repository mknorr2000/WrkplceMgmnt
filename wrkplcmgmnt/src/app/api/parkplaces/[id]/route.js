// app/api/parkplaces/[id]/route.js

import db from '../../../../lib/db'; // Import the database connection

// Helper function to extract the ID from the URL
const extractIdFromUrl = (url) => url.pathname.split('/').pop();

// GET: Retrieve a specific parking place by ID
export async function GET(req) {
  const id = extractIdFromUrl(req.nextUrl);

  try {
    const [rows] = await db.query('SELECT * FROM parkplaces WHERE id = ?', [id]);

    if (!Array.isArray(rows) || rows.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Parking place not found' }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error('Error fetching parking place:', err.message);
    return new Response(
      JSON.stringify({ error: 'Error fetching parking place' }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// PUT: Update a specific parking place
export async function PUT(req) {
  const id = extractIdFromUrl(req.nextUrl);
  const { parkplace_number, description, is_available } = await req.json();

  try {
    const [result] = await db.query(
      'UPDATE parkplaces SET parkplace_number = ?, description = ?, is_available = ? WHERE id = ?',
      [parkplace_number, description, is_available, id]
    );

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ error: 'Parking place not found' }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedParkplace = { id, parkplace_number, description, is_available };
    return new Response(JSON.stringify(updatedParkplace), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error('Error updating parking place:', err.message);
    return new Response(
      JSON.stringify({ error: 'Error updating parking place' }),
      { status: 500, headers: { "Content-Type": "application/json" }
    });
  }
}