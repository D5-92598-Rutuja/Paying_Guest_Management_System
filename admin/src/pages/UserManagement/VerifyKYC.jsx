import React from "react";
import "./VerifyKYC.css";

export default function VerifyKYC() {

  // STATIC USERS ARRAY
  const kycUsers = [
    {
      name: "Raj Patel",
      kycId: "KYC001",
      email: "raj.patel@email.com",
      phone: "+91 9876543210",
      submitted: "10/5/2024",
      aadharNumber: "1234 5678 9012",
      status: "Pending"
    },
    {
      name: "Priya Sharma",
      kycId: "KYC002",
      email: "priya.sharma@email.com",
      phone: "+91 8765432109",
      submitted: "10/6/2024",
      aadharNumber: "2345 6789 0123",
      status: "Pending"
    },
     {
      name: "Priya Sharma",
      kycId: "KYC002",
      email: "priya.sharma@email.com",
      phone: "+91 8765432109",
      submitted: "10/6/2024",
      aadharNumber: "2345 6789 0123",
      status: "Pending"
    }
  ];

  return (
    <div className="verify-container">

      {/* PAGE HEADER */}
      <h1 className="verify-title">Verify KYC</h1>
      <p className="verify-subtitle">Review and approve user KYC documents</p>

      {/* STAT CARD */}
      <div className="stats-card">
        <div className="stats-number">{kycUsers.length}</div>
        <div className="stats-label">Pending KYC Verifications</div>
      </div>


      {/* LOOP OVER USERS */}
      {kycUsers.map((user, index) => (
        <div key={index} className="user-card">

          {/* USER HEADER */}
          <div className="user-header">
            <div>
              <h3 className="user-name">{user.name}</h3>
              <p className="user-id">KYC ID: {user.kycId}</p>
            </div>

            <span className="status-badge">{user.status}</span>
          </div>

          {/* USER DETAILS */}
          <div className="details-row">
            <div className="detail-block">
              <label>Email</label>
              <p>{user.email}</p>
            </div>

            <div className="detail-block">
              <label>Phone</label>
              <p>{user.phone}</p>
            </div>

            <div className="detail-block">
              <label>Submitted</label>
              <p>{user.submitted}</p>
            </div>
          </div>

          {/* DOCUMENTS */}
          <h2 className="docs-heading">Documents</h2>

          <div className="docs-container">

            {/* AADHAR CARD */}
            <div className="doc-box">
              <div className="doc-header">
                <h3>Aadhar Card</h3>
                <button className="view-btn">👁 View</button>
              </div>

              <div className="doc-preview">
                <span className="preview-icon">🖼</span>
              </div>

              <p className="doc-number">Number: {user.aadharNumber}</p>
            </div>

            {/* PHOTO */}
            <div className="doc-box">
              <div className="doc-header">
                <h3>Photograph</h3>
                <button className="view-btn">👁 View</button>
              </div>

              <div className="doc-preview">
                <span className="preview-icon">🖼</span>
              </div>

            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="actions-row">
            <button className="btn-approve">✔ Approve</button>
            <button className="btn-reject">✖ Reject</button>
          </div>

        </div>
      ))}

    </div>
  );
}
