import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentPage() {
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const makePayment = async () => {
      const bookingId = localStorage.getItem("bookingId");
      if (!bookingId) {
        alert("Booking not found");
        return navigate("/");
      }

      const bookingRes = await axios.get(
        `http://localhost:5000/api/booking/${bookingId}`
      );
      const { name, email, amount, event } = bookingRes.data;

      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load");
        return;
      }

      const order = await axios.post("http://localhost:5000/api/create-order", {
        amount,
      });

      const options = {
        key: "rzp_test_nwuI3Hp4ayPpHi", // 🔁 Replace with actual key or use env
        amount: order.data.amount,
        currency: "INR",
        name: event,
        description: "Ticket Booking Payment",
        order_id: order.data.id,
        handler: async function (response) {
          console.log("Payment response:", response);
          // ✅ Save ticket after successful payment
          try {
            await axios.post("http://localhost:5000/api/save-ticket", {
              bookingId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            alert("✅ Payment Successful! ID: " + response.razorpay_payment_id);

            navigate("/confirmation",{
              state: {
                name,
                email,
              },
            });
          } catch (error) {
            console.error("Error saving ticket:", error);
            alert("Payment Failed");
          }
        },
        prefill: {
          name,
          email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    makePayment();
  }, [navigate]);

  return (
    <h2 style={{ textAlign: "center", marginTop: "50px" }}>
      Processing Payment...
    </h2>
  );
}

export default PaymentPage;
