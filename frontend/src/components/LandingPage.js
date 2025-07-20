import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    const eventData = {
      title: "Virtual Tech Conference 2025",
      date: "August 10, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "Online",
      description:
        "Join us for an exciting virtual tech event with industry speakers, coding competitions, and networking sessions.",
      price: 500,
    };
    localStorage.setItem("eventData", JSON.stringify(eventData));
    navigate("/payment");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎉 Virtual Tech Conference 2025</h1>
      <p>
        <strong>Date:</strong> August 10, 2025
      </p>
      <p>
        <strong>Time:</strong> 6:00 PM - 9:00 PM
      </p>
      <p>
        <strong>Location:</strong> Online
      </p>
      <p>
        <strong>Description:</strong> Join us for an exciting virtual tech event
        with industry speakers, coding competitions, and networking sessions.
      </p>
      <p>
        <strong>Ticket Price:</strong> ₹500
      </p>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleBookNow}
      >
        Book Now
      </button>
    </div>
  );
}

export default LandingPage;
