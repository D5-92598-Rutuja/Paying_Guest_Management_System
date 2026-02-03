import React, { useState } from "react";
// import axios from "axios";
import axios from "../../service/axiosInstance";
import "./AddRoom.css";
import { toast } from 'react-toastify';


function AddRoom() {
  const [roomType, setRoomType] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddRoom = async () => {
    if (!roomType || !floorNumber || !roomNumber) {
      toast.warning("Please fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      const roomData = {
        sharingType: roomType.toUpperCase(),
        floorNumber: parseInt(floorNumber),
        roomNumber: roomNumber,
      };
      await axios.post("/api/admin/rooms", roomData);
      toast.success("Room Added Successfully");
      
      // Clear form
      setRoomType("");
      setFloorNumber("");
      setRoomNumber("");
    } catch (error) {
      console.error(error);
      toast.error("Error adding room");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="addroom-container">
      <div className="addroom-content">
        <div className="header">
          <h1 className="title">Add New Room</h1>
          <p className="subtitle">Fill in the details below to add a new room</p>
        </div>

        <div className="form-card">
          <div className="form-group">
            <label className="label">Room Type <span className="required">*</span></label>
            <select
              className="input"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="">Select room type</option>
              <option value="Single">Single Sharing</option>
              <option value="Double">Double Sharing</option>
              <option value="Triple">Triple Sharing</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Floor Number <span className="required">*</span></label>
            <input
              type="number"
              className="input"
              placeholder="e.g., 1, 2, 3..."
              value={floorNumber}
              onChange={(e) => setFloorNumber(e.target.value)}
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="label">Room Number <span className="required">*</span></label>
            <input
              type="text"
              className="input"
              placeholder="e.g., 101, 102..."
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </div>

          <button
            className={`submit-btn ${isLoading ? "loading" : ""}`}
            onClick={handleAddRoom}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Room"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRoom;
