// import React from "react";
// import "./VerifyKYC.css";

// export default function VerifyKYC() {

//   // STATIC USERS ARRAY
//   const kycUsers = [
//     {
//       name: "Raj Patel",
//       kycId: "KYC001",
//       email: "raj.patel@email.com",
//       phone: "+91 9876543210",
//       submitted: "10/5/2024",
//       aadharNumber: "1234 5678 9012",
//       status: "Pending"
//     },
//     {
//       name: "Priya Sharma",
//       kycId: "KYC002",
//       email: "priya.sharma@email.com",
//       phone: "+91 8765432109",
//       submitted: "10/6/2024",
//       aadharNumber: "2345 6789 0123",
//       status: "Pending"
//     },
//      {
//       name: "Priya Sharma",
//       kycId: "KYC002",
//       email: "priya.sharma@email.com",
//       phone: "+91 8765432109",
//       submitted: "10/6/2024",
//       aadharNumber: "2345 6789 0123",
//       status: "Pending"
//     }
//   ];

//   return (
//     <div className="verify-container">

//       {/* PAGE HEADER */}
//       <h1 className="verify-title">Verify KYC</h1>
//       <p className="verify-subtitle">Review and approve user KYC documents</p>

//       {/* STAT CARD */}
//       <div className="stats-card">
//         <div className="stats-number">{kycUsers.length}</div>
//         <div className="stats-label">Pending KYC Verifications</div>
//       </div>

//       {/* LOOP OVER USERS */}
//       {kycUsers.map((user, index) => (
//         <div key={index} className="user-card">

//           {/* USER HEADER */}
//           <div className="user-header">
//             <div>
//               <h3 className="user-name">{user.name}</h3>
//               <p className="user-id">KYC ID: {user.kycId}</p>
//             </div>

//             <span className="status-badge">{user.status}</span>
//           </div>

//           {/* USER DETAILS */}
//           <div className="details-row">
//             <div className="detail-block">
//               <label>Email</label>
//               <p>{user.email}</p>
//             </div>

//             <div className="detail-block">
//               <label>Phone</label>
//               <p>{user.phone}</p>
//             </div>

//             <div className="detail-block">
//               <label>Submitted</label>
//               <p>{user.submitted}</p>
//             </div>
//           </div>

//           {/* DOCUMENTS */}
//           <h2 className="docs-heading">Documents</h2>

//           <div className="docs-container">

//             {/* AADHAR CARD */}
//             <div className="doc-box">
//               <div className="doc-header">
//                 <h3>Aadhar Card</h3>
//                 <button className="view-btn">👁 View</button>
//               </div>

//               <div className="doc-preview">
//                 <span className="preview-icon">🖼</span>
//               </div>

//               <p className="doc-number">Number: {user.aadharNumber}</p>
//             </div>

//             {/* PHOTO */}
//             <div className="doc-box">
//               <div className="doc-header">
//                 <h3>Photograph</h3>
//                 <button className="view-btn">👁 View</button>
//               </div>

//               <div className="doc-preview">
//                 <span className="preview-icon">🖼</span>
//               </div>

//             </div>

//           </div>

//           {/* ACTION BUTTONS */}
//           <div className="actions-row">
//             <button className="btn-approve">✔ Approve</button>
//             <button className="btn-reject">✖ Reject</button>
//           </div>

//         </div>
//       ))}

//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import "./VerifyKYC.css";
// import axios from "../../service/axiosInstance";

// export default function VerifyKYC() {

//   const [kycUsers, setKycUsers] = useState([]);

//   // 🔹 Fetch pending KYCs
//   const loadKycs = async () => {
//     try {
//       const res = await axios.get("/admin/kyc/pending");
//       setKycUsers(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load KYC data");
//     }
//   };

//   useEffect(() => {
//     loadKycs();
//   }, []);

//   // ✅ Approve
//   const approveKyc = async (kycCode) => {
//     try {
//       await axios.post(`/admin/kyc/${kycCode}/approve`);
//       loadKycs(); // refresh list
//     } catch (err) {
//       alert("Approve failed");
//     }
//   };

//   // ❌ Reject
//   const rejectKyc = async (kycCode) => {
//     try {
//       await axios.post(`/admin/kyc/${kycCode}/reject`);
//       loadKycs();
//     } catch (err) {
//       alert("Reject failed");
//     }
//   };

//   return (
//     <div className="verify-container">

//       <h1 className="verify-title">Verify KYC</h1>
//       <p className="verify-subtitle">Review and approve user KYC documents</p>

//       {/* STAT CARD */}
//       <div className="stats-card">
//         <div className="stats-number">{kycUsers.length}</div>
//         <div className="stats-label">Pending KYC Verifications</div>
//       </div>

//       {/* LOOP OVER BACKEND DATA */}
//       {kycUsers.map((kyc) => (
//         <div key={kyc.kycCode} className="user-card">

//           {/* HEADER */}
//           <div className="user-header">
//             <div>
//               <h3 className="user-name">
//                 {kyc.user.firstName} {kyc.user.lastName}
//               </h3>
//               <p className="user-id">KYC ID: {kyc.kycCode}</p>
//             </div>

//             <span className="status-badge">{kyc.status}</span>
//           </div>

//           {/* DETAILS */}
//           <div className="details-row">
//             <div className="detail-block">
//               <label>Email</label>
//               <p>{kyc.user.email}</p>
//             </div>

//             <div className="detail-block">
//               <label>Phone</label>
//               <p>{kyc.user.mobileNo}</p>
//             </div>

//             <div className="detail-block">
//               <label>Submitted</label>
//               <p>{kyc.submittedOn}</p>
//             </div>
//           </div>

//           {/* DOCUMENTS */}
//           <h2 className="docs-heading">Documents</h2>

//           <div className="docs-container">

//             <div className="doc-box">
//               <div className="doc-header">
//                 <h3>Aadhar Card</h3>
//                 <button
//                   className="view-btn"
//                   onClick={() => window.open(kyc.aadhaarDocUrl)}
//                 >
//                   👁 View
//                 </button>
//               </div>

//               <div className="doc-preview">🖼</div>
//               <p className="doc-number">
//                 Number: {kyc.aadhaarNumber}
//               </p>
//             </div>

//             <div className="doc-box">
//               <div className="doc-header">
//                 <h3>Photograph</h3>
//                 <button
//                   className="view-btn"
//                   onClick={() => window.open(kyc.photoUrl)}
//                 >
//                   👁 View
//                 </button>
//               </div>

//               <div className="doc-preview">🖼</div>
//             </div>

//           </div>

//           {/* ACTIONS */}
//           <div className="actions-row">
//             <button
//               className="btn-approve"
//               onClick={() => approveKyc(kyc.kycCode)}
//             >
//               ✔ Approve
//             </button>

//             <button
//               className="btn-reject"
//               onClick={() => rejectKyc(kyc.kycCode)}
//             >
//               ✖ Reject
//             </button>
//           </div>

//         </div>
//       ))}

//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import "./VerifyKYC.css";
import axios from "../../service/axiosInstance";

export default function VerifyKYC() {
  const [kycs, setKycs] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔹 Load pending KYC list
  const loadKycs = async () => {
    try {
      const res = await axios.get("/admin/kyc/pending");
      setKycs(res.data);
    } catch (err) {
      alert("Failed to load KYC list");
    }
  };

  // 🔹 Load pending count
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

  // ✅ Approve KYC
  const approveKyc = async (kycCode) => {
    try {
      await axios.post(`/admin/kyc/${kycCode}/approve`);
      await loadKycs();
      await loadPendingCount();
    } catch (err) {
      alert("Approve failed");
    }
  };

  // ❌ Reject KYC
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
                    src={`http://localhost:8080${kyc.aadhaarDocUrl}`}
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
                    src={`http://localhost:8080${kyc.photoUrl}`}
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
              ✔ Approve
            </button>

            <button
              className="btn-reject"
              onClick={() => rejectKyc(kyc.kycCode)}
            >
              ✖ Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
