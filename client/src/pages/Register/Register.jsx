import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; 

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    roomType: "",
    aadhar: "",
    joiningDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="title">Register</h2>
        <p className="subtitle">Create your account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Middle Name</label>
            <input
              type="text"
              name="middleName"
              placeholder="Enter middle name"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Mobile</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Room Type</label>
            <input
              type="text"
              name="roomType"
              placeholder="Enter room type"
              value={formData.roomType}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Aadhar Card</label>
            <input
              type="text"
              name="aadhar"
              placeholder="Enter Aadhar number"
              value={formData.aadhar}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-login">
            Register
          </button>
        </form>

        <p className="register-text">
          Already a user?{" "}
          <span className="login-link" onClick={() => navigate("/login")}>
          Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
