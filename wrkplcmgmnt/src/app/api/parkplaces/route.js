// app/api/parkplaces/route.js

import db from '../../../lib/db'; // Corrected import path

// GET: Alle Parkplätze aus der Datenbank abrufen
export async function GET() {
  try {
    // Alle Parkplätze aus der Datenbank laden
    const [parkplaces] = await db.query('SELECT * FROM parkplaces');

    return new Response(JSON.stringify(parkplaces), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Fehler beim Abrufen der Parkplätze' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
