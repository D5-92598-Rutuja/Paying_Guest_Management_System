import React, { useEffect, useState } from "react";
import axios from "../../service/axiosInstance";
// Ensure Bootstrap CSS is imported in your App.js or index.js:
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
  axios
    .get("/client/announcements")
    .then((res) => {
      setAnnouncements(res.data); // axios already parses JSON
    })
    .catch((err) => {
      console.error("Error fetching announcements:", err);
    });
}, []);

  // Helper function to choose badge colors
  const getBadgeColor = (status) => {
    return status === "ACTIVE" ? "success" : "secondary";
  };

  return (
    <div className="container py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0 fw-bold">Announcements</h2>
          <p className="text-muted mb-0">Latest updates and important notices</p>
        </div>
        <span className="badge bg-primary rounded-pill">
          {announcements.length} New
        </span>
      </div>

      {/* Email-like List Group */}
      <div className="list-group shadow-sm">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="list-group-item list-group-item-action p-4 border-start-0 border-end-0"
            style={{ cursor: "pointer" }}
          >
            <div className="row align-items-center g-2 m-2">
              
              {/* Col 1: Icon/Type (Small width) */}
              <div className="col-auto">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: a.type === "NOTICE" ? "#6f42c1" : "#0d6efd",
                  }}
                >
                  {a.type?.[0]}
                </div>
              </div>

              {/* Col 2: Main Content (Title & Message snippet) */}
              <div className="col">
                <div className="d-flex justify-content-between">
                  <h6 className="mb-1 text-dark fw-bold">
                    {a.title}
                    <span className="badge bg-light text-dark border ms-2 fw-normal">
                      {a.type}
                    </span>
                  </h6>
                  <small className="text-muted text-nowrap ms-2">
                    {a.createdOn}
                  </small>
                </div>
                
                {/* Text Truncate makes it look like email preview */}
                <p className="mb-1 text-secondary text-truncate" style={{ maxWidth: "800px" }}>
                  {a.message}
                </p>
                
                {/* Metadata Row (Dates & Status) */}
                <div className="d-flex align-items-center mt-1">
                  <span className={`badge bg-${getBadgeColor(a.status)} me-2`}>
                    {a.status}
                  </span>
                  <small className="text-muted" style={{ fontSize: "0.85rem" }}>
                     Valid: {a.startDate} — {a.endDate}
                  </small>
                </div>
              </div>
              
            </div>
          </div>
        ))}
        
        {announcements.length === 0 && (
          <div className="text-center p-5 m-5 text-muted">
            No announcements found.
          </div>
        )}
      </div>
    </div>
  );
}