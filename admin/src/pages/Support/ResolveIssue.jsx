import React, { useEffect, useState } from "react";
import axios from "../../service/axiosInstance";
import './ResolveIssue.css';

const API_URL = "/admin/tickets";

export default function ResolveIssues() {
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [resolutionNote, setResolutionNote] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(API_URL);
      setTickets(res.data || []);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
  };

  const updateStatus = async (status) => {
    if (!selected) return;

    if (status !== "IN_PROGRESS" && !resolutionNote.trim()) {
      alert("Resolution note is required");
      return;
    }

    try {
      await axios.put(`${API_URL}/${selected.id}/status`, {
        status,
        resolutionNotes: resolutionNote
      });

      // Update frontend state
      const updatedTickets = tickets.map(t =>
        t.id === selected.id
          ? { ...t, ticketStatus: status, resolutionNotes: resolutionNote }
          : t
      );
      setTickets(updatedTickets);

      const updated = updatedTickets.find(t => t.id === selected.id);
      setSelected(updated);

      if (status === "CLOSED") setResolutionNote("");

    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case "OPEN": return "Open";
      case "IN_PROGRESS": return "In Progress";
      case "RESOLVED": return "Resolved";
      case "CLOSED": return "Closed";
      default: return status;
    }
  };

  return (
    <div className="resolve-issues-container">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="page-title">Resolve Issues</h1>
          </div>
        </div>

        <div className="row g-4">
          {/* Ticket List */}
          <div className="col-lg-5">
            <div className="ticket-list-panel">
              <div className="panel-header">
                <h2>Tickets ({tickets.length})</h2>
              </div>

              <div className="tickets-scroll">
                {tickets.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h3>No tickets</h3>
                    <p>All tickets resolved</p>
                  </div>
                ) : (
                  tickets.map(t => (
                    <div
                      key={t.id}
                      className={`ticket-item ${selected?.id === t.id ? 'selected' : ''}`}
                      onClick={() => {
                        setSelected(t);
                        setResolutionNote(t.resolutionNotes || "");
                      }}
                    >
                      <div className="ticket-title">{t.subject}</div>
                      <div className={`status-badge ${t.ticketStatus?.toLowerCase().replace("_","-")}`}>
                        {getStatusLabel(t.ticketStatus)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="col-lg-7">
            {selected ? (
              <div className="ticket-detail-panel">
                <div className="panel-header">
                  <h2>{selected.subject}</h2>
                  <div className={`status-badge-large ${selected.ticketStatus?.toLowerCase().replace("_","-")}`}>
                    {getStatusLabel(selected.ticketStatus)}
                  </div>
                </div>

                <div className="detail-section">
                  <label>Description</label>
                  <div className="description-box">
                    {selected.description}
                  </div>
                </div>

                <div className="detail-section">
                  <label>Resolution Notes</label>
                  <textarea
                    className="resolution-textarea"
                    rows="6"
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    placeholder="Enter resolution notes..."
                  />
                </div>

                <div className="action-buttons">
                  <button
                    className="status-btn progress-btn"
                    disabled={selected.ticketStatus !== "OPEN"}
                    onClick={() => updateStatus("IN_PROGRESS")}
                  >
                    In Progress
                  </button>

                  <button
                    className="status-btn resolve-btn"
                    disabled={selected.ticketStatus !== "IN_PROGRESS"}
                    onClick={() => updateStatus("RESOLVED")}
                  >
                    Resolve
                  </button>

                  <button
                    className="status-btn close-btn"
                    disabled={selected.ticketStatus !== "RESOLVED"}
                    onClick={() => updateStatus("CLOSED")}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-selection-panel">
                <div className="no-selection-icon">📋</div>
                <h3>Select a ticket</h3>
                <p>Click any ticket to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
