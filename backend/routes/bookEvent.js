// routes/bookEvent.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ✅ Booking Schema
const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  paymentId: String,
  orderId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

// ✅ Route to save booking
router.post("/", async (req, res) => {
  try {
    const { name, email, contact, paymentId, orderId } = req.body;

    const booking = new Booking({
      name,
      email,
      contact,
      paymentId,
      orderId,
    });

    await booking.save();
    res.status(201).json({ message: "Booking saved successfully!" });
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ message: "Failed to save booking." });
  }
});

module.exports = router;
