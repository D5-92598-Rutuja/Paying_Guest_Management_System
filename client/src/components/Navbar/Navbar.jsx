import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="app-navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">PGConnect</h1>

        <div className="navbar-actions">
          <button onClick={() => navigate("/home/dashboard")}>🏠 Home</button>
          <button onClick={() => navigate("/home/rooms")}>🛏️ Book Room</button>
          <button onClick={() => navigate("/home/announcements")}>📢 Announcements</button>
          <button onClick={() => navigate("/home/payment")}>💰 Payment</button>
          <button onClick={() => navigate("/home/profile")}>👤 Profile</button>
          <button onClick={() => navigate("/home/support")}>❓ Support</button>
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login / Register
          </button>
        </div>
      </div>
    </nav>
  );
}
