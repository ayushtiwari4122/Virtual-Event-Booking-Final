import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const storedEvent = localStorage.getItem("eventData");
    if (storedEvent) {
      const event = JSON.parse(storedEvent);
      setFormData({
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
        price: event.price,
      });
    }
  }, []);

  const handlePay = () => {
    if (!userData.name || !userData.email) {
      alert("Please enter name and email before payment.");
      return;
    }

    alert("Payment for ₹" + formData.price);

    // Simulate booking creation
    const bookingId = `BOOKING-${Date.now()}`; // Generate fake ID

    const booking = {
      name: userData.name,
      email: userData.email,
      event: formData.title,
      amount: formData.price,
      razorpayPaymentId: "rzp_test_nwuI3Hp4ayPpHi",
      bookingId: bookingId,
    };

    localStorage.setItem("bookingDetails", JSON.stringify(booking));
    localStorage.setItem("bookingId", bookingId); // ✅ Fixed

    navigate("/book");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Payment Details</h2>

      <form>
        <label>Your Name:</label>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          style={inputStyle}
        />

        <label>Your Email:</label>
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          style={inputStyle}
        />

        <label>Event Title:</label>
        <input type="text" value={formData.title} readOnly style={inputStyle} />

        <label>Date:</label>
        <input type="text" value={formData.date} readOnly style={inputStyle} />

        <label>Time:</label>
        <input type="text" value={formData.time} readOnly style={inputStyle} />

        <label>Location:</label>
        <input
          type="text"
          value={formData.location}
          readOnly
          style={inputStyle}
        />

        <label>Description:</label>
        <textarea value={formData.description} readOnly style={textareaStyle} />

        <label>Amount:</label>
        <input
          type="text"
          value={`₹${formData.price}`}
          readOnly
          style={inputStyle}
        />

        <button
          type="button"
          onClick={handlePay}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Confirm & Pay
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  ...inputStyle,
  height: "80px",
};

export default PaymentPage;
