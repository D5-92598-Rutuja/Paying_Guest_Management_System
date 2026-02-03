import React, { useEffect, useState } from "react";
// import axios from "axios";
import axios from "../../service/axiosInstance";
import "./AllocateRoom.css";
import { toast } from 'react-toastify';


export default function AllocateRooms() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState({});

  useEffect(() => {
    fetchPendingBookings();
    fetchRooms();
  }, []);

  // Fetch only bookings that are not yet allocated
  const fetchPendingBookings = async () => {
    const res = await axios.get(
      "/admin/bookings/ready-for-allocation"
    );
    setBookings(res.data);
  };

  const fetchRooms = async () => {
    const res = await axios.get("/admin/rooms");
    setRooms(res.data);
  };

  const getRoomsByType = (type) =>
    rooms.filter((r) => r.sharingType === type && r.availableBeds > 0);

  // Allocate API call
  const allocateRoom = async (bookingId) => {
    const roomId = selectedRooms[bookingId];

    if (!roomId) {
      toast.warning("Please select a room first!");
      return;
    }

    try {
      await axios.post("/admin/bookings/allocate", {
        bookingId: bookingId,
        roomId: roomId,
      });

      toast.success("Room Allocated Successfully!");

      // refresh UI properly
      await fetchPendingBookings();
      await fetchRooms();
      setSelectedRooms({});
    } catch (err) {
      console.error(err);
      toast.error("Allocation failed");
    }
  };

  return (
    <div className="allocate-container">
      <h3>Allocate Rooms</h3>
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
                  new Date(b.joinDate).toISOString().split("T")[0] ===
                  new Date().toISOString().split("T")[0]
              ).length
            }
          </h1>
          <p>Urgent (Join Today)</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <h5>Unallocated Bookings</h5>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle text-center custom-table">
            <thead className="table-light">
              <tr>
                <th>Booking ID</th>
                <th>User</th>
                <th>Room Type</th>
                <th>Join Date</th>
                <th>Assign Room</th>
                {/*<th>Action</th>*/}
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
                    {new Date(b.joinDate).toISOString().split("T")[0] ===
                      new Date().toISOString().split("T")[0] && (
                      <span className="urgent ms-2">Urgent</span>
                    )}
                  </td>

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

                  <td>
                    <button
                      className="allocate-btn"
                      disabled={!selectedRooms[b.bookingId]}
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
      <h5>Available Rooms</h5>
      <div className="room-cards">
        {["SINGLE", "DOUBLE", "TRIPLE"].map((type) => (
          <div className="room-card" key={type}>
            <h6>{type} Sharing</h6>
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
