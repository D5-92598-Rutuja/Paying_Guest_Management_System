import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saved:', personalInfo);
  };

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
            <button className="fullscreen-profile-nav-btn active" onClick={() => navigate('/profile')}>
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

      {/* Main Content */}
      <div className="fullscreen-profile-content">
        <div className="fullscreen-profile-header">
          <h1 className="fullscreen-profile-main-title">Profile & KYC</h1>
          <p className="fullscreen-profile-subtitle">Manage your personal information and document verification</p>
        </div>

        {/* Tab Navigation */}
        <div className="fullscreen-profile-tab-container">
          <button
            className={`fullscreen-profile-tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Info
          </button>
          <button
            className={`fullscreen-profile-tab-btn ${activeTab === 'room' ? 'active' : ''}`}
            onClick={() => setActiveTab('room')}
          >
            Room Details
          </button>
          <button
            className={`fullscreen-profile-tab-btn ${activeTab === 'kyc' ? 'active' : ''}`}
            onClick={() => setActiveTab('kyc')}
          >
            KYC Documents
          </button>
        </div>

        {/* Content Card */}
        <div className="fullscreen-profile-card">
          {activeTab === 'personal' && (
            <div className="fullscreen-profile-section">
              <div className="fullscreen-profile-section-header">
                <div>
                  <h2 className="fullscreen-profile-section-title">Personal Information</h2>
                  <p className="fullscreen-profile-section-desc">Update your personal details and contact information</p>
                </div>
                {!isEditing ? (
                  <button className="fullscreen-profile-edit-btn" onClick={() => setIsEditing(true)}>
                    <span>✏️</span> Edit
                  </button>
                ) : (
                  <div className="fullscreen-profile-edit-actions">
                    <button className="fullscreen-profile-cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button className="fullscreen-profile-save-btn" onClick={handleSave}>Save</button>
                  </div>
                )}
              </div>

              <div className="fullscreen-profile-info-grid">
                <div className="fullscreen-profile-field">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input type="text" name="fullName" value={personalInfo.fullName} onChange={handleInputChange} />
                  ) : (
                    <p className="fullscreen-profile-value">{personalInfo.fullName}</p>
                  )}
                </div>
                <div className="fullscreen-profile-field">
                  <label>Email Address</label>
                  {isEditing ? (
                    <input type="email" name="email" value={personalInfo.email} onChange={handleInputChange} />
                  ) : (
                    <p className="fullscreen-profile-value">{personalInfo.email}</p>
                  )}
                </div>
                <div className="fullscreen-profile-field">
                  <label>Mobile Number</label>
                  {isEditing ? (
                    <input type="tel" name="mobile" value={personalInfo.mobile} onChange={handleInputChange} />
                  ) : (
                    <p className="fullscreen-profile-value">{personalInfo.mobile}</p>
                  )}
                </div>
                <div className="fullscreen-profile-field">
                  <label>Gender</label>
                  {isEditing ? (
                    <select name="gender" value={personalInfo.gender} onChange={handleInputChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="fullscreen-profile-value">{personalInfo.gender}</p>
                  )}
                </div>
                <div className="fullscreen-profile-field">
                  <label>Date of Birth</label>
                  {isEditing ? (
                    <input type="text" name="dateOfBirth" value={personalInfo.dateOfBirth} onChange={handleInputChange} />
                  ) : (
                    <p className="fullscreen-profile-value">{personalInfo.dateOfBirth}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'room' && (
            <div className="fullscreen-profile-section">
              <div className="fullscreen-profile-section-header-simple">
                <span className="fullscreen-profile-room-icon">🏠</span>
                <div>
                  <h2 className="fullscreen-profile-section-title">Room Information</h2>
                  <p className="fullscreen-profile-section-desc">Your current accommodation details</p>
                </div>
              </div>

              <div className="fullscreen-profile-info-grid">
                <div className="fullscreen-profile-field">
                  <label>Room Number</label>
                  <p className="fullscreen-profile-value-large">A-101</p>
                </div>
                <div className="fullscreen-profile-field">
                  <label>Room Type</label>
                  <p className="fullscreen-profile-value-large">Single Sharing</p>
                </div>
                <div className="fullscreen-profile-field">
                  <label>Monthly Rent</label>
                  <p className="fullscreen-profile-value-large">₹15,000</p>
                </div>
                <div className="fullscreen-profile-field">
                  <label>Move-in Date</label>
                  <p className="fullscreen-profile-value-large">September 15, 2024</p>
                </div>
              </div>

              <div className="fullscreen-profile-status-card">
                <span className="fullscreen-profile-status-icon">✓</span>
                <div>
                  <h3 className="fullscreen-profile-status-title">Room Active</h3>
                  <p className="fullscreen-profile-status-text">You have full access to all PG facilities and services.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'kyc' && (
            <div className="fullscreen-profile-section">
              <div className="fullscreen-profile-kyc-progress">
                <h2 className="fullscreen-profile-section-title">KYC Verification Progress</h2>
                <p className="fullscreen-profile-section-desc">Complete your document verification to enjoy full access</p>

                <div className="fullscreen-profile-progress-info">
                  <span>Verification Progress</span>
                  <span className="fullscreen-profile-progress-percent">100%</span>
                </div>

                <div className="fullscreen-profile-progress-bar">
                  <div className="fullscreen-profile-progress-fill"></div>
                </div>

                <div className="fullscreen-profile-status-card">
                  <span className="fullscreen-profile-status-icon">✓</span>
                  <p className="fullscreen-profile-status-text">Your KYC verification is complete! You have full access to all services.</p>
                </div>
              </div>

              <div className="fullscreen-profile-documents">
                <h2 className="fullscreen-profile-section-title">Required Documents</h2>
                <p className="fullscreen-profile-section-desc">Upload clear photos or scans of the following documents</p>

                <div className="fullscreen-profile-doc-list">
                  <div className="fullscreen-profile-doc-item verified">
                    <div className="fullscreen-profile-doc-icon">📄</div>
                    <div className="fullscreen-profile-doc-info">
                      <h3>Aadhar Card</h3>
                      <div className="fullscreen-profile-doc-badges">
                        <span className="badge-verified">✓ Verified</span>
                        <span className="badge-required">Required</span>
                      </div>
                      <p className="fullscreen-profile-doc-date">Uploaded on 20/11/2024</p>
                    </div>
                  </div>

                  <div className="fullscreen-profile-doc-item verified">
                    <div className="fullscreen-profile-doc-icon">📄</div>
                    <div className="fullscreen-profile-doc-info">
                      <h3>PAN Card</h3>
                      <div className="fullscreen-profile-doc-badges">
                        <span className="badge-verified">✓ Verified</span>
                        <span className="badge-required">Required</span>
                      </div>
                      <p className="fullscreen-profile-doc-date">Uploaded on 20/11/2024</p>
                    </div>
                  </div>

                  <div className="fullscreen-profile-doc-item verified">
                    <div className="fullscreen-profile-doc-icon">📄</div>
                    <div className="fullscreen-profile-doc-info">
                      <h3>Recent Photo</h3>
                      <div className="fullscreen-profile-doc-badges">
                        <span className="badge-verified">✓ Verified</span>
                        <span className="badge-required">Required</span>
                      </div>
                      <p className="fullscreen-profile-doc-date">Uploaded on 20/11/2024</p>
                    </div>
                  </div>

                  <div className="fullscreen-profile-doc-item">
                    <div className="fullscreen-profile-doc-icon">📄</div>
                    <div className="fullscreen-profile-doc-info">
                      <h3>Address Proof</h3>
                      <div className="fullscreen-profile-doc-badges">
                        <span className="badge-optional">Not Required</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="fullscreen-profile-guidelines">
                  <h3>Upload Guidelines</h3>
                  <ul>
                    <li>• Upload clear, readable images or PDFs</li>
                    <li>• File size should be less than 5MB</li>
                    <li>• Ensure all corners of the document are visible</li>
                    <li>• Verification typically takes 24-48 hours</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;