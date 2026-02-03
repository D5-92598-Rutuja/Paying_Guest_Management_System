import React, { useState, useEffect } from "react";
import "./Announcements.css";
import {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../../services/announcemetService";
import { toast } from 'react-toastify';


const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [type, setType] = useState("NOTICE"); // NEW

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = () => {
    getAnnouncements()
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.log(err));
  };

  // ADD / EDIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      message,
      status,
      postedFor: "ALL",
      type, 
      startDate,
      endDate,
    };

    if (editingId) {
      updateAnnouncement(editingId, data)
        .then(() => {
          toast.success("Announcement Updated Successfully");
          resetForm();
          loadAnnouncements();
        })
        .catch((err) => console.log(err));
    } else {
      addAnnouncement(data)
        .then(() => {
          toast.success("Announcement Added Successfully");
          resetForm();
          loadAnnouncements();
        })
        .catch((err) => console.log(err));
    }
  };

  // EDIT
  const handleEdit = (a) => {
    setEditingId(a.id);
    setTitle(a.title);
    setMessage(a.message);
    setStartDate(a.startDate);
    setEndDate(a.endDate);
    setStatus(a.status);
    setType(a.type); 
  };

  // DELETE
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?"))
      return;

    deleteAnnouncement(id)
      .then(() => {
        toast.success("Announcement Deleted Successfully");
        loadAnnouncements();
      })
      .catch((err) => console.log(err));
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setMessage("");
    setStartDate("");
    setEndDate("");
    setStatus("ACTIVE");
    setType("NOTICE"); 
  };

  return (
    <div className="announcement-container">
      <h2>Announcements</h2>

      {/* FORM */}
      <form className="create-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit Announcement" : "Create Announcement"}</h3>

        <label>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Message *</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <div className="date-fields">
          <div>
            <label>Start Date *</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label>End Date *</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* TYPE INPUT */}
        <label>Announcement Type *</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="MAINTENANCE">Maintenance</option>
          <option value="EVENT">Event</option>
          <option value="NOTICE">Notice</option>
        </select>

        <label>Status *</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        <div className="btn-row">
          <button type="submit" className="post-btn">
            {editingId ? "Update Announcement" : "Post Announcement"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <table className="announcement-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            {/* <th>Message</th> */}
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {announcements.length === 0 ? (
            <tr>
              <td colSpan="8" className="empty">
                No announcements found
              </td>
            </tr>
          ) : (
            announcements.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.title}</td>
                {/* <td>{a.message}</td> */}
                <td>{a.type}</td>
                <td>{a.startDate}</td>
                <td>{a.endDate}</td>
                <td>
                  <span className={`status-tag ${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(a)}
                  >
                  Edit
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    onClick={() => handleDelete(a.id)}
                  >
                   Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Announcement;