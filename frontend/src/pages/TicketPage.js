import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TicketPage() {
  const [ticket, setTicket] = useState(null);
  const { id } = useParams(); // from route /ticket/:id
  const bookingId = id || localStorage.getItem("bookingId"); // fallback if not in URL

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        if (!bookingId) return;

        const res = await axios.get(
          `http://localhost:5000/api/ticket/${bookingId}`
        );
        setTicket(res.data);

        localStorage.removeItem("bookingId"); // clear after fetch
      } catch (err) {
        console.error("Failed to fetch ticket", err);
      }
    };

    fetchTicket();
  }, [bookingId]);

  if (!ticket) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Fetching ticket details...
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
        <strong>Name:</strong> {ticket.name}
      </p>
      <p>
        <strong>Email:</strong> {ticket.email}
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

export default TicketPage;
