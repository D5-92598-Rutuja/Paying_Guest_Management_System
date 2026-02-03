import React, { useState, useEffect } from "react";
// import axios from "axios";
import axios from "../../service/axiosInstance";
import "./UpdateRoom.css";
import { toast } from 'react-toastify';


function RoomsUpdate() {
  const [single, setSingle] = useState(0);
  const [double, setDouble] = useState(0);
  const [triple, setTriple] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch rent when page loads
  useEffect(() => {
    setIsFetching(true);
    axios
      .get("/admin/rent")
      .then((res) => {
        setSingle(res.data.singleRent);
        setDouble(res.data.doubleRent);
        setTriple(res.data.tripleRent);
      })
      .catch((err) => console.error("Error fetching rent:", err))
      .finally(() => setIsFetching(false));
  }, []);

  // Save updates to backend
  const handleSave = async () => {
    setIsLoading(true);
    try {
      await axios.post("/admin/rent", {
        singleRent: Number(single),
        doubleRent: Number(double),
        tripleRent: Number(triple),
      });

      toast.success("Rent Updated Successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error updating rent");
    } finally {
      setIsLoading(false);
    }
  };

  const roomTypes = [
    {
      id: "single",
      title: "Single Sharing",
      value: single,
      setValue: setSingle,
      icon: "🛏️",
      color: "#3498db",
    },
    {
      id: "double",
      title: "Double Sharing",
      value: double,
      setValue: setDouble,
      icon: "🛏️🛏️",
      color: "#9b59b6",
    },
    {
      id: "triple",
      title: "Triple Sharing",
      value: triple,
      setValue: setTriple,
      icon: "🛏️🛏️🛏️",
      color: "#e67e22",
    },
  ];

  if (isFetching) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading rent details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          {/* className="page-title" */}
          <h3>Set Rent</h3>
          <p className="subtitle">Manage rent prices for different room types</p>
        </div>
      </div>

      <div className="content-grid">
        {/* Rent Cards Section */}
        <div className="rent-cards-section">
          {roomTypes.map((room) => (
            <div key={room.id} className="rent-card">
              <div className="card-header">
                <h4 className="room-title">{room.title}</h4>
                <span className="room-icon">{room.icon}</span>
              </div>
              
              <div className="input-group">
                <label className="rent-label">Monthly Rent</label>
                <div className="input-wrapper">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    className="rent-input"
                    value={room.value}
                    onChange={(e) => room.setValue(e.target.value)}
                    min="0"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            className={`save-btn ${isLoading ? "loading" : ""}`}
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Summary Section */}
        <div className="summary-section">
          <div className="summary-card">
            <h4 className="summary-title">
              Current Rent Summary
            </h4>

            <div className="summary-content">
              {roomTypes.map((room, index) => (
                <div key={room.id} className="summary-row">
                  <div className="summary-left">
                    {/* <span className="summary-icon">{room.icon}</span> */}
                    <span className="summary-label">{room.title}</span>
                  </div>
                  <span className="summary-value">
                    ₹{Number(room.value).toLocaleString()}
                  </span>
                </div>
              ))}

              {/* <div className="summary-total">
                <span>Total Monthly (All Types)</span>
                <span className="total-value">
                  ₹{(Number(single) + Number(double) + Number(triple)).toLocaleString()}
                </span>
              </div> */}
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">💡</div>
            <div className="info-content">
              <h5>Quick Tips</h5>
              <ul>
                <li>Update rent for individual room types</li>
                <li>Changes apply to all rooms of that type</li>
                <li>Click "Save Changes" to confirm updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomsUpdate;
