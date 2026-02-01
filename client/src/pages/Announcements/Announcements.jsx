import React, { useEffect, useState } from 'react';
import './announcements.css';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/announcements')
      .then((res) => res.json())
      .then((data) => setAnnouncements(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page-container">
      <div className="page-wrapper">
        <h1 className="page-title mt-3">Announcements</h1>
        <p className="page-subtitle">
          Latest updates and important notices
        </p>

        {announcements.map((a) => (
          <div key={a.id} className="announcement-card">
            <div className="card-main">
              <div className="card-header">
                <div className="card-icon">
                  {a.type?.[0]}
                </div>

                <div>
                  <h2 className="card-title">{a.title}</h2>
                  <div className="card-meta">
                    <span className="tag">{a.type}</span>
                    <span className="status">{a.status}</span>
                  </div>
                </div>
              </div>

              <p className="card-content">{a.message}</p>
            </div>

            <div className="card-side">
              <div className="date">
                📅 {a.createdOn}
              </div>
              <div className="card-datetime">
                ⏰ {a.startDate} – {a.endDate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
