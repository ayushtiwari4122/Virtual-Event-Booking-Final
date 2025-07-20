import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function ConfirmationPage() {
  // const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const location = useLocation();
  const passedName = location.state?.name;
  const passedEmail = location.state?.email;

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const bookingId = localStorage.getItem("bookingId");
        if (!bookingId) return;

        const res = await axios.get(
          `http://localhost:5000/api/ticket/${bookingId}`
        );
        setTicket(res.data);
        localStorage.removeItem("bookingId");
      } catch (err) {
        console.error("Failed to fetch ticket", err);
      }
    };

    fetchTicket();
  }, []);

  if (!ticket) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        your ticket is Confirmed..
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>🎟️ Booking Confirmed!</h2>
      <p>
        <strong>Name:</strong> {passedName || ticket.name}
      </p>
      <p>
        <strong>Email:</strong> {passedEmail || ticket.email}
      </p>
      <p>
        <strong>Event:</strong> {ticket.event}
      </p>
      <p>
        <strong>Amount:</strong> ₹{ticket.amount}
      </p>
      <p>
        <strong>Payment ID:</strong> {ticket.razorpayPaymentId}
      </p>
      <p style={{ marginTop: "20px", color: "green" }}>
        ✅ Your ticket has been successfully booked!
      </p>
    </div>
  );
}

export default ConfirmationPage;
