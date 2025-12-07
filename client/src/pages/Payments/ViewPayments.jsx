// src/components/ViewPayments.jsx
import React, { useState, useMemo } from "react";

const initialPayments = [
  {
    id: "PAY001",
    user: "John Doe",
    amount: 15000,
    date: "2025-11-01", // Updated to current month
    type: "UPI",
    txnId: "TXN123456789",
    status: "Completed",
  },
  {
    id: "PAY002",
    user: "Jane Smith",
    amount: 10000,
    date: "2025-11-02",
    type: "Bank Transfer",
    txnId: "TXN987654321",
    status: "Completed",
  },
  {
    id: "PAY003",
    user: "Mike Johnson",
    amount: 8000,
    date: "2025-10-28",
    type: "Cash",
    txnId: "CASH001",
    status: "Completed",
  },
  {
    id: "PAY004",
    user: "Sarah Wilson",
    amount: 15000,
    date: "2025-11-03",
    type: "Credit Card",
    txnId: "TXN456789123",
    status: "Pending",
  },
  {
    id: "PAY005",
    user: "David Brown",
    amount: 10000,
    date: "2025-11-01",
    type: "UPI",
    txnId: "TXN789123456",
    status: "Completed",
  },
];

function ViewPayments() {
  const [search, setSearch] = useState("");
  const [paymentType, setPaymentType] = useState("ALL");
  const [dateRange, setDateRange] = useState("ALL"); // Default to ALL

  const filteredPayments = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return initialPayments.filter((p) => {
      const matchesSearch =
        !search ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.user.toLowerCase().includes(search.toLowerCase()) ||
        p.txnId.toLowerCase().includes(search.toLowerCase());

      const matchesType = paymentType === "ALL" || p.type === paymentType;

      const paymentDate = new Date(p.date);
      let matchesDate = true;

      switch (dateRange) {
        case "CURRENT_MONTH":
          matchesDate =
            paymentDate.getMonth() === currentMonth &&
            paymentDate.getFullYear() === currentYear;
          break;
        case "LAST_MONTH":
          const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
          const yearForLastMonth = currentMonth === 0 ? currentYear - 1 : currentYear;
          matchesDate =
            paymentDate.getMonth() === lastMonth &&
            paymentDate.getFullYear() === yearForLastMonth;
          break;
        case "ALL":
        default:
          matchesDate = true;
          break;
      }

      return matchesSearch && matchesType && matchesDate;
    });
  }, [search, paymentType, dateRange]);

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalTransactions = filteredPayments.length;
  const completedPayments = filteredPayments.filter((p) => p.status === "Completed").length;

  const handleExport = () => {
    alert("Export functionality to be implemented.");
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="mb-1">View Payments</h4>
          <small className="text-muted">Track and manage payment records</small>
        </div>
        <button className="btn btn-outline-primary" onClick={handleExport}>
          Export Report
        </button>
      </div>

      {/* Summary cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="card-subtitle mb-1 text-muted">Total Amount (Filtered)</h6>
              <h4 className="card-title mb-0">₹{totalAmount.toLocaleString("en-IN")}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="card-subtitle mb-1 text-muted">Total Transactions</h6>
              <h4 className="card-title mb-0">{totalTransactions}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="card-subtitle mb-1 text-muted">Completed Payments</h6>
              <h4 className="card-title mb-0">{completedPayments}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex flex-wrap gap-3 align-items-end">
            <div className="me-auto">
              <h6 className="mb-2">Filters</h6>
            </div>
            <div className="flex-grow-1" style={{ minWidth: 220 }}>
              <label className="form-label mb-1">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by ID, user, or transaction ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ minWidth: 180 }}>
              <label className="form-label mb-1">Payment Type</label>
              <select
                className="form-select"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <option value="ALL">All Types</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>
            <div style={{ minWidth: 180 }}>
              <label className="form-label mb-1">Date Range</label>
              <select
                className="form-select"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="ALL">All Time</option>
                <option value="CURRENT_MONTH">Current Month</option>
                <option value="LAST_MONTH">Last Month</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white">
          <strong>Payment Records ({filteredPayments.length})</strong>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Payment ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th>Payment Type</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-muted">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.user}</td>
                    <td>₹{p.amount.toLocaleString("en-IN")}</td>
                    <td>{new Date(p.date).toLocaleDateString("en-IN")}</td>
                    <td>{p.type}</td>
                    <td>{p.txnId}</td>
                    <td>
                      <span
                        className={
                          "badge " +
                          (p.status === "Completed"
                            ? "bg-success"
                            : p.status === "Pending"
                            ? "bg-danger text-white"
                            : "bg-danger ")
                        }
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-secondary">View Receipt</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewPayments;
