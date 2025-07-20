const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

router.get("/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const ticket = await Ticket.findOne({ bookingId: bookingId }).sort({
      createdAt: -1,
    });
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
});

module.exports = router;
