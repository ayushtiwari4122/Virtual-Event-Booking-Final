const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  name: String,
  email: String,
  quantity: Number,
  amount: Number,
  razorpay_payment_id: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
