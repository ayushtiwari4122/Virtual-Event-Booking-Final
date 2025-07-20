import React from "react";
import { useNavigate } from "react-router-dom";

const EventDetails = () => {
  const navigate = useNavigate();

  const selectedEvent = {
    name: "Tech Conference 2025",
    price: 500 * 100, // amount in paisa for Razorpay
  };

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: selectedEvent.price }),
      });

      const order = await response.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // or import.meta.env.VITE_RAZORPAY_KEY_ID
        amount: order.amount,
        currency: order.currency,
        name: "Virtual Event Booking",
        order_id: order.id,
        handler: function (response) {
          alert(
            "Payment Successful!\nPayment ID: " + response.razorpay_payment_id
          );

          // Use setTimeout to make sure alert doesn't block navigation
          setTimeout(() => {
            navigate("/confirmation");
          }, 100); // short delay ensures navigation happens
        },
        theme: { color: "#3399cc" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Failed");
    }
  };

  return (
    <div>
      <h1>Event Details Page</h1>
      <p>Event: {selectedEvent.name}</p>
      <p>Price: ₹{selectedEvent.price / 100}</p>
      <button onClick={handlePayment}>Book Now</button>
    </div>
  );
};

export default EventDetails;
