import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Theme: Teal + Indigo (Bootstrap Based)

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">PG Management</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#pgNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="pgNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#features">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#pgs">PGs</a>
            </li>

            {!isLoggedIn ? (
              <li className="nav-item">
                <a className="btn btn-light ms-2" href="/login">Login</a>
              </li>
            ) : (
              <li className="nav-item">
                <button onClick={onLogout} className="btn btn-danger ms-2">Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Hero({ onBookNow }) {
  return (
    <section className="bg-gradient-to-r from-primary to-info text-white py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h1 className="display-5 fw-bold">Find Your Perfect PG Easily</h1>
            <p className="lead">Safe, verified PGs with instant booking and student-friendly pricing.</p>

            <button onClick={onBookNow} className="btn btn-light btn-lg mt-3 shadow">
              Book Now
            </button>
          </div>

          <div className="col-md-6">
            <div className="card shadow-lg border-0">
              <img
                src="https://images.unsplash.com/photo-1598928506315-9e03b0fb0f8a?auto=format&fit=crop&w=800&q=60"
                className="card-img-top"
                alt="pg"
              />
              <div className="card-body">
                <h5 className="card-title">Sunny Comfort PG</h5>
                <p className="card-text">Fully furnished · WiFi · Meals · Security</p>
                <strong>₹6,500 / month</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
({ onBookNow }) {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h1 className="display-5 fw-bold">Find Safe & Comfortable PGs</h1>
            <p className="lead text-muted">Verified PGs, easy booking, and student-friendly prices.</p>

            <button onClick={onBookNow} className="btn btn-primary btn-lg mt-3">
              Book Now
            </button>
          </div>

          <div className="col-md-6">
            <div className="card shadow">
              <img
                src="https://images.unsplash.com/photo-1598928506315-9e03b0fb0f8a?auto=format&fit=crop&w=800&q=60"
                className="card-img-top"
                alt="pg"
              />
              <div className="card-body">
                <h5 className="card-title">Sunny Comfort PG</h5>
                <p className="card-text">WiFi · Meals · Security</p>
                <strong>₹6,500 / month</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingModal({ show, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Book a PG</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => { e.preventDefault(); onSubmit({ name, email, date }); }}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="date"
                className="form-control mb-3"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              <button type="submit" className="btn btn-success w-100">Confirm Booking</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  function handleBookNow() {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setShowBooking(true);
    }
  }

  function handleLogout() {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  }

  function handleSubmit(data) {
    console.log("Booking Data:", data);
    alert("Booking request submitted successfully!");
    setShowBooking(false);
  }

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Hero onBookNow={handleBookNow} />

      <section id="features" className="container py-5">
        <h2 className="text-center fw-bold mb-4">Why Students Love Us</h2>
        <div className="row"> className="container py-5">
        <h2 className="text-center mb-4">Why Choose Us?</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>Verified PGs</h5>
              <p>All PGs are safety checked.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>Easy Booking</h5>
              <p>Book your room in minutes.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>24/7 Support</h5>
              <p>We are always here to help.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pgs" className="container py-5">
        <h2 className="text-center mb-4">Popular PGs</h2>
        <div className="row">
          {[1, 2, 3].map((pg) => (
            <div className="col-md-4" key={pg}>
              <div className="card shadow mb-3">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60"
                  className="card-img-top"
                  alt="pg"
                />
                <div className="card-body">
                  <h5 className="card-title">PG Name {pg}</h5>
                  <p className="card-text">WiFi · Meals · Security</p>
                  <strong>₹{5000 + pg * 1000}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-3">
        © {new Date().getFullYear()} PG Management System
      </footer>

      <BookingModal
        show={showBooking}
        onClose={() => setShowBooking(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
