const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/book-event", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const saved = await booking.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Booking failed" });
  }
});
router.get("/book-event/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving booking" });
  }
});

module.exports = router;
