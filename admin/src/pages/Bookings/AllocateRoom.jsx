import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllocateRoom.css";

export default function AllocateRooms() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState({}); // store selected room per booking

  useEffect(() => {
    fetchPendingBookings();
    fetchRooms();
  }, []);

  const fetchPendingBookings = async () => {
    const res = await axios.get("http://localhost:8080/bookings/pending");
    setBookings(res.data);
  };

  const fetchRooms = async () => {
    const res = await axios.get("http://localhost:8080/rooms");
    setRooms(res.data);
  };

  const getRoomsByType = (type) =>
    rooms.filter((r) => r.sharingType === type && r.availableBeds > 0);

  //allocate API call
  const allocateRoom = async (bookingId) => {
    const roomId = selectedRooms[bookingId];

    if (!roomId) {
      alert("Please select a room first!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/bookings/allocate", {
        bookingId: bookingId,
        roomId: roomId,
      });

      alert("Room Allocated Successfully!");
      fetchPendingBookings();
      fetchRooms();
    } catch (err) {
      console.error(err);
      alert("Allocation failed");
    }
  };

  return (
    <div className="allocate-container">
      <h2>Allocate Rooms</h2>
      <p className="subtitle">Assign available rooms to pending bookings</p>

      {/* TOP CARDS */}
      <div className="stats-row">
        <div className="stat-card">
          <h1>{bookings.length}</h1>
          <p>Pending Allocations</p>
        </div>

        <div className="stat-card">
          <h1>{rooms.filter((r) => r.availableBeds > 0).length}</h1>
          <p>Available Rooms</p>
        </div>

        <div className="stat-card">
          <h1>
            {
              bookings.filter(
                (b) =>
                  b.joinDate === new Date().toISOString().split("T")[0]
              ).length
            }
          </h1>
          <p>Urgent (Join Today)</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <h3>Unallocated Bookings</h3>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle text-center custom-table">
            <thead className="table-light">
              <tr>
                <th>Booking ID</th>
                <th>User</th>
                <th>Room Type</th>
                <th>Join Date</th>
                <th>Assign Room</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.bookingId}>
                  <td>{b.bookingId}</td>
                  <td>{b.userName}</td>
                  <td>
                    <span className="tag">{b.roomType}</span>
                  </td>
                  <td>
                    {b.joinDate}
                    {b.joinDate ===
                      new Date().toISOString().split("T")[0] && (
                      <span className="urgent ms-2">Urgent</span>
                    )}
                  </td>

                  {/* FIXED SELECT */}
                  <td>
                    <select
                      className="form-select"
                      value={selectedRooms[b.bookingId] || ""}
                      onChange={(e) =>
                        setSelectedRooms({
                          ...selectedRooms,
                          [b.bookingId]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Room</option>
                      {getRoomsByType(b.roomType).map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.roomNumber} (Floor {r.floorNumber})
                        </option>
                      ))}
                    </select>
                  </td>

                  {/*FIXED BUTTON */}
                  <td>
                    <button
                      className="allocate-btn"
                      onClick={() => allocateRoom(b.bookingId)}
                    >
                      Allocate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AVAILABLE ROOMS CARDS */}
      <h3>Available Rooms</h3>
      <div className="room-cards">
        {["SINGLE", "DOUBLE", "TRIPLE"].map((type) => (
          <div className="room-card" key={type}>
            <h4>{type} Sharing</h4>
            {getRoomsByType(type).map((r) => (
              <div className="room-row" key={r.id}>
                <span>{r.roomNumber}</span>
                <span>Floor {r.floorNumber}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
