import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookRoom.css";
import BookingModal from "./BookingModal";
import { useNavigate } from "react-router-dom";
import "../../components/Navbar/Navbar.css";
import Navbar from "../../components/Navbar/Navbar";

export default function BookRoom() {
  const [roomsFromDB, setRoomsFromDB] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();




  // ✅ NEW: rent policy state
  const [rentPolicy, setRentPolicy] = useState({
    single: 0,
    double: 0,
    triple: 0,
  });

  useEffect(() => {
    fetchRooms();
    fetchRent();
  }, []);

  const fetchRooms = async () => {
    const res = await axios.get("http://localhost:8080/api/rooms");
    setRoomsFromDB(res.data);
  };

  //fetch rent from rent_policy table
  const fetchRent = async () => {
    const res = await axios.get("http://localhost:8080/api/rent");
    setRentPolicy({
      single: res.data.singleRent,
      double: res.data.doubleRent,
      triple: res.data.tripleRent,
    });
  };

  //convert DB rooms
  // 3 UI cards
  const getRoomData = (type, title, image, features, tag) => {
    const filtered = roomsFromDB.filter(r => r.sharingType === type);

    const available = filtered.reduce(
      (sum, r) => sum + r.availableBeds,
      0
    );

    //TAKE RENT FROM rentPolicy 
    let rent = 0;
    if (type === "SINGLE") rent = rentPolicy.single;
    if (type === "DOUBLE") rent = rentPolicy.double;
    if (type === "TRIPLE") rent = rentPolicy.triple;

    return {
      title,
      type,
      image,
      features,
      tag,
      price: `₹${rent.toLocaleString()}`,
      available
    };
  };

  const rooms = [
    getRoomData(
      "SINGLE",
      "Single Sharing",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80",
      ["Private Room", "Attached Bathroom", "Study Table", "Double Wardrobe", "AC Available"],
      "Most Popular"
    ),
    getRoomData(
      "DOUBLE",
      "Double Sharing",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
      ["Shared Room", "Attached Bathroom", "Study Tables", "Individual Wardrobes", "AC Available"]
    ),
    getRoomData(
      "TRIPLE",
      "Triple Sharing",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80",
      ["Shared Room", "Common Bathroom", "Study Spaces", "Individual Storage", "Fan Cooling"]
    ),
  ];

  return (
    <>
      <Navbar />

      <div className="rooms-container">
        <h2 className="rooms-title">Choose Your Perfect Room</h2>
        <p className="rooms-subtitle">
          Select the room type that best fits your needs and budget
        </p>

        <div className="room-cards-wrapper">
          {rooms.map((room, index) => (
            <div className="room-card" key={index}>
              <div className="room-image-wrapper">
                <img src={room.image} alt={room.title} className="room-image" />
                <span className="room-availability">
                  👥 {room.available} beds available
                </span>
                {room.tag && <span className="room-tag">{room.tag}</span>}
              </div>

              <div className="room-card-body">
                <h3 className="room-title">{room.title}</h3>
                <h3 className="room-price">{room.price}</h3>
                <small className="room-period">per month</small>

                <div className="features-list">
                  {room.features.map((f, i) => (
                    <span key={i} className="feature-badge">{f}</span>
                  ))}
                </div>

                <button
                  className="book-btn"
                  // BookRoom.jsx - FIXED navigation
                  onClick={() => {
                    // Navigate to root + path (fixes double nesting)
                    navigate(`/home/room/${room.type.toLowerCase()}`, { state: { room } });
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* 
      <BookingModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
      /> */}
      </div>
    </>
  );
}
