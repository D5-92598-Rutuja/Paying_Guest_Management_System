// src/components/DuePayments.jsx
import React, { useState, useMemo } from "react";
import DuePaymentModal from "../../components/modals/DuePaymentModal";
import ReminderModal from "../../components/modals/ReminderModal";

const initialDuePayments = [
  {
    id: "DUE001",
    user: "John Doe",
    room: "S1-101",
    month: "November 2025",
    dueAmount: 15000,
    paidAmount: 0,
    outstanding: 15000,
    dueDate: "2025-11-05",
    status: "Overdue", // Red
  },
  {
    id: "DUE002",
    user: "Jane Smith",
    room: "D2-201",
    month: "November 2025",
    dueAmount: 10000,
    paidAmount: 5000,
    outstanding: 5000,
    dueDate: "2025-11-05",
    status: "Partial", // Orange
  },
  {
    id: "DUE003",
    user: "Mike Johnson",
    room: "T1-103",
    month: "November 2025",
    dueAmount: 8000,
    paidAmount: 8000,
    outstanding: 0,
    dueDate: "2025-11-05",
    status: "Paid", // Green
  },
  {
    id: "DUE004",
    user: "Sarah Wilson",
    room: "S2-205",
    month: "November 2025",
    dueAmount: 15000,
    paidAmount: 0,
    outstanding: 15000,
    dueDate: "2025-11-05",
    status: "Pending", // Yellow
  },
];

// Utility function: Get status color and styling
const getStatusConfig = (status) => {
  const config = {
    Overdue: {
      badge: "bg-danger",
      text: "text-light",
      icon: "⚠️",
      color: "#dc3545",
    },
    Partial: {
      badge: "bg-warning",
      text: "text-dark",
      icon: "⏳",
      color: "#ffc107",
    },
    Paid: {
      badge: "bg-success",
      text: "text-light",
      icon: "✓",
      color: "#28a745",
    },
    Pending: {
      badge: "bg-danger",
      text: "text-light",
      icon: "◐",
      color: "#f89a17ff",
    },
  };
  return config[status] || config.Pending;
};

// Modular: Summary Card Component
function SummaryCard({ title, value, color, icon }) {
  return (
    <div className="col-md-3 col-sm-6 mb-1">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h6 className="card-subtitle mb-2 text-muted">{title}</h6>
              <h4 className="card-title mb-0" style={{ color }}>
                {value}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modular: Filter Section Component
function FilterSection({ search, setSearch, status, setStatus, month, setMonth, year, setYear }) {
  return (
    <div className="card border-0 shadow-sm mb-1">
      <div className="card-body">
        {/* <h6 className="mb-3">Filters</h6> */}
        <div className="row g-3">
          {/* Search */}
          <div className="col-md-4">
            <label className="form-label small text-muted mb-1">Search</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by user, room, or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="col-md-3">
            <label className="form-label small text-muted mb-1">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Overdue">Overdue</option>
              <option value="Partial">Partial</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Month */}
          <div className="col-md-2">
            <label className="form-label small text-muted mb-1">Month</label>
            <select
              className="form-select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="October">October</option>
              <option value="September">September</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          {/* Year */}
          <div className="col-md-2">
            <label className="form-label small text-muted mb-1">Year</label>
            <select
              className="form-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modular: Action Buttons Component
function ActionButtons({ record, onViewDetails, onSendReminder }) {
  return (
    <div className="btn-group btn-group-sm" role="group">
      {/* <button
        className="btn btn-primary m-3 rounded-2"
        onClick={() => onViewDetails(record)}
        title="View payment details"
      >
        View
      </button> */}
      {record.status !== "Paid" && (
        <button
          className="btn btn-warning m-3 rounded-2"
          onClick={() => onSendReminder(record)}
          title="Send payment reminder"
        >
          Reminder
        </button>
      )}
    </div>
  );
}

// Main Component
function DuePayments() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [month, setMonth] = useState("November");
  const [year, setYear] = useState("2025");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);

  // Filter logic
  const filteredPayments = useMemo(() => {
    return initialDuePayments.filter((p) => {
      const matchesSearch =
        !search ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.user.toLowerCase().includes(search.toLowerCase()) ||
        p.room.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "ALL" || p.status === status;

      const matchesMonth = p.month.includes(month) && p.month.includes(year);

      return matchesSearch && matchesStatus && matchesMonth;
    });
  }, [search, status, month, year]);

  // Summary calculations
  const totalOutstanding = filteredPayments.reduce((sum, p) => sum + p.outstanding, 0);
  const overdueCount = filteredPayments.filter((p) => p.status === "Overdue").length;
  const totalRecords = filteredPayments.length;
  const paidThisMonth = filteredPayments.filter((p) => p.status === "Paid").length;

  // Modal handlers
  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  const handleSendReminder = (record) => {
    setSelectedRecord(record);
    setShowReminderModal(true);
  };

  const handleConfirmReminder = () => {
    alert(`Reminder sent to ${selectedRecord.user} for ₹${selectedRecord.outstanding}`);
    setShowReminderModal(false);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-2">
        <h4 className="mb-1">
          {/* <i className="bi bi-exclamation-triangle text-warning me-2"></i> */}
          Due Payments
        </h4>
        <small className="text-muted">Track and manage pending payments</small>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-1">
        <SummaryCard
          title="Total Outstanding"
          value={`₹${totalOutstanding.toLocaleString("en-IN")}`}
          color="#dc3545"
          icon="💰"
        />
        <SummaryCard
          title="Overdue Payments"
          value={overdueCount}
          color="#ff6b6b"
          icon="⚠️"
        />
        <SummaryCard
          title="Total Records"
          value={totalRecords}
          color="#4a90e2"
          icon="📋"
        />
        <SummaryCard
          title="Paid This Month"
          value={paidThisMonth}
          color="#28a745"
          icon="✓"
        />
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <strong>Due Payments ({filteredPayments.length})</strong>
          <small className="text-muted">
            {filteredPayments.length === 0 ? "No records" : "Showing all records"}
          </small>
        </div>
        {/* Filters */}
        <FilterSection
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
        />
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Due ID</th>
                <th>User</th>
                <th>Room</th>
                <th>Month & Year</th>
                <th className="text-end">Due Amount</th>
                <th className="text-end">Paid Amount</th>
                <th className="text-end">Outstanding</th>
                <th>Due Date</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-4 text-muted">
                    <i className="bi bi-inbox"></i> No due payment records found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => {
                  const statusConfig = getStatusConfig(p.status);
                  return (
                    <tr key={p.id} className="border-bottom">
                      <td className="fw-bold">{p.id}</td>
                      <td>{p.user}</td>
                      <td>
                        <span className="badge bg-light text-dark">{p.room}</span>
                      </td>
                      <td>{p.month}</td>
                      <td className="text-end">₹{p.dueAmount.toLocaleString("en-IN")}</td>
                      <td className="text-end text-success fw-bold">
                        ₹{p.paidAmount.toLocaleString("en-IN")}
                      </td>
                      <td className="text-end">
                        <span
                          className="fw-bold"
                          style={{
                            color:
                              p.outstanding > 0
                                ? statusConfig.color
                                : "#28a745",
                          }}
                        >
                          ₹{p.outstanding.toLocaleString("en-IN")}
                        </span>
                      </td>
                      <td>{new Date(p.dueDate).toLocaleDateString("en-IN")}</td>
                      <td>
                        <span className={`badge p-2 rounded-pill ${statusConfig.badge}`}>
                           {p.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <ActionButtons
                          record={p}
                          onViewDetails={handleViewDetails}
                          onSendReminder={handleSendReminder}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <DuePaymentModal
        show={showDetailModal}
        record={selectedRecord}
        onClose={() => setShowDetailModal(false)}
      />

      {/* Reminder Modal */}
      <ReminderModal
        show={showReminderModal}
        record={selectedRecord}
        onConfirm={handleConfirmReminder}
        onClose={() => setShowReminderModal(false)}
      />
    </div>
  );
}

export default DuePayments;
