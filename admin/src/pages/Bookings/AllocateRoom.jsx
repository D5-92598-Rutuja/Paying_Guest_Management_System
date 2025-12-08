import React from "react";
import "./AllocateRoom.css";

const bookings = [
  {
    id: "BK006",
    user: "Alex Johnson",
    type: "Single Sharing",
    date: "10/15/2024",
    pref: "Ground floor preferred",
  },
  {
    id: "BK007",
    user: "Emma Davis",
    type: "Double Sharing",
    date: "10/20/2024",
    pref: "Near common area",
  },
  {
    id: "BK008",
    user: "Chris Wilson",
    type: "Triple Sharing",
    date: "10/25/2024",
    pref: "Quiet environment",
  },
];

const rooms = ["Room 101", "Room 102", "Room 201", "Room 202"];

export default function AllocateRooms() {
  return (
    <div className="allocate-page">
      <h1 className="title">Allocate Rooms</h1>
      <p className="subtitle">Assign available rooms to pending bookings</p>

    {/* TOP CARDS */}
<div className="stats-wrapper">
  <div className="stats-row">
    
    <div className="stat-card">
      <h2>3</h2>
      <p>Pending Allocations</p>
    </div>

    <div className="stat-card">
      <h2>6</h2>
      <p>Available Rooms</p>
    </div>

    <div className="stat-card">
      <h2>3</h2>
      <p>Urgent (Join Today)</p>
    </div>

  </div>
</div>


      {/* TABLE SECTION */}
      <div className="table-container">
        <h2 className="section-title">Unallocated Bookings</h2>

        <table className="table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Room Type</th>
              <th>Join Date</th>
              <th>Preferences</th>
              <th>Assign Room</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, index) => (
              <tr key={index}>
                <td>{b.id}</td>
                <td>{b.user}</td>

                <td>
                  <span className="tag">{b.type}</span>
                </td>

                <td>
                  {b.date}
                  <span className="urgent-tag">Urgent</span>
                </td>

                <td>{b.pref}</td>

                <td>
                  <select className="select-box">
                    <option>Select room</option>
                    {rooms.map((r, i) => (
                      <option key={i}>{r}</option>
                    ))}
                  </select>
                </td>

                <td>
                  <button className="allocate-btn">Allocate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* AVAILABLE ROOMS SECTION */}
<div className="available-container">
  <h2 className="section-title">Available Rooms</h2>

  <div className="available-row">

    {/* SINGLE SHARING */}
    <div className="available-card">
      <h3 className="room-type-title">Single Sharing</h3>
      <div className="room-box">
        <span>S1 - 101</span>
        <span className="floor">Floor 1</span>
      </div>
      <div className="room-box">
        <span>S2 - 205</span>
        <span className="floor">Floor 2</span>
      </div>
    </div>

    {/* DOUBLE SHARING */}
    <div className="available-card">
      <h3 className="room-type-title">Double Sharing</h3>
      <div className="room-box">
        <span>D1 - 102</span>
        <span className="floor">Floor 1</span>
      </div>
      <div className="room-box">
        <span>D3 - 301</span>
        <span className="floor">Floor 3</span>
      </div>
    </div>

    {/* TRIPLE SHARING */}
    <div className="available-card">
      <h3 className="room-type-title">Triple Sharing</h3>
      <div className="room-box">
        <span>T1 - 103</span>
        <span className="floor">Floor 1</span>
      </div>
      <div className="room-box">
        <span>T2 - 202</span>
        <span className="floor">Floor 2</span>
      </div>
    </div>

  </div>
</div>

    </div>


      
  );
}
