import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingPage from "./pages/EventDetails";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import LandingPage from "./components/LandingPage";
import TicketPage from "./pages/TicketPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/ticket/:Id" element={<TicketPage />} />
      </Routes>
    </Router>
  );
}

export default App;
