// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import { logout } from "../../redux/authSlice";
// import './Profile.css';

// const Profile = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();  

//   const [activeTab, setActiveTab] = useState('kyc');
//   const [isEditing, setIsEditing] = useState(false);

//   const handleLogout = () => {      
//     dispatch(logout());
//     navigate("/");
//   };

//   const [personalInfo, setPersonalInfo] = useState({
//     fullName: 'John Doe',
//     email: 'john@example.com',
//     mobile: '9876543210',
//     gender: 'Male',
//     dateOfBirth: '01/01/1995'
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPersonalInfo(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     console.log('Saved:', personalInfo);
//   };

//   return (
//     <div className="fullscreen-profile-page">

//       {/* Main Content */}
//       <div className="fullscreen-profile-content">
//         <div className="fullscreen-profile-header">
//           <h1 className="fullscreen-profile-main-title">Profile & KYC</h1>
//           <p className="fullscreen-profile-subtitle">Manage your personal information and document verification</p>
//           <button className="btn btn-outline-danger"
//           onClick={handleLogout}>Logout
//         </button>

//         </div>

//         {/* Tab Navigation */}
//         <div className="fullscreen-profile-tab-container">
//           <button
//             className={`fullscreen-profile-tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
//             onClick={() => setActiveTab('personal')}
//           >
//             Personal Info
//           </button>
//           <button
//             className={`fullscreen-profile-tab-btn ${activeTab === 'room' ? 'active' : ''}`}
//             onClick={() => setActiveTab('room')}
//           >
//             Room Details
//           </button>
//           <button
//             className={`fullscreen-profile-tab-btn ${activeTab === 'kyc' ? 'active' : ''}`}
//             onClick={() => setActiveTab('kyc')}
//           >
//             KYC Documents
//           </button>
//         </div>

//         {/* Content Card */}
//         <div className="fullscreen-profile-card">
//           {activeTab === 'personal' && (
//             <div className="fullscreen-profile-section">
//               <div className="fullscreen-profile-section-header">
//                 <div>
//                   <h2 className="fullscreen-profile-section-title">Personal Information</h2>
//                   <p className="fullscreen-profile-section-desc">Update your personal details and contact information</p>
//                 </div>
//                 {!isEditing ? (
//                   <button className="fullscreen-profile-edit-btn" onClick={() => setIsEditing(true)}>
//                     <span>✏️</span> Edit
//                   </button>
//                 ) : (
//                   <div className="fullscreen-profile-edit-actions">
//                     <button className="fullscreen-profile-cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
//                     <button className="fullscreen-profile-save-btn" onClick={handleSave}>Save</button>
//                   </div>
//                 )}
//               </div>

//               <div className="fullscreen-profile-info-grid">
//                 <div className="fullscreen-profile-field">
//                   <label>Full Name</label>
//                   {isEditing ? (
//                     <input type="text" name="fullName" value={personalInfo.fullName} onChange={handleInputChange} />
//                   ) : (
//                     <p className="fullscreen-profile-value">{personalInfo.fullName}</p>
//                   )}
//                 </div>
//                 <div className="fullscreen-profile-field">
//                   <label>Email Address</label>
//                   {isEditing ? (
//                     <input type="email" name="email" value={personalInfo.email} onChange={handleInputChange} />
//                   ) : (
//                     <p className="fullscreen-profile-value">{personalInfo.email}</p>
//                   )}
//                 </div>
//                 <div className="fullscreen-profile-field">
//                   <label>Mobile Number</label>
//                   {isEditing ? (
//                     <input type="tel" name="mobile" value={personalInfo.mobile} onChange={handleInputChange} />
//                   ) : (
//                     <p className="fullscreen-profile-value">{personalInfo.mobile}</p>
//                   )}
//                 </div>
//                 <div className="fullscreen-profile-field">
//                   <label>Gender</label>
//                   {isEditing ? (
//                     <select name="gender" value={personalInfo.gender} onChange={handleInputChange}>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   ) : (
//                     <p className="fullscreen-profile-value">{personalInfo.gender}</p>
//                   )}
//                 </div>
//                 <div className="fullscreen-profile-field">
//                   <label>Date of Birth</label>
//                   {isEditing ? (
//                     <input type="text" name="dateOfBirth" value={personalInfo.dateOfBirth} onChange={handleInputChange} />
//                   ) : (
//                     <p className="fullscreen-profile-value">{personalInfo.dateOfBirth}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'room' && (
//             <div className="fullscreen-profile-section">
//               <div className="fullscreen-profile-section-header-simple">
//                 <span className="fullscreen-profile-room-icon">🏠</span>
//                 <div>
//                   <h2 className="fullscreen-profile-section-title">Room Information</h2>
//                   <p className="fullscreen-profile-section-desc">Your current accommodation details</p>
//                 </div>
//               </div>

//               <div className="fullscreen-profile-info-grid">
//                 <div className="fullscreen-profile-field">
//                   <label>Room Number</label>
//                   <p className="fullscreen-profile-value-large">A-101</p>
//                 </div>
//                 <div className="fullscreen-profile-field">
//                   <label>Room Type</label>
//                   <p className="fullscreen-profile-value-large">Single Sharing</p>
//                 </div>
//                 <div className="fullscreen-profile-field">
//                   <label>Monthly Rent</label>
//                   <p className="fullscreen-profile-value-large">₹15,000</p>
//                 </div>
//                 <div className="fullscreen-profile-field">
//                   <label>Move-in Date</label>
//                   <p className="fullscreen-profile-value-large">September 15, 2024</p>
//                 </div>
//               </div>

//               <div className="fullscreen-profile-status-card">
//                 <span className="fullscreen-profile-status-icon">✓</span>
//                 <div>
//                   <h3 className="fullscreen-profile-status-title">Room Active</h3>
//                   <p className="fullscreen-profile-status-text">You have full access to all PG facilities and services.</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'kyc' && (
//             <div className="fullscreen-profile-section">
//               <div className="fullscreen-profile-kyc-progress">
//                 <h2 className="fullscreen-profile-section-title">KYC Verification Progress</h2>
//                 <p className="fullscreen-profile-section-desc">Complete your document verification to enjoy full access</p>

//                 <div className="fullscreen-profile-progress-info">
//                   <span>Verification Progress</span>
//                   <span className="fullscreen-profile-progress-percent">100%</span>
//                 </div>

//                 <div className="fullscreen-profile-progress-bar">
//                   <div className="fullscreen-profile-progress-fill"></div>
//                 </div>

//                 <div className="fullscreen-profile-status-card">
//                   <span className="fullscreen-profile-status-icon">✓</span>
//                   <p className="fullscreen-profile-status-text">Your KYC verification is complete! You have full access to all services.</p>
//                 </div>
//               </div>

//               <div className="fullscreen-profile-documents">
//                 <h2 className="fullscreen-profile-section-title">Required Documents</h2>
//                 <p className="fullscreen-profile-section-desc">Upload clear photos or scans of the following documents</p>

//                 <div className="fullscreen-profile-doc-list">
//                   <div className="fullscreen-profile-doc-item verified">
//                     <div className="fullscreen-profile-doc-icon">📄</div>
//                     <div className="fullscreen-profile-doc-info">
//                       <h3>Aadhar Card</h3>
//                       <div className="fullscreen-profile-doc-badges">
//                         <span className="badge-verified">✓ Verified</span>
//                         <span className="badge-required">Required</span>
//                       </div>
//                       <p className="fullscreen-profile-doc-date">Uploaded on 20/11/2024</p>
//                     </div>
//                   </div>

//                   <div className="fullscreen-profile-doc-item verified">
//                     <div className="fullscreen-profile-doc-icon">📄</div>
//                     <div className="fullscreen-profile-doc-info">
//                       <h3>PAN Card</h3>
//                       <div className="fullscreen-profile-doc-badges">
//                         <span className="badge-verified">✓ Verified</span>
//                         <span className="badge-required">Required</span>
//                       </div>
//                       <p className="fullscreen-profile-doc-date">Uploaded on 20/11/2024</p>
//                     </div>
//                   </div>

//                   <div className="fullscreen-profile-doc-item verified">
//                     <div className="fullscreen-profile-doc-icon">📄</div>
//                     <div className="fullscreen-profile-doc-info">
//                       <h3>Recent Photo</h3>
//                       <div className="fullscreen-profile-doc-badges">
//                         <span className="badge-verified">✓ Verified</span>
//                         <span className="badge-required">Required</span>
//                       </div>
//                       <p className="fullscreen-profile-doc-date">Uploaded on 20/11/2024</p>
//                     </div>
//                   </div>

//                   <div className="fullscreen-profile-doc-item">
//                     <div className="fullscreen-profile-doc-icon">📄</div>
//                     <div className="fullscreen-profile-doc-info">
//                       <h3>Address Proof</h3>
//                       <div className="fullscreen-profile-doc-badges">
//                         <span className="badge-optional">Not Required</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="fullscreen-profile-guidelines">
//                   <h3>Upload Guidelines</h3>
//                   <ul>
//                     <li>• Upload clear, readable images or PDFs</li>
//                     <li>• File size should be less than 5MB</li>
//                     <li>• Ensure all corners of the document are visible</li>
//                     <li>• Verification typically takes 24-48 hours</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import axios from "../../service/axiosInstance";
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();  

  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [kycStatus, setKycStatus] = useState("NEW"); 

  const [activeTab, setActiveTab] = useState('kyc');
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {      
    dispatch(logout());
    navigate("/");
  };

  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
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

useEffect(() => {
  axios.get("/client/profile").then(res => {
    setPersonalInfo(res.data);
  });
}, []);

const handleSave = async () => {
  await axios.put("/client/profile", personalInfo);
  setIsEditing(false);
  alert("Profile updated successfully");
};


  // 🔹 Load KYC status from backend
  useEffect(() => {
    const loadKyc = async () => {
      try {
        const res = await axios.get("/client/kyc");
        if (res.data?.status) {
          setKycStatus(res.data.status);
        }
      } catch {
        setKycStatus("NEW");
      }
    };
    loadKyc();
  }, []);

  // 🔹 Upload Aadhaar
  const uploadAadhaar = async () => {
    const formData = new FormData();
    formData.append("file", aadhaarFile);
    await axios.post("/client/kyc/upload-aadhaar", formData);
  };

  // 🔹 Upload Photo
  const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append("file", photoFile);
    await axios.post("/client/kyc/upload-photo", formData);
  };

  // 🔹 Submit KYC
  const submitKyc = async () => {
    if (!aadhaarFile || !photoFile) {
      alert("Please upload Aadhaar and Photo");
      return;
    }

    try {
      await uploadAadhaar();
      await uploadPhoto();
      await axios.post("/client/kyc/submit");
      alert("KYC submitted successfully");
      setKycStatus("PENDING");
    } catch {
      alert("KYC submission failed");
    }
  };

  return (
    <div className="fullscreen-profile-page">
      <div className="fullscreen-profile-content">

        <div className="fullscreen-profile-header">
          <h1 className="fullscreen-profile-main-title">Profile & KYC</h1>
          <p className="fullscreen-profile-subtitle">
            Manage your personal information and document verification
          </p>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Tabs */}
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

        {/* CONTENT */}
        <div className="fullscreen-profile-card">
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
                  <label>First Name</label>
                  {isEditing ? (
                    <input type="text" name="firstName" value={personalInfo.firstName} onChange={handleInputChange} />
                  ) : (
                    <p className="fullscreen-profile-value">{personalInfo.firstName}</p>
                  )}
                </div>
                 <div className="fullscreen-profile-field">
                  <label>Last Name</label>
                  {isEditing ? (
                    <input type="text" name="LastName" value={personalInfo.LastName} onChange={handleInputChange} />
                  ) : (
                    <p className="fullscreen-profile-value">{personalInfo.LastName}</p>
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
          {/* ✅ UPDATED KYC TAB */}
          {activeTab === 'kyc' && (
            <div className="fullscreen-profile-section">

              <h2 className="fullscreen-profile-section-title">
                KYC Verification
              </h2>

              {kycStatus === "NEW" && (
                <>
                  <div className="upload-box">
                    <label>Aadhaar Card</label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setAadhaarFile(e.target.files[0])}
                    />
                  </div>

                  <div className="upload-box">
                    <label>Recent Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPhotoFile(e.target.files[0])}
                    />
                  </div>

                  <button className="btn btn-primary" onClick={submitKyc}>
                    Submit KYC
                  </button>
                </>
              )}

              {kycStatus === "PENDING" && (
                <div className="fullscreen-profile-status-card">
                  ⏳ Your KYC is under verification
                </div>
              )}

              {kycStatus === "APPROVED" && (
                <div className="fullscreen-profile-status-card verified">
                  ✅ KYC Approved
                </div>
              )}

              {kycStatus === "REJECTED" && (
                <div className="fullscreen-profile-status-card rejected">
                  ❌ KYC Rejected — Please re-upload documents
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;


