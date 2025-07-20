const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
require("dotenv").config();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Make sure request body is parsed (optional if already in app.js)
router.use(express.json());

// Create Razorpay Order
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  const options = {
    amount: amount, // 🟢 amount in paise (e.g., ₹500 = 50000)
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order); // 🔁 Send order object back to frontend
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
