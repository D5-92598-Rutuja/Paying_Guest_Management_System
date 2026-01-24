import React from "react";
import "./BookRoom.css";

export default function BookRoom() {
  const rooms = [
    {
      id: 1,
      title: "Single Sharing",
      price: "₹15,000",
      priceRange: "₹12,000 – ₹18,000",
      image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80",
      available: 5,
      features: ["Private Room", "Attached Bathroom", "Study Table", "Wardrobe", "AC Available"],
      tag: "Most Popular",
    },
    {
      id: 2,
      title: "Double Sharing",
      price: "₹10,000",
      priceRange: "₹8,000 – ₹12,000",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
      available: 8,
      features: [
        "Shared Room",
        "Attached Bathroom",
        "Study Tables",
        "Individual Wardrobes",
        "AC Available",
      ],
    },
    {
      id: 3,
      title: "Triple Sharing",
      price: "₹7,500",
      priceRange: "₹6,000 – ₹9,000",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80",
      available: 12,
      features: [
        "Shared Room",
        "Common Bathroom",
        "Study Spaces",
        "Individual Storage",
        "Fan Cooling",
      ],
    },
  ];

  return (
    <div className="rooms-container">
      <h2 className="rooms-title">Choose Your Perfect Room</h2>
      <p className="rooms-subtitle">
        Select the room type that best fits your needs and budget
      </p>

      <div className="room-amenities">
        <span>📶 High-Speed WiFi</span>
        <span>🛡️ 24/7 Security</span>
        <span>🍽️ Mess Facility</span>
        <span>🅿️ Parking</span>
      </div>

      {/* Room Cards */}
      <div className="room-cards-wrapper">
        {rooms.map((room) => (
          <div className="room-card" key={room.id}>
            <div className="room-image-wrapper">
              <img src={room.image} alt={room.title} className="room-image" />

              <span className="room-availability">👥 {room.available} available</span>

              {room.tag && <span className="room-tag">{room.tag}</span>}
            </div>

            <div className="room-card-body">
              <h3 className="room-title">{room.title}</h3>

              <h3 className="room-price">{room.price}</h3>
              <small className="room-period">per month</small>

              <p className="room-price-range">Price Range: {room.priceRange}</p>

              <p className="features-title">Features:</p>

              <div className="features-list">
                {room.features.map((f, i) => (
                  <span key={i} className="feature-badge">
                    {f}
                  </span>
                ))}
              </div>

              <button className="book-btn">Book Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Steps */}
      <div className="booking-section">
        <h3>How Booking Works</h3>

        <div className="booking-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Submit Request</h4>
            <p>Choose your room type and preferred dates</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h4>Get Allocated</h4>
            <p>We’ll allocate a room based on availability</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h4>Move In</h4>
            <p>Complete payment and KYC to move in</p>
          </div>
        </div>
      </div>
    </div>
  );
}
