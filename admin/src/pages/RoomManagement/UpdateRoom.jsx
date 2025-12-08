import React, { useState } from "react";
import "./UpdateRoom.css";

function RoomsUpdate() {
  const [single, setSingle] = useState(15000);
  const [double, setDouble] = useState(10000);
  const [triple, setTriple] = useState(8000);

  const handleSave = () => {
    alert("Rent Updated Successfully!");
  };

  return (
    <div className="page-container">

      <h2 className="page-title">Set/Update Rent</h2>
      <p className="subtitle">Manage rent prices for different room types</p>

      {/* Single */}
      <div className="rent-card">
        <h4>Single Sharing</h4>
        <label className="rent-label">Monthly Rent (₹)</label>
        <input
          type="number"
          className="rent-input"
          value={single}
          onChange={(e) => setSingle(e.target.value)}
        />
      </div>

      {/* Double */}
      <div className="rent-card">
        <h4>Double Sharing</h4>
        <label className="rent-label">Monthly Rent (₹)</label>
        <input
          type="number"
          className="rent-input"
          value={double}
          onChange={(e) => setDouble(e.target.value)}
        />
      </div>

      {/* Triple */}
      <div className="rent-card">
        <h4>Triple Sharing</h4>
        <label className="rent-label">Monthly Rent (₹)</label>
        <input
          type="number"
          className="rent-input"
          value={triple}
          onChange={(e) => setTriple(e.target.value)}
        />
      </div>

      {/* Save Button */}
      <button className="save-btn" onClick={handleSave}>
        Save Updates
      </button>

      {/* Summary */}
      <div className="summary-card">
        <h4 className="summary-title">Current Rent Summary</h4>

        <div className="summary-row">
          <span>Single Sharing</span>
          <strong>₹{single.toLocaleString()}</strong>
        </div>

        <div className="summary-row">
          <span>Double Sharing</span>
          <strong>₹{double.toLocaleString()}</strong>
        </div>

        <div className="summary-row">
          <span>Triple Sharing</span>
          <strong>₹{triple.toLocaleString()}</strong>
        </div>
      </div>

    </div>
  );
}

export default RoomsUpdate;
