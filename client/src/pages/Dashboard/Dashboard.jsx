import React from "react";
import room from "../../assets/room.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      {/* HERO SECTION */}
      <div className="bg-primary bg-gradient text-white py-5">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-6">
              <span className="badge bg-warning text-dark mb-3">
                ⭐ Rated #1 PG
              </span>

              <h1 className="fw-bold mt-3">
                Find Your Perfect <br />
                <span className="text-warning">Home Away From Home</span>
              </h1>

              <p className="mt-3">
                Premium PG accommodations with world-class amenities, flexible
                booking, and a vibrant community of like-minded residents.
              </p>

              <div className="mt-4">
                <button className="btn btn-warning me-3"
                  onClick={() => navigate("/login")}>
                  Register & Book Now
                </button>
                <button className="btn btn-light"
                  onClick={() => navigate("/rooms")}>
                  Browse Rooms
                </button>
              </div>
            </div>

            <div className="col-md-6 text-center position-relative">
              <img
                src={room}
                alt="Room"
                className="img-fluid rounded shadow"
              />

              <div className="bg-white text-dark p-3 rounded shadow position-absolute bottom-0 end-0">
                ⭐ 4.8 <br />
                <small>500+ Happy Residents</small>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* AMENITIES */}
      <div className="container text-center py-5 bg-light py-16 px-6">
        <h2 className="fw-bold mb-3">World-Class Amenities</h2>
        <p className="text-muted mb-4">
          Everything you need for comfortable living included in your rent
        </p>

        <div className="row mt-4">
          {[
            { name: "5G WiFi", icon: "fas fa-wifi" },
            { name: "24/7 Security", icon: "fas fa-shield-alt" },
            { name: "Fully Furnished", icon: "fas fa-bed" },
            { name: "Parking", icon: "fas fa-car" },
            { name: "Mess Facility", icon: "fas fa-utensils" },
            { name: "Laundry", icon: "fas fa-tshirt" }
          ].map((item, i) => (
            <div key={i} className="col-md-2 col-6 mb-4">
              <div className="amenity-card border rounded p-4 shadow-sm d-flex flex-column align-items-center justify-content-center">
                <i className={`${item.icon} fs-2 text-primary mb-2`}></i>
                <span className="fw-medium">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="container py-5">
        <div className="row align-items-center">

          {/* LEFT SIDE */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="fw-bold mb-4">
              Why Choose <span className="text-primary">PGConnect?</span>
            </h2>

            {/* Features List */}
            <ul className="list-unstyled fs-5">
              {[
                "Prime locations across the city",
                "All bills included in rent",
                "Professional housekeeping",
                "Study-friendly environment",
                "Community events & networking"
              ].map((feature, i) => (
                <li key={i} className="mb-3 d-flex align-items-start">
                  <span className="text-success fs-4 me-2">✅</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="d-flex gap-4 mt-5">
              <div className="text-center p-3 border rounded shadow-sm">
                <h3 className="fw-bold text-primary mb-1">50+</h3>
                <p className="mb-0 text-muted">PG Properties</p>
              </div>
              <div className="text-center p-3 border rounded shadow-sm">
                <h3 className="fw-bold text-success mb-1">500+</h3>
                <p className="mb-0 text-muted">Happy Residents</p>
              </div>
              <div className="text-center p-3 border rounded shadow-sm">
                <h3 className="fw-bold text-warning mb-1">4.8★</h3>
                <p className="mb-0 text-muted">Avg Rating</p>
              </div>
            </div>
          </div>


          {/* RIGHT SIDE CARDS */}
          <div className="col-md-6">
            <div className="row">

              <div className="col-md-12 mb-3">
                <div className="card shadow-sm border-start border-primary border-4 p-3">
                  <h5 className="fw-bold">Instant Booking</h5>
                  <p className="mb-0 text-muted">Book your room in minutes</p>
                </div>
              </div>

              <div className="col-md-12 mb-3">
                <div className="card shadow-sm border-start border-success border-4 p-3">
                  <h5 className="fw-bold">Transparent Pricing</h5>
                  <p className="mb-0 text-muted">No hidden charges</p>
                </div>
              </div>

              <div className="col-md-12">
                <div className="card shadow-sm border-start border-warning border-4 p-3">
                  <h5 className="fw-bold">24/7 Support</h5>
                  <p className="mb-0 text-muted">We are always here to help</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>


      {/* LOCATIONS */}
      <div className="container text-center py-5">
        <h2 className="fw-bold">Prime Locations</h2>
        <p className="text-muted">
          Strategically located near IT hubs, colleges, and metro stations
        </p>

        <div className="row mt-4">
          {["Koregaon Park", "Hinjewadi", "Whitefield"].map((loc, i) => (
            <div key={i} className="col-md-4 mb-3">
              <div className="p-5 text-white rounded shadow"
                style={{
                  background: "linear-gradient(90deg,#6366f1,#8b5cf6)"
                }}>
                <h4>{loc}</h4>
                <small>10+ PG Properties</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary bg-gradient text-white text-center py-5">
        <h2>Ready to Find Your Perfect Room?</h2>
        <p>Join thousands of satisfied residents who have found their ideal PG</p>
        <button className="btn btn-warning btn-lg mt-3">
          Get Started Today
        </button>
      </div>

    </div>
  );
}

export default Dashboard;
