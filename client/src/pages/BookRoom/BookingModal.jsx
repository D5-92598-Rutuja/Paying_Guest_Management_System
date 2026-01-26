import React, { useState } from "react";
import axios from "axios";
import "./BookingModal.css";

export default function BookingModal({ room, onClose }) {
  const [joinDate, setJoinDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!room) return null;

  const confirmBooking = async () => {
    if (!joinDate) {
      alert("Please select move-in date");
      return;
    }

    try {
      await axios.post("http://localhost:8080/bookings", {
        roomType: room.type,
        joinDate: joinDate,
        endDate: endDate || null
      });

      alert("Booking Request Sent Successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Booking Failed");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>Book {room.title}</h2>

        <div className="date-inputs">
          <div>
            <label>Move-in Date</label>
            <input
              type="date"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
            />
          </div>

          <div>
            <label>Move-out Date (Optional)</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="summary-box">
          <p>Room Type: {room.title}</p>
          <p>Monthly Rent: {room.price}</p>
          <p>Security Deposit: ₹10,000</p>
        </div>

        <button className="confirm-btn" onClick={confirmBooking}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
