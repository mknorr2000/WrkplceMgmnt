const express = require("express");
const db = require('./db');  // Verbindung zur Datenbank
const app = express();

// Importiere die Routen
const workplaceBookingRoutes = require("./routes/workplaceBookingRoutes");
const parkplaceBookingRoutes = require("./routes/parkplaceBookingRoutes");

// Middleware für JSON-Daten
app.use(express.json());

// Nutze die Routen
app.use("/api/workplaceBookings", workplaceBookingRoutes);  // Stelle sicher, dass diese Route vorhanden ist

// Server starten
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});