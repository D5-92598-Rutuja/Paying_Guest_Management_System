import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    gender: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login submitted:', { 
        email: formData.email, 
        password: formData.password 
      });
    } else {
      console.log('Register submitted:', formData);
    }
  };

  return (
    <div className="fullscreen-auth-page">
      {/* Top Navigation Bar */}
      <nav className="fullscreen-navbar">
        <div className="fullscreen-nav-container">
          <h1 className="fullscreen-brand-logo">PGConnect</h1>
          <div className="fullscreen-nav-actions">
            <button className="fullscreen-profile-nav-btn" onClick={() => navigate('/')}>
              <span className="fullscreen-profile-nav-icon">🏠</span>
              <span>Home</span>
            </button>
            <button className="fullscreen-nav-login-btn">Login / Register</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="fullscreen-auth-content">
        <div className="fullscreen-auth-header">
          <h1 className="fullscreen-auth-main-title">Welcome to PGConnect</h1>
          <p className="fullscreen-auth-subtitle">Your journey to the perfect PG starts here</p>
        </div>

        {/* Tab Navigation */}
        <div className="fullscreen-auth-tab-container">
          <button
            className={`fullscreen-auth-tab-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`fullscreen-auth-tab-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Form Card */}
        <div className="fullscreen-auth-form-card">
          {isLogin ? (
            /* Login Form */
            <div className="fullscreen-form-wrapper">
              <h2 className="fullscreen-form-heading">Login to Your Account</h2>
              <p className="fullscreen-form-subheading">Enter your credentials to access your dashboard</p>

              <form onSubmit={handleSubmit} className="fullscreen-auth-form">
                <div className="fullscreen-form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="fullscreen-form-field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="fullscreen-form-submit-btn" onClick={() => navigate('/home/dashboard')}>
                  Login
                </button>

                

                <a href="#" className="fullscreen-forgot-password-link">
                  Forgot Password?
                </a>

                <p className="fullscreen-terms-text">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
          ) : (
            /* Register Form */
            <div className="fullscreen-form-wrapper">
              <h2 className="fullscreen-form-heading">Create Your Account</h2>
              <p className="fullscreen-form-subheading">Join thousands of happy residents</p>

              <form onSubmit={handleSubmit} className="fullscreen-auth-form">
                <div className="fullscreen-form-field">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="fullscreen-form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="fullscreen-form-field">
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="9876543210"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="fullscreen-form-row-split">
                  <div className="fullscreen-form-field">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="fullscreen-form-field">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                      type="text"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      placeholder="dd/mm/yyyy"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="fullscreen-form-field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="fullscreen-form-field">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="fullscreen-form-submit-btn">
                  Create Account
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Login;