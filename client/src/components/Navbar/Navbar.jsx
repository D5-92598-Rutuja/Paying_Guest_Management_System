import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice"; 
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); //getting token from redux store
  const isLoggedIn = !!token; // True if token exists

  const handleLogout = () => {
    dispatch(logout()); // Clears token from Redux store
    navigate("/login");
  };

  return (
    <nav className="app-navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">PGConnect</h1>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <>
              <button onClick={() => navigate("/dashboard")}>🏠 Home</button>
              <button onClick={() => navigate("/rooms")}>🛏️ Book Room</button>
              <button onClick={() => navigate("/home/announcements")}>📢 Announcements</button>
              <button onClick={() => navigate("/home/payment")}>💰 Payment</button>
              <button onClick={() => navigate("/home/profile")}>👤 Profile</button>
              <button onClick={() => navigate("/home/support")}>❓ Support</button>
              <button onClick={() => navigate("/home/feedback")}>📝 Feedback</button>
              <button className="logout-btn" onClick={handleLogout}>
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/dashboard")}>🏠 Home</button>
              <button className="login-btn" onClick={() => navigate("/login")}>
                Login / Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
