import React, { useEffect, useState } from "react";
import "./VerifyKYC.css";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "../../service/axiosInstance";

export default function VerifyKYC() {
  const [kycs, setKycs] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  //Load pending KYC list
  const loadKycs = async () => {
    try {
      const res = await axios.get("/admin/kyc/pending");
      setKycs(res.data);
    } catch (err) {
      alert("Failed to load KYC list");
    }
  };

  //Load pending count
  const loadPendingCount = async () => {
    try {
      const res = await axios.get("/admin/kyc/pending/count");
      setPendingCount(res.data);
    } catch (err) {
      console.error("Failed to load pending count");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await loadKycs();
      await loadPendingCount();
      setLoading(false);
    };
    loadData();
  }, []);

  //Approve KYC
  const approveKyc = async (kycCode) => {
    try {
      await axios.post(`/admin/kyc/${kycCode}/approve`);
      await loadKycs();
      await loadPendingCount();
    } catch (err) {
      alert("Approve failed");
    }
  };

  // Reject KYC
  const rejectKyc = async (kycCode) => {
    try {
      await axios.post(`/admin/kyc/${kycCode}/reject`);
      await loadKycs();
      await loadPendingCount();
    } catch (err) {
      alert("Reject failed");
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="verify-container">
      {/* PAGE HEADER */}
      <h1 className="verify-title">Verify KYC</h1>
      <p className="verify-subtitle">Review and approve user KYC documents</p>

      {/* STATS CARD */}
      <div className="stats-card">
        <div className="stats-number">{pendingCount}</div>
        <div className="stats-label">Pending KYC Verifications</div>
      </div>

      {/* NO DATA */}
      {kycs.length === 0 && (
        <p style={{ textAlign: "center" }}>No pending KYC records</p>
      )}

      {/* KYC CARDS */}
      {kycs.map((kyc) => (
        <div key={kyc.kycCode} className="user-card">
          {/* HEADER */}
          <div className="user-header">
            <div>
              <h3 className="user-name">
                {kyc.user.firstName} {kyc.user.lastName}
              </h3>
              <p className="user-id">KYC ID: {kyc.kycCode}</p>
            </div>
            <span className="status-badge">{kyc.status}</span>
          </div>

          {/* USER DETAILS */}
          <div className="details-row">
            <div className="detail-block">
              <label>Email</label>
              <p>{kyc.user.email}</p>
            </div>
            <div className="detail-block">
              <label>Phone</label>
              <p>{kyc.user.mobileNo}</p>
            </div>
            <div className="detail-block">
              <label>Submitted</label>
              <p>{kyc.submittedOn}</p>
            </div>
          </div>

          {/* DOCUMENTS */}
          <h2 className="docs-heading">Documents</h2>

          <div className="docs-container">
            {/* AADHAAR */}
            <div className="doc-box">
              <div className="doc-header">
                <h3>Aadhar Card</h3>
              </div>

              <div className="doc-preview">
                {kyc.aadhaarDocUrl ? (
                  <img
                    src={`${API_BASE_URL}${kyc.aadhaarDocUrl}`}
                    alt="Aadhaar Card"
                    className="doc-image"
                  />
                ) : (
                  <span>No Aadhaar Uploaded</span>
                )}
              </div>
            </div>

            {/* PHOTO */}
            <div className="doc-box">
              <div className="doc-header">
                <h3>Photograph</h3>
              </div>
              <div className="doc-preview">
                {kyc.photoUrl ? (
                  <img
                    src={`${API_BASE_URL}${kyc.photoUrl}`}
                    alt="User Photograph"
                    className="doc-image"
                  />
                ) : (
                  <span>No Photo Uploaded</span>
                )}
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="actions-row">
            <button
              className="btn-approve"
              onClick={() => approveKyc(kyc.kycCode)}
            >
              Approve
            </button>

            <button
              className="btn-reject"
              onClick={() => rejectKyc(kyc.kycCode)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
