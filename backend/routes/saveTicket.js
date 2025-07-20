const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const Booking = require("../models/Booking");

router.post("/", async (req, res) => {
  try {
    const { bookingId, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    const ticket = new Ticket({
      name: booking.name,
      email: booking.email,
      event: booking.event,
      amount: booking.amount,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    });

    const saved = await ticket.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Ticket saving failed" });
  }
});

module.exports = router;
