import React, { useState } from "react";

function ReminderModal({ show, record, onConfirm, onClose }) {
  const [reminderMessage, setReminderMessage] = useState(
    `Please pay your outstanding rent of ₹${record?.outstanding.toLocaleString("en-IN")} for ${record?.month}.`
  );

  if (!show || !record) return null;

  return (
    <div
      className="modal fade"
      id="reminderModal"
      tabIndex="-1"
      style={{ display: show ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-warning text-dark border-bottom">
            <h5 className="modal-title">
              <i className="bi bi-exclamation-circle me-2"></i>Send Payment Reminder
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
            <div className="alert alert-info mb-3" role="alert">
              Sending reminder to <strong>{record.user}</strong> for payment due on{" "}
              <strong>{new Date(record.dueDate).toLocaleDateString("en-IN")}</strong>
            </div>

            <div className="mb-3">
              <label className="form-label">Amount Outstanding</label>
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <input
                  type="text"
                  className="form-control fw-bold text-danger"
                  value={record.outstanding.toLocaleString("en-IN")}
                  disabled
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows="3"
                value={reminderMessage}
                onChange={(e) => setReminderMessage(e.target.value)}
              ></textarea>
              <small className="text-muted">Customize reminder message if needed</small>
            </div>

            <div className="alert alert-light border mb-0">
              <small className="text-muted">
                <i className="bi bi-info-circle me-2"></i>
                Reminder will be sent via email and SMS
              </small>
            </div>
          </div>
          <div className="modal-footer border-top bg-light">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-warning text-dark fw-bold"
              onClick={onConfirm}
            >
              <i className="bi bi-send me-2"></i>Send Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReminderModal;
