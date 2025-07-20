import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BookingForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event: "Virtual Tech Conference 2025",
    amount: 500,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Save booking in MongoDB
      const res = await axios.post(
        "http://localhost:5000/api/book-event",
        formData
      );

      // ✅ Store booking ID in localStorage or pass to payment page
      localStorage.setItem("bookingId", res.data._id);

      // ✅ Navigate to payment page
      navigate("/payment");
    } catch (err) {
      alert("Error submitting booking. Try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book Your Ticket 🎫</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label>Event:</label>
        <br />
        <input type="text" value={formData.event} disabled />
        <br />
        <br />

        <label>Amount (₹):</label>
        <br />
        <input type="number" value={formData.amount} disabled />
        <br />
        <br />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
