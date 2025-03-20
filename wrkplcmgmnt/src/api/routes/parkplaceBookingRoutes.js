// parkplaceBookingRoutes.js

const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.send("ParkplaceBooking API works!");
});


module.exports = router;