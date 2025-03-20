const express = require("express");
const router = express.Router();
const workplaceController = require("../controllers/workplace-Booking");

// Route für alle Arbeitsplätze
router.get("/", workplaceController.getAllWorkplaces);

// Route für Arbeitsplatz anhand der ID
router.get("/:id", workplaceController.getWorkplaceById);

module.exports = router;