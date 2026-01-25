import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function PGHomePage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3 px-4">
        <a className="navbar-brand fw-bold fs-4" href="#">Sunrise PG</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-2"><a className="nav-link" href="#">Home</a></li>
            <li className="nav-item mx-2"><a className="nav-link" href="#rooms">Rooms</a></li>
            <li className="nav-item mx-2"><a className="nav-link" href="#services">Services</a></li>
            <li className="nav-item mx-2"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container-fluid py-5 hero-section" style={{ background: "linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%)" }}>
        <div className="row align-items-center px-4">
          <div className="col-md-6 mb-4">
            <h1 className="fw-bold display-4 mb-3" style={{ lineHeight: "1.3" }}>
              Comfortable PG Living<br />With Modern Amenities
            </h1>
            <p className="fs-5 text-muted mb-4">
              Premium rooms with WiFi, meals, AC, security and peaceful living experience.
            </p>
            <button className="btn btn-danger px-4 py-2 fs-5 rounded-pill shadow-sm">Explore Rooms</button>
          </div>

          <div className="col-md-6 text-center">
            <div className="p-3 rounded-4 shadow-lg bg-white" style={{ maxWidth: "500px", margin: "0 auto" }}>
              <img
                src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=900&q=60"
                alt="PG Hostel"
                className="img-fluid rounded-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Room Section */}
      <section id="services" className="container py-5">
        <h2 className="text-center fw-bold mb-2">Choose Your Room</h2>
        <p className="text-center text-muted mb-5">Complete Amenities – Everything included for comfortable living</p>

        <div className="row g-4">
          {[{
            title: "High-Speed WiFi",
            desc: "Unlimited 100 Mbps connection",
            icon: "https://cdn-icons-png.flaticon.com/512/483/483947.png"
          }, {
            title: "24/7 Security",
            desc: "CCTV + Biometric entry",
            icon: "https://cdn-icons-png.flaticon.com/512/891/891399.png"
          }, {
            title: "3 Hygienic Meals",
            desc: "Breakfast, Lunch & Dinner",
            icon: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
          }, {
            title: "Attached Washrooms",
            desc: "Hot water 24/7",
            icon: "https://cdn-icons-png.flaticon.com/512/3103/3103472.png"
          }, {
            title: "AC Rooms",
            desc: "Split AC in all rooms",
            icon: "https://cdn-icons-png.flaticon.com/512/869/869869.png"
          }, {
            title: "Housekeeping",
            desc: "Daily room cleaning",
            icon: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
          }].map((item, i) => (
            <div className="col-md-4" key={i}>
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 text-center">
                <img src={item.icon} width="60" alt="icon" />
                <h5 className="mt-3 fw-semibold">{item.title}</h5>
                <p className="text-muted small mb-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sunrise PG Footer */}
      <footer className="mt-5 py-5 text-light" style={{ background: "#111" }}>
  <div className="container">
    <div className="row g-4">
      <div className="col-md-4">
        <h3 className="fw-bold text-white">Sunrise PG</h3>
        <p className="small">BTM Layout, Bengaluru - 560068</p>
        <p className="small mb-1">250+ Happy Residents</p>
        <p className="small mb-1">50+ Rooms Available</p>
        <p className="small">4.9/5 Average Rating</p>
      </div>

      <div className="col-md-3">
        <h5 className="fw-semibold text-white mb-3">Rooms</h5>
        <ul className="list-unstyled small">
          <li>Single Room</li>
          <li>Double Sharing</li>
          <li>Triple Sharing</li>
        </ul>
      </div>

      <div className="col-md-3">
        <h5 className="fw-semibold text-white mb-3">Contact</h5>
        <p className="small mb-1">+91 98765 43210</p>
        <p className="small mb-1">sunrisepg@gmail.com</p>
        <p className="small">10 AM - 10 PM</p>
      </div>

      <div className="col-md-2">
        <h5 className="fw-semibold text-white mb-3">Location</h5>
        <p className="small mb-1">2km from BTM Metro</p>
        <p className="small mb-1">500m from Forum Mall</p>
        <p className="small">Near ITPL Gate</p>
      </div>
    </div>

    <div className="text-center pt-4 mt-4 border-top small" style={{ borderColor: "#333" }}>
      © 2025 Sunrise PG. All rights reserved.
    </div>
  </div>
</footer>
    </div>
  );
}
