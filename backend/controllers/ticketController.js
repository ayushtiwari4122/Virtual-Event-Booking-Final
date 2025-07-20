const Ticket = require("../models/Ticket");

const saveTicket = async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(200).json({ message: "Ticket saved successfully" });
  } catch (err) {
    console.error("Ticket save failed:", err);
    res.status(500).json({ error: "Failed to save ticket" });
  }
};

module.exports = { saveTicket };
