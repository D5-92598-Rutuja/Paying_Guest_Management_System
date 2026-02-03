import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from "../../service/axiosInstance";
import './Profile.css';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [kycStatus, setKycStatus] = useState("NEW");

  const [activeTab, setActiveTab] = useState('kyc');
  const [isEditing, setIsEditing] = useState(false);
  const [originalInfo, setOriginalInfo] = useState(null);

  // ROOM STATE
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomError, setRoomError] = useState("");


  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    dateOfBirth: ""
  });

  /* -------------------- PERSONAL INFO -------------------- */
  useEffect(() => {
    axios
      .get("/users/me")
      .then(res => {
        setPersonalInfo(res.data);
        setOriginalInfo(res.data);
      })
      .catch(err => console.error("Failed to fetch profile:", err));
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put("/users/me", personalInfo);
      setIsEditing(false);
      setOriginalInfo(personalInfo);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setPersonalInfo(originalInfo);
    setIsEditing(false);
  };

  /* -------------------- ROOM DETAILS -------------------- */

  useEffect(() => {
    if (activeTab === "room") {
      const fetchRoom = async () => {
        try {
          const res = await axios.get("/client/profile/room"); // match backend
          setRoomDetails(res.data);
          setRoomError("");
        } catch (err) {
          console.error("ROOM ERROR:", err.response?.data || err.message);
          setRoomDetails(null);
          setRoomError("Room not allocated yet");
        }
      };
      fetchRoom();
    } else {
      setRoomDetails(null);
      setRoomError("");
    }
  }, [activeTab]);

  /* -------------------- KYC -------------------- */
  // Load KYC status from backend
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

  /* -------------------- ROOM DETAILS -------------------- */
  // useEffect(() => {
  //   if (activeTab === "room") {
  //     axios
  //       .get("/api/profile/room", {
  //        // params: { userId: 14 } // hardcoded for now
  //       })
  //       .then(res => {
  //         setRoomDetails(res.data);
  //         setRoomError("");
  //       })
  //       .catch(err => {
  //         console.error("ROOM ERROR:", err);
  //         setRoomDetails(null);
  //         setRoomError("Room not allocated yet");
  //       });
  //   }
  // }, [activeTab]);
  useEffect(() => {
    console.log("Tab changed to:", activeTab); // DEBUG

    if (activeTab === "room") {
      const fetchRoom = async () => {
        try {
          const res = await axios.get("/client/profile/room");
          console.log("Room data:", res.data); // DEBUG
          setRoomDetails(res.data);
          setRoomError("");
        } catch (err) {
          console.error("ROOM ERROR:", err.response?.data || err.message);
          setRoomDetails(null);
          setRoomError("Room not allocated yet");
        }
      };
      fetchRoom();
    } else {
      setRoomDetails(null);
      setRoomError("");
    }
  }, [activeTab]);

  // Upload Aadhaar
  const uploadAadhaar = async () => {
    const formData = new FormData();
    formData.append("file", aadhaarFile);
    await axios.post("/client/kyc/upload-aadhaar", formData);
  };

  // Upload Photo
  const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append("file", photoFile);
    await axios.post("/client/kyc/upload-photo", formData);
  };

  // Submit KYC
  const submitKyc = async () => {
    if (!aadhaarFile || !photoFile) {
      toast.warn("Please upload Aadhaar and Photo");
      return;
    }

    try {
      await uploadAadhaar();
      await uploadPhoto();
      await axios.post("/client/kyc/submit");
      toast.success("KYC submitted successfully");
      setKycStatus("PENDING");
    } catch {
      toast.error("KYC submission failed");
    }
  };



  return (
    <div className="fullscreen-profile-page">
      <div className="fullscreen-profile-content">

        
        {/* HEADER */}
        <div className="fullscreen-profile-header">
          <h1 className="fullscreen-profile-main-title">Profile & KYC</h1>
          <p className="fullscreen-profile-subtitle">
            Manage your personal information and document verification
          </p>
        </div>

        {/* TABS */}
        <div className="fullscreen-profile-tab-container">
          <button
            className={`fullscreen-profile-tab-btn ${activeTab === "personal" ? "active" : ""}`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Info
          </button>
          <button
            className={`fullscreen-profile-tab-btn ${activeTab === "room" ? "active" : ""}`}
            onClick={() => setActiveTab("room")}
          >
            Room Details
          </button>

          <button
            className={`fullscreen-profile-tab-btn ${activeTab === "kyc" ? "active" : ""}`}
            onClick={() => setActiveTab("kyc")}
          >
            KYC Documents
          </button>
        </div>

        {/* CARD */}
        <div className="fullscreen-profile-card">

          {/* PERSONAL INFO */}
          {activeTab === "personal" && (
            <div className="fullscreen-profile-section">
              <div className="fullscreen-profile-section-header">
                <div>
                  <h2>Personal Information</h2>
                  <p>Update your personal details</p>
                </div>

                {!isEditing ? (
                  <button
                    className="fullscreen-profile-edit-btn"
                    onClick={() => setIsEditing(true)}
                  >

                    Edit
                  </button>
                ) : (
                  <div className="fullscreen-profile-edit-actions">
                    <button className="btn btn-danger p-2" onClick={handleCancel}>Cancel</button>
                    <button className="btn btn-success p-2" onClick={handleSave}>Save</button>
                  </div>
                )}
              </div>

              <div className="fullscreen-profile-info-grid">
                <Field label="First Name" name="firstName" value={personalInfo.firstName} isEditing={isEditing} onChange={handleInputChange} />
                <Field label="Last Name" name="lastName" value={personalInfo.lastName} isEditing={isEditing} onChange={handleInputChange} />
                <Field label="Email" name="email" value={personalInfo.email} isEditing={isEditing} onChange={() => toast.warn('You cannot modify email!')} />
                <Field label="Mobile" name="mobile" value={personalInfo.mobile} isEditing={isEditing} onChange={handleInputChange} />
                <Field label="Gender" name="gender" value={personalInfo.gender} isEditing={isEditing} onChange={() => toast.warn('You cannot modify gender!')} />
                <Field label="Date of Birth" name="dateOfBirth" value={personalInfo.dateOfBirth} isEditing={isEditing} onChange={handleInputChange} type="date" />
              </div>
            </div>
          )}

          {/* ROOM DETAILS */}

          {activeTab === "room" && (
            <div className="fullscreen-profile-section">
              <h2>Room Information</h2>

              {roomError && (
                <p style={{ color: "red", marginTop: "10px" }}>{roomError}</p>
              )}

              {roomDetails && (
                <>
                  <div className="fullscreen-profile-info-grid">
                    <Static label="Room Number" value={roomDetails.roomNumber} />
                    <Static label="Room Type" value={roomDetails.sharingType} />
                    <Static label="Monthly Rent" value={`₹${roomDetails.monthlyRent}`} />
                    <Static label="Allocation Status" value={roomDetails.allocationStatus} />
                  </div>
                  <div className="fullscreen-profile-status-card">
                    Room {roomDetails.roomStatus}
                  </div>
                </>
              )}
            </div>
          )}
          {/* UPDATED KYC TAB */}
          {activeTab === 'kyc' && (
            <div className="fullscreen-profile-section">

              <h2 className="fullscreen-profile-section-title">
                KYC Verification
              </h2>
              {kycStatus === "PENDING" && (
                <div className="fullscreen-profile-status-card">
                  Your KYC is under verification
                </div>
              )}

              {kycStatus === "APPROVED" && (
                <div className="fullscreen-profile-status-card verified">
                  KYC Approved
                </div>
              )}

              {kycStatus === "REJECTED" && (
                <div className="fullscreen-profile-status-card rejected">
                  KYC Rejected — Please re-upload documents
                </div>
              )}
              {(kycStatus === "NEW"|| kycStatus === "REJECTED")&& (
                <div className="fullscreen-profile-documents">
                  <h2 className="fullscreen-profile-section-title">Required Documents</h2>
                  <p className="fullscreen-profile-section-desc">
                    Upload clear photos or scans of the following documents
                  </p>

                  <div className="fullscreen-profile-doc-list">

                    {/* Aadhaar Upload */}
                    <div className="fullscreen-profile-doc-item">
                      <div className="fullscreen-profile-doc-info">
                        <h3>Aadhaar Card</h3>

                        <div className="fullscreen-profile-doc-badges">
                          <span className="badge-required">Required</span>
                        </div>

                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="fullscreen-profile-file-input"
                          onChange={(e) => setAadhaarFile(e.target.files[0])}
                        />
                      </div>
                    </div>

                    {/* Photo Upload */}
                    <div className="fullscreen-profile-doc-item">
                      <div className="fullscreen-profile-doc-info">
                        <h3>Recent Photograph</h3>

                        <div className="fullscreen-profile-doc-badges">
                          <span className="badge-required">Required</span>
                        </div>

                        <input
                          type="file"
                          accept="image/*"
                          className="fullscreen-profile-file-input"
                          onChange={(e) => setPhotoFile(e.target.files[0])}
                        />
                      </div>
                    </div>

                  </div>

                  <button
                    className="btn btn-dark fullscreen-profile-submit-btn"
                    onClick={submitKyc}
                  >
                    Submit for Verification
                  </button>

                </div>


              )}

              
              <div className="fullscreen-profile-guidelines">
                <h3>Upload Guidelines</h3>
                <ul>
                  <li>• Upload clear, readable images or PDFs</li>
                  <li>• File size should be less than 2MB</li>
                  <li>• Ensure all corners of the document are visible</li>
                  <li>• Verification typically takes 24-48 hours</li>
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

/* -------------------- REUSABLE COMPONENTS -------------------- */
const Field = ({ label, name, value, isEditing, onChange, type }) => (
  <div className="fullscreen-profile-field">
    <label>{label}</label>
    {isEditing ? (
      type === "select" ? (
        <select name={name} value={value} onChange={onChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      ) : (
        <input type={type || "text"} name={name} value={value} onChange={onChange} />
      )
    ) : (
      <p className="fullscreen-profile-value">{value || "-"}</p>
    )}
  </div>
);

const Static = ({ label, value }) => (
  <div className="fullscreen-profile-field">
    <label>{label}</label>
    <p className="fullscreen-profile-value-large">{value}</p>
  </div>
);

export default Profile;


