import React, { useState } from "react";
import axios from "axios";
import "./AddRoom.css";

function AddRoom() {
  const [roomType, setRoomType] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const handleAddRoom = async () => {
    if (!roomType || !floorNumber || !roomNumber) {
      alert("Please fill all fields");
      return;
    }

    try {
      const roomData = {
        sharingType: roomType.toUpperCase(),   // IMPORTANT for enum
        floorNumber: parseInt(floorNumber),
        roomNumber: roomNumber,
      };

      await axios.post("http://localhost:8080/admin/rooms", roomData);


      alert("Room Added Successfully ✅");

      // clear form
      setRoomType("");
      setFloorNumber("");
      setRoomNumber("");

    } catch (error) {
      console.error(error);
      alert("Error adding room ❌");
    }
  };

  return (
    <div className="addroom-container">
      <h1 className="addroom-title">Add New Room</h1>
      <p className="addroom-subtitle">Add a new room to the system</p>

      <div className="addroom-card">
        <h2 className="section-title">Room Details</h2>

        <label>Room Type *</label>
        <select
          className="input-field"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value="">Select room type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Triple">Triple</option>
        </select>

        <label>Floor Number *</label>
        <input
          type="number"
          className="input-field"
          placeholder="Enter floor number"
          value={floorNumber}
          onChange={(e) => setFloorNumber(e.target.value)}
        />

        <label>Room Number *</label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter room number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />

        <button className="addroom-btn" onClick={handleAddRoom}>
          Add Room
        </button>
      </div>
    </div>
  );
}

export default AddRoom;
