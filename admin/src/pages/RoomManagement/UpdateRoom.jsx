import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateRoom.css";

function RoomsUpdate() {
  const [single, setSingle] = useState(0);
  const [double, setDouble] = useState(0);
  const [triple, setTriple] = useState(0);

  //1) Fetch rent when page loads
  useEffect(() => {
    axios
      .get("http://localhost:8080/rent")
      .then((res) => {
        setSingle(res.data.singleRent);
        setDouble(res.data.doubleRent);
        setTriple(res.data.tripleRent);
      })
      .catch((err) => console.error("Error fetching rent:", err));
  }, []);

  // 2) Save updates to backend
  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8080/rent", {
        singleRent: Number(single),
        doubleRent: Number(double),
        tripleRent: Number(triple),
      });

      alert("Rent Updated Successfully! ");
    } catch (err) {
      console.error(err);
      alert("Error updating rent ");
    }
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
          <strong>₹{Number(single).toLocaleString()}</strong>
        </div>

        <div className="summary-row">
          <span>Double Sharing</span>
          <strong>₹{Number(double).toLocaleString()}</strong>
        </div>

        <div className="summary-row">
          <span>Triple Sharing</span>
          <strong>₹{Number(triple).toLocaleString()}</strong>
        </div>
      </div>
    </div>
  );
}

export default RoomsUpdate;
