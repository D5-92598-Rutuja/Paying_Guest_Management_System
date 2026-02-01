import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../service/axiosInstance";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  /* -------------------- STATE -------------------- */
  const [activeTab, setActiveTab] = useState("kyc");
  const [isEditing, setIsEditing] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    dateOfBirth: ""
  });

  const [originalInfo, setOriginalInfo] = useState(null);

  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [kycStatus, setKycStatus] = useState("NEW");

  // ✅ ROOM STATE
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomError, setRoomError] = useState("");

  /* -------------------- LOGOUT -------------------- */
  const handleLogout = () => {
    navigate("/");
  };

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
      alert("Profile updated successfully");
    } catch {
      alert("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setPersonalInfo(originalInfo);
    setIsEditing(false);
  };

  /* -------------------- KYC -------------------- */
  // useEffect(() => {
  //   axios
  //     .get("/client/kyc")
  //     .then(res => setKycStatus(res.data?.status || "NEW"))
  //     .catch(() => setKycStatus("NEW"));
  // }, []);

  const submitKyc = async () => {
    if (!aadhaarFile || !photoFile) {
      alert("Please upload Aadhaar and Photo");
      return;
    }

    try {
      const aadhaarForm = new FormData();
      aadhaarForm.append("file", aadhaarFile);
      await axios.post("/client/kyc/upload-aadhaar", aadhaarForm);

      const photoForm = new FormData();
      photoForm.append("file", photoFile);
      await axios.post("/client/kyc/upload-photo", photoForm);

      await axios.post("/client/kyc/submit");

      alert("KYC submitted successfully");
      setKycStatus("PENDING");
    } catch {
      alert("KYC submission failed");
    }
  };

  /* -------------------- ROOM DETAILS -------------------- */
  // 🔴 TEMPORARY (will come from login later)
const USER_ID = 4;

  /* -------------------- ROOM DETAILS -------------------- */
useEffect(() => {
  if (activeTab === "room") {
    axios
      .get("/api/profile/room", {
        params: { userId: 2 } // hardcoded for now
      })
      .then(res => {
        setRoomDetails(res.data);
        setRoomError("");
      })
      .catch(err => {
        console.error("ROOM ERROR:", err);
        setRoomDetails(null);
        setRoomError("Room not allocated yet");
      });
  }
}, [activeTab]);



  /* -------------------- UI -------------------- */
  return (
    <div className="fullscreen-profile-page">
      <div className="fullscreen-profile-content">

        {/* HEADER */}
        <div className="fullscreen-profile-header">
          <h1 className="fullscreen-profile-main-title">Profile & KYC</h1>
          <p className="fullscreen-profile-subtitle">
            Manage your personal information and document verification
          </p>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
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
                    ✏️ Edit
                  </button>
                ) : (
                  <div className="fullscreen-profile-edit-actions">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                  </div>
                )}
              </div>

              <div className="fullscreen-profile-info-grid">
                <Field label="First Name" name="firstName" value={personalInfo.firstName} isEditing={isEditing} onChange={handleInputChange} />
                <Field label="Last Name" name="lastName" value={personalInfo.lastName} isEditing={isEditing} onChange={handleInputChange} />
                <Field label="Email" name="email" value={personalInfo.email} isEditing={isEditing} onChange={handleInputChange} />
                <Field label="Mobile" name="mobile" value={personalInfo.mobile} isEditing={isEditing} onChange={handleInputChange} />
                <Field label="Gender" name="gender" value={personalInfo.gender} isEditing={isEditing} onChange={handleInputChange} type="select" />
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
                    ✓ Room {roomDetails.roomStatus}
                  </div>
                </>
              )}
            </div>
          )}

          {/* KYC */}
          {activeTab === "kyc" && (
            <div className="fullscreen-profile-section">
              <h2>KYC Verification</h2>

              {kycStatus === "NEW" && (
                <>
                  <input type="file" onChange={e => setAadhaarFile(e.target.files[0])} />
                  <input type="file" onChange={e => setPhotoFile(e.target.files[0])} />
                  <button onClick={submitKyc}>Submit KYC</button>
                </>
              )}

              {kycStatus === "PENDING" && <p>⏳ KYC under verification</p>}
              {kycStatus === "APPROVED" && <p>✅ KYC Approved</p>}
              {kycStatus === "REJECTED" && <p>❌ KYC Rejected</p>}
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
