import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import axios from "../../service/axiosInstance";
import { Link } from "react-bootstrap-icons";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ================= LOGIN =================
    if (isLogin) {
      if (!formData.email || !formData.password) {
        alert("Please fill all fields");
        return;
      }

      try {
        const res = await axios.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        dispatch(
          loginSuccess({
            token: res.data.token,
            role: res.data.role,
          })
        );

        if (res.data.role === "ROLE_ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/home/dashboard");
        }
      } catch (error) {
        alert("Invalid email or password");
      }
    }

    // ================= REGISTER =================
    else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
         await axios.post("/auth/register", {
      firstName: formData.fullName.split(" ")[0],
      lastName: formData.fullName.split(" ").slice(1).join(" "),
      email: formData.email,
      password: formData.password,
      mobileNo: formData.mobileNumber,
      gender: formData.gender,
      dob: formData.dateOfBirth,
        });

        alert("Registration successful! Please login.");
        setIsLogin(true);
      } catch (error) {
        console.error(error);
        alert("Registration failed");
      }
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm px-4">
        <span className="navbar-brand fw-bold">PGConnect</span>
        <div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => navigate("/")}
          >
            🏠 Home
          </button>
          <button className="btn btn-dark">Login / Register</button>
        </div>
      </nav>

      {/* Content */}
      <div className="container d-flex flex-column align-items-center py-5">
        <h1 className="fw-bold mb-2 text-center">Welcome to PGConnect</h1>
        <p className="text-muted mb-4 text-center">
          Your journey to the perfect PG starts here
        </p>

        {/* Tabs */}
        <div className="btn-group mb-4">
          <button
            className={`btn ${isLogin ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`btn ${!isLogin ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Card */}
        <div className="card shadow-sm w-100" style={{ maxWidth: "500px" }}>
          <div className="card-body p-4">
            <h4 className="fw-bold mb-1">
              {isLogin ? "Login to Your Account" : "Create Your Account"}
            </h4>
            <p className="text-muted mb-4">
              {isLogin
                ? "Enter your credentials to continue"
                : "Join thousands of happy residents"}
            </p>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {!isLogin && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {!isLogin && (
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <button type="submit" className="btn btn-dark w-100 mt-3">
                {isLogin ? "Login" : "Create Account"}
              </button>

              {isLogin && (
                <div className="text-center mt-3">
                  <Link
                    to="/forgot-password"
                    className="text-decoration-none fw-semibold"
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}

              <p className="text-muted small text-center mt-4">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
