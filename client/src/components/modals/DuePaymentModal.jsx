import React from "react";

function DuePaymentModal({ show, record, onClose }) {
  if (!show || !record) return null;

  const progressPercent = Math.round((record.paidAmount / record.dueAmount) * 100);

  return (
    <div
      className="modal fade"
      id="detailModal"
      tabIndex="-1"
      style={{ display: show ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-light border-bottom">
            <h5 className="modal-title">
              Payment Details - <strong>{record.id}</strong>
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
            {/* User Info */}
            <div className="row mb-4">
              <div className="col-md-6">
                <p className="text-muted mb-1">User</p>
                <h6 className="fw-bold">{record.user}</h6>
              </div>
              <div className="col-md-6">
                <p className="text-muted mb-1">Room</p>
                <h6 className="fw-bold">{record.room}</h6>
              </div>
            </div>

            {/* Amount Breakdown */}
            <div className="card border-light mb-4">
              <div className="card-body">
                <h6 className="mb-3">Payment Breakdown</h6>
                <div className="row text-center">
                  <div className="col-md-4">
                    <p className="text-muted small mb-1">Due Amount</p>
                    <h5 className="text-primary">
                      ₹{record.dueAmount.toLocaleString("en-IN")}
                    </h5>
                  </div>
                  <div className="col-md-4">
                    <p className="text-muted small mb-1">Paid Amount</p>
                    <h5 className="text-success">
                      ₹{record.paidAmount.toLocaleString("en-IN")}
                    </h5>
                  </div>
                  <div className="col-md-4">
                    <p className="text-muted small mb-1">Outstanding</p>
                    <h5 className="text-danger">
                      ₹{record.outstanding.toLocaleString("en-IN")}
                    </h5>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-muted">Payment Progress</small>
                    <small className="fw-bold">{progressPercent}%</small>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-success"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="row mb-3">
              <div className="col-md-6">
                <p className="text-muted mb-1">Due Date</p>
                <h6 className="fw-bold">
                  {new Date(record.dueDate).toLocaleDateString("en-IN")}
                </h6>
              </div>
              <div className="col-md-6">
                <p className="text-muted mb-1">Month & Year</p>
                <h6 className="fw-bold">{record.month}</h6>
              </div>
            </div>

            {/* Status Badge */}
            <div>
              <p className="text-muted mb-1">Status</p>
              <span
                className={`badge rounded-pill ${
                  record.status === "Overdue"
                    ? "bg-danger"
                    : record.status === "Partial"
                    ? "bg-warning"
                    : record.status === "Paid"
                    ? "bg-success"
                    : "bg-info"
                }`}
              >
                {record.status}
              </span>
            </div>
          </div>
          <div className="modal-footer border-top bg-light">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Edit Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DuePaymentModal;
