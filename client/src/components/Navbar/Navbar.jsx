import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('kyc');
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    mobile: '9876543210',
    gender: 'Male',
    dateOfBirth: '01/01/1995'
  });

  return (
    <div className="fullscreen-profile-page">
      {/* Top Navigation Bar */}
      <nav className="fullscreen-profile-navbar">
        <div className="fullscreen-profile-nav-container">
          <h1 className="fullscreen-profile-brand-logo">PGConnect</h1>
          <div className="fullscreen-profile-nav-actions">
            <button className="fullscreen-profile-nav-btn" onClick={() => navigate('/')}>
              <span className="fullscreen-profile-nav-icon">🏠</span>
              <span>Home</span>
            </button>
            <button className="fullscreen-profile-nav-btn" onClick={() => navigate('/dashboard')}>
              <span className="fullscreen-profile-nav-icon">📊</span>
              <span>Dashboard</span>
            </button>
            <button className="fullscreen-profile-nav-btn" onClick={() => navigate('/rooms')}>
              <span className="fullscreen-profile-nav-icon">🛏️</span>
              <span>Book Room</span>
            </button>
            <button className="fullscreen-profile-nav-btn" onClick={() => navigate('/announcements')}>
              <span className="fullscreen-profile-nav-icon">📢</span>
              <span>Announcements</span>
            </button>
            <button className="fullscreen-profile-nav-btn" onClick={() => navigate('/payment')}>
              <span className="fullscreen-profile-nav-icon">💰</span>
              <span>Payment</span>
            </button>
            <button className="fullscreen-profile-nav-btn" onClick={() => navigate('/profile')}>
              <span className="fullscreen-profile-nav-icon">👤</span>
              <span>Profile</span>
            </button>
            <button className="fullscreen-profile-nav-btn" onClick={() => navigate('/support')}>
              <span className="fullscreen-profile-nav-icon">❓</span>
              <span>Support</span>
            </button>
          </div>
        </div>
      </nav>

      
    </div>
  );
};

export default Navbar;