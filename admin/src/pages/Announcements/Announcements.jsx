import React, { useState } from 'react';
import './announcements.css';

const Announcement = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Active');

  const announcements = [
    {
      id: 'ANN001',
      title: 'Monthly Rent Due Reminder',
      message:
        'Please pay your monthly rent by 5th of October. Late payment charges apply after 10th.',
      start: '10/1/2024',
      end: '10/10/2024',
      status: 'Active',
    },
    {
      id: 'ANN002',
      title: 'Wi-Fi Maintenance Schedule',
      message:
        'Internet services will be down for maintenance on Sunday from 2 AM to 6 AM.',
      start: '10/6/2024',
      end: '10/6/2024',
      status: 'Active',
    },
    {
      id: 'ANN003',
      title: 'New Food Menu Available',
      message:
        'We have updated our mess menu with new dishes. Check it out at the mess hall.',
      start: '9/20/2024',
      end: '9/30/2024',
      status: 'Inactive',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, message, startDate, endDate, status });
  };

  return (
    <div className="announcement-container">
      <h2>Post Announcement</h2>

      <div className="announcement-stats">
        <div className="stat-box">2 Active Announcements</div>
        <div className="stat-box">3 Total Announcements</div>
        <div className="stat-box">0 This Week</div>
      </div>

      <form className="create-form" onSubmit={handleSubmit}>
        <h3>Create New Announcement</h3>

        <label>Title *</label>
        <input
          type="text"
          placeholder="Enter announcement title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Message *</label>
        <textarea
          placeholder="Enter announcement message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="date-fields">
          <div>
            <label>Start Date *</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label>End Date *</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <label>Status *</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit" className="post-btn">Post Announcement</button>
      </form>

      <h3>Existing Announcements</h3>
      <table className="announcement-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Message</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.title}</td>
              <td>{a.message}</td>
              <td>{a.start}</td>
              <td>{a.end}</td>
              <td>
                <span className={`status-tag ${a.status.toLowerCase()}`}>
                  {a.status}
                </span>
              </td>
              <td>
                <button className="icon-btn">✏️</button>
                <button className="icon-btn delete">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Announcement;

