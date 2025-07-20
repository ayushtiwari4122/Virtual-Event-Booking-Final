const express = require("express");
const router = express.Router();
const { saveTicket } = require("../controllers/ticketController");

router.post("/save-ticket", saveTicket);

module.exports = router;
