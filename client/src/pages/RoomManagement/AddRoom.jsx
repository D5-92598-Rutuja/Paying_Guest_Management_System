/*import React from 'react'

const AddRoom = () => {
  return (
    <div>
      <h1>Add Room</h1>
    </div>
  )
}

export default AddRoom
*/

import React, { useState } from "react";
import "./AddRoom.css";

function AddRoom() {
  // React Hooks
  const [roomType, setRoomType] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const roomData = {
      roomType,
      floorNumber,
      roomNumber,
    };

    console.log("Room Added:", roomData);

    // Later: You can add API call here
    // axios.post("/api/rooms", roomData)

    // Clear inputs
    setRoomType("");
    setFloorNumber("");
    setRoomNumber("");
  };

  return (
    <div className="add-room-container">
      <h2 className="title">Add New Room</h2>
      <p className="subtitle">Add a new room to the system</p>

      <div className="room-card">
        <h4 className="section-title">Room Details</h4>

        <form onSubmit={handleSubmit}>
          {/* Room Type */}
          <div className="form-group mb-3">
            <label className="form-label">Room Type *</label>
            <select
              className="form-control"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="">Select room type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Triple">Triple</option>
            </select>
          </div>

          {/* Floor Number */}
          <div className="form-group mb-3">
            <label className="form-label">Floor Number *</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter floor number"
              value={floorNumber}
              onChange={(e) => setFloorNumber(e.target.value)}
            />
          </div>

          {/* Room Number */}
          <div className="form-group mb-4">
            <label className="form-label">Room Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter room number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </div>

          <button className="btn btn-dark w-100 add-room-btn" type="submit">
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRoom;
