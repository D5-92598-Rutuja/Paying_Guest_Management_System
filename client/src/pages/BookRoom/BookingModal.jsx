// BookingModal.jsx - Replace your entire file
import React, { useState } from "react";
import axios from "axios";
import "./BookingModal.css"; // Keep your existing CSS
import { toast } from 'react-toastify';


export default function BookingModal({ room, onClose }) {
  const [joinDate, setJoinDate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!room) return null;

  const handleProceedToPayment = async () => {
    if (!joinDate) {
      toast.warning("Please select move-in date");
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Replace with real API when friend finishes
      // For now: Mock booking ID
      const mockBookingId = `mock_${Date.now()}`;
      
      // Real API format (uncomment later):
      /*
      const response = await axios.post("http://localhost:8080/bookings/request", {
        roomId: room.id,
        roomType: room.type,
        monthlyRent: room.price,
        joinDate: joinDate
      });
      const bookingId = response.data.bookingId;
      */
      
      // Redirect to payment page
      window.location.href = `/payment/${mockBookingId}?room=${room.type}&amount=${room.price}`;
      // window.location.href = `/payment/${bookingId}`;
      
    } catch (error) {
      toast.warning("Booking request failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = room.price + 10000; // Rent + Deposit

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>Book {room.title || room.type}</h2>

        {/* Date Selection */}
        <div className="date-inputs mb-4">
          <div className="mb-3">
            <label className="form-label fw-bold">Move-in Date *</label>
            <input
              type="date"
              className="form-control"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Payment Summary */}
        <div className="summary-box p-4 mb-4 border rounded">
          <h5 className="mb-3">Payment Summary</h5>
          <div className="row text-start">
            <div className="col-8">
              <div>Room Type</div>
              <div className="small text-muted">{room.title || room.type}</div>
            </div>
            <div className="col-4 text-end fw-bold">₹{room.price}</div>
          </div>
          
          <hr className="my-2" />
          
          <div className="row">
            <div className="col-8">First Month Rent + Security Deposit</div>
            <div className="col-4 text-end fw-bold text-success fs-5">
              ₹{totalAmount}
            </div>
          </div>
          
          <small className="text-success d-block mt-2">
            🔄 ₹{room.price} will be auto-charged monthly
          </small>
        </div>

        {/* CTA Button */}
        <button 
          className="confirm-btn w-100 py-3 fs-5"
          onClick={handleProceedToPayment}
          disabled={!joinDate || loading}
          style={{ 
            background: loading ? '#6c757d' : '#28a745',
            border: 'none',
            borderRadius: '8px'
          }}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Preparing Payment...
            </>
          ) : (
            `Proceed to Secure Payment ₹${totalAmount}`
          )}
        </button>

        <div className="mt-3 text-center text-muted small">
          <div>🛡️ Secure payment via Stripe</div>
          <div>💳 Cards | UPI | Wallets accepted</div>
        </div>
      </div>
    </div>
  );
}
