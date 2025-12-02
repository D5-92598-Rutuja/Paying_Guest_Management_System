import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  
    const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Login to continue</p>

        <form>
          <div className="input-group">
            <label>Mobile Number</label>
            <input type="text" placeholder="Enter mobile number" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" />
          </div>

          <button className="btn-login">Login</button>
        </form>

        <p className="register-text">
          Not a user?
          <span className="register-link" onClick={() => navigate("/register")}>
          Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;
