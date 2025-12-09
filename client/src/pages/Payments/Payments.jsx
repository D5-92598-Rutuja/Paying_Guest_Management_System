import React, { useState, useMemo } from "react";
import {
  AlertCircle,
  Calendar,
  Clock,
  CreditCard,
  Download,
  Eye,
  Filter,
  History,
  MapPin,
  Search,
  CheckCircle,
  AlertTriangle,
  X,
} from "lucide-react";
import { toast } from 'react-toastify';

// Mock payment data
const initialPayments = [
  {
    id: "PAY001",
    date: "2024-11-15",
    description: "Monthly Rent - November 2024",
    amount: 15000,
    method: "UPI",
    status: "Completed",
    transactionId: "TXN123456789",
    room: "S2-205",
  },
  {
    id: "PAY002",
    date: "2024-10-15",
    description: "Monthly Rent - October 2024",
    amount: 15000,
    method: "Card",
    status: "Completed",
    transactionId: "TXN987654321",
    room: "S2-205",
  },
  {
    id: "PAY003",
    date: "2024-09-20",
    description: "Security Deposit",
    amount: 10000,
    method: "Bank Transfer",
    status: "Completed",
    transactionId: "TXN456789123",
    room: "S2-205",
  },
  {
    id: "PAY004",
    date: "2024-09-15",
    description: "Monthly Rent - September 2024",
    amount: 15000,
    method: "UPI",
    status: "Completed",
    transactionId: "TXN789123456",
    room: "S2-205",
  },
];

function Payments() {
  const [paymentHistory, setPaymentHistory] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const nextPaymentDue = {
    amount: 15000,
    dueDate: "January 15, 2025",
    description: "Monthly Rent - January 2025",
    room: "S2-205",
  };

  const filteredPayments = useMemo(() => {
    return paymentHistory.filter((payment) => {
      const matchesSearch =
        !search ||
        payment.id.toLowerCase().includes(search.toLowerCase()) ||
        payment.description.toLowerCase().includes(search.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "All" || payment.status === statusFilter;
      const matchesMethod = methodFilter === "All" || payment.method === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [search, statusFilter, methodFilter, paymentHistory]);

  const stats = useMemo(() => {
    return {
      totalPaid: paymentHistory
        .filter((p) => p.status === "Completed")
        .reduce((sum, p) => sum + p.amount, 0),
      totalTransactions: paymentHistory.length,
      completedPayments: paymentHistory.filter((p) => p.status === "Completed").length,
    };
  }, [paymentHistory]);

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value.replace(/\s+/g, "").replace(/(\d{4})/g, "$1 ").trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    } else if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setCardDetails({
      ...cardDetails,
      [name]: formattedValue,
    });
  };

  const validateCardDetails = () => {
    if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, "").length !== 16) {
      toast.error("Please enter a valid 16-digit card number");
      return false;
    }
    if (!cardDetails.expiryDate || cardDetails.expiryDate.length !== 5) {
      toast.error("Please enter a valid expiry date (MM/YY)");
      return false;
    }
    if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
      toast.error("Please enter a valid 3-digit CVV");
      return false;
    }
    if (!cardDetails.name.trim()) {
      toast.error("Please enter cardholder name");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateCardDetails()) return;

    setIsProcessing(true);
    try {
      // Simulate Stripe payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newPayment = {
        id: `PAY${(Math.max(...paymentHistory.map((p) => parseInt(p.id.slice(3)))) + 1)
          .toString()
          .padStart(3, "0")}`,
        date: new Date().toLocaleDateString("en-IN"),
        description: nextPaymentDue.description,
        amount: nextPaymentDue.amount,
        method: "Card (Stripe)",
        status: "Completed",
        transactionId: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        room: nextPaymentDue.room,
      };

      setPaymentHistory([newPayment, ...paymentHistory]);
      setShowPaymentModal(false);
      setCardDetails({ cardNumber: "", expiryDate: "", cvv: "", name: "" });
      toast.success("Payment processed successfully!");
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadReceipt = (payment) => {
    try {
      const receiptContent = `
PAYMENT RECEIPT
=====================================
Receipt ID: ${payment.id}
Date: ${payment.date}
Amount: ₹${payment.amount.toLocaleString("en-IN")}
Method: ${payment.method}
Status: ${payment.status}
Transaction ID: ${payment.transactionId}
Description: ${payment.description}
Room: ${payment.room}
=====================================
Thank you for your payment!
      `;

      const element = document.createElement("a");
      element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(receiptContent));
      element.setAttribute("download", `Receipt_${payment.id}.txt`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success("Receipt downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download receipt");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return { badge: "badge bg-success", icon: <CheckCircle size={14} /> };
      case "Pending":
        return { badge: "badge bg-warning text-dark", icon: <Clock size={14} /> };
      case "Failed":
        return { badge: "badge bg-danger", icon: <AlertTriangle size={14} /> };
      default:
        return { badge: "badge bg-secondary", icon: <Eye size={14} /> };
    }
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    setCardDetails({ cardNumber: "", expiryDate: "", cvv: "", name: "" });
  };

  return (
    <div style={{ minHeight: "100vh", overflowY: "auto", padding: "50px" }}>
      {/* Header */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#1a1a1a", marginBottom: "8px" }}>
              Payments
            </h1>
            <p className="text-muted" style={{ marginBottom: 0 }}>
              Manage your rent payments and view transaction history
            </p>
          </div>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2" title="Download receipt for latest payment">
            <Download size={16} />
            Download Receipt
          </button>
        </div>

        {/* Next Payment Due Card */}
        <div className="card border-0 shadow-sm mb-4" style={{ backgroundColor: "#fff", borderLeft: "4px solid #fd7e14" }}>
          <div className="card-body">
            <h5 className="card-title fw-bold mb-3" style={{ color: "#1a1a1a" }}>
              Next Payment Due
            </h5>
            <h2 className="fw-bold mb-2" style={{ fontSize: "2.5rem", color: "#fd7e14" }}>
              ₹{nextPaymentDue.amount.toLocaleString("en-IN")}
            </h2>
            <p className="text-muted mb-2 d-flex align-items-center gap-2">
              <Calendar size={16} />
              Due: {nextPaymentDue.dueDate}
            </p>
            <p className="text-muted mb-3 d-flex align-items-center gap-2">
              <MapPin size={16} />
              {nextPaymentDue.description}
            </p>
            <button
              type="button"
              className="btn btn-primary btn-lg w-100"
              onClick={() => setShowPaymentModal(true)}
              aria-label="Open payment modal"
            >
              <CreditCard size={18} className="me-2" />
              Make Payment
            </button>
          </div>
        </div>

        {/* Alert Message */}
        <div
          className="alert d-flex align-items-start gap-2"
          role="alert"
          style={{
            backgroundColor: "#ffe0e0",
            color: "#c41c31",
            border: "1px solid #ffb3b3",
          }}
        >
          <AlertCircle size={20} style={{ marginTop: "2px", flexShrink: 0 }} />
          <div>
            <strong>Payment Reminder:</strong>
            <p className="mb-0" style={{ fontSize: "0.95rem" }}>
              Your payment of ₹{nextPaymentDue.amount.toLocaleString("en-IN")} is due on {nextPaymentDue.dueDate}. Please make
              the payment to avoid late fees.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-4">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#fff" }}>
            <div className="card-body">
              <p className="text-muted small fw-semibold mb-2">Total Amount Paid</p>
              <h3 className="fw-bold mb-0" style={{ color: "#198754" }}>
                ₹{stats.totalPaid.toLocaleString("en-IN")}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#fff" }}>
            <div className="card-body">
              <p className="text-muted small fw-semibold mb-2">Total Transactions</p>
              <h3 className="fw-bold mb-0" style={{ color: "#0d6efd" }}>
                {stats.totalTransactions}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#fff" }}>
            <div className="card-body">
              <p className="text-muted small fw-semibold mb-2">Completed Payments</p>
              <h3 className="fw-bold mb-0" style={{ color: "#198754" }}>
                {stats.completedPayments}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4" style={{ backgroundColor: "#fff" }}>
        <div className="card-body">
          <h5 className="card-title mb-4 d-flex align-items-center gap-2" style={{ fontSize: "1.1rem", fontWeight: "600" }}>
            <Filter size={18} />
            Search & Filters
          </h5>
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold small" style={{ color: "#495057" }}>
                Search
              </label>
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#fff", border: "1px solid #dee2e6" }}>
                  <Search size={16} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  style={{ border: "1px solid #dee2e6", borderLeft: "none" }}
                  placeholder="Payment ID, description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search payments"
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold small" style={{ color: "#495057" }}>
                Status
              </label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by status"
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold small" style={{ color: "#495057" }}>
                Payment Method
              </label>
              <select
                className="form-select"
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                aria-label="Filter by payment method"
              >
                <option value="All">All Methods</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Card (Stripe)">Card (Stripe)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="card border-0 shadow-sm" style={{ backgroundColor: "#fff" }}>
        <div
          className="card-header"
          style={{
            backgroundImage: "linear-gradient(to right, #f8f9fa, #e9ecef)",
            borderBottom: "1px solid #dee2e6",
          }}
        >
          <h5 className="mb-0 fw-bold d-flex align-items-center gap-2" style={{ color: "#1a1a1a" }}>
            <History size={18} />
            Payment History ({filteredPayments.length})
          </h5>
        </div>

        <div className="table-responsive">
          <table className="table mb-0 align-middle" role="grid">
            <thead style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
              <tr>
                <th style={{ color: "#495057", fontWeight: "600", padding: "12px" }}>Date</th>
                <th style={{ color: "#495057", fontWeight: "600", padding: "12px" }}>Description</th>
                <th style={{ color: "#495057", fontWeight: "600", padding: "12px" }}>Method</th>
                <th style={{ color: "#495057", fontWeight: "600", padding: "12px" }}>Amount</th>
                <th style={{ color: "#495057", fontWeight: "600", padding: "12px" }}>Status</th>
                <th style={{ color: "#495057", fontWeight: "600", padding: "12px" }}>Transaction ID</th>
                <th style={{ color: "#495057", fontWeight: "600", padding: "12px", textAlign: "center" }}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: "40px", textAlign: "center", color: "#6c757d" }}>
                    <Eye size={48} style={{ opacity: 0.5, marginBottom: "12px" }} />
                    <p className="mb-0">No payment records found</p>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td style={{ padding: "12px" }}>
                      <strong>{payment.date}</strong>
                    </td>
                    <td style={{ padding: "12px" }}>{payment.description}</td>
                    <td style={{ padding: "12px" }}>
                      <span className="badge bg-info text-white">{payment.method}</span>
                    </td>
                    <td style={{ padding: "12px", fontWeight: "600" }}>
                      ₹{payment.amount.toLocaleString("en-IN")}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span className={getStatusColor(payment.status).badge}>
                        {getStatusColor(payment.status).icon}
                        <span className="ms-1">{payment.status}</span>
                      </span>
                    </td>
                    <td style={{ padding: "12px", fontSize: "0.875rem", color: "#6c757d" }}>
                      {payment.transactionId}
                    </td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleDownloadReceipt(payment)}
                        title="Download payment receipt"
                        aria-label={`Download receipt for payment ${payment.id}`}
                      >
                        <Download size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal - Fixed Layout */}
      {showPaymentModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
            padding: "20px",
            overflowY: "auto",
          }}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-modal-title"
        >
          <div
            className="card border-0 shadow-lg"
            style={{
              width: "100%",
              maxWidth: "450px",
              backgroundColor: "#fff",
              maxHeight: "90vh",
              overflowY: "auto",
              margin: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="card-header d-flex justify-content-between align-items-center"
              style={{
                backgroundImage: "linear-gradient(to right, #0d6efd, #0b5ed7)",
                borderBottom: "1px solid #dee2e6",
                padding: "16px 20px",
                position: "sticky",
                top: 0,
                zIndex: 1051,
              }}
            >
              <h5 className="mb-0 fw-bold text-white" id="payment-modal-title">
                Make Payment
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={closeModal}
                aria-label="Close payment modal"
                style={{ padding: "4px", cursor: "pointer" }}
              ></button>
            </div>

            {/* Modal Body */}
            <div className="card-body p-4">
              {/* Payment Amount */}
              <div className="mb-4">
                <p className="text-muted small mb-1">Payment Amount</p>
                <h4 className="fw-bold" style={{ color: "#0d6efd" }}>
                  ₹{nextPaymentDue.amount.toLocaleString("en-IN")}
                </h4>
                <p className="small text-muted mb-0">{nextPaymentDue.description}</p>
              </div>

              {/* Card Details Form */}
              <div className="mb-4">
                <label className="form-label fw-semibold small" style={{ color: "#495057" }}>
                  Cardholder Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={handleCardInputChange}
                  name="name"
                  aria-label="Cardholder name"
                  disabled={isProcessing}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold small" style={{ color: "#495057" }}>
                  Card Number
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="4532 1234 5678 9010"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInputChange}
                    name="cardNumber"
                    maxLength="19"
                    aria-label="Card number"
                    disabled={isProcessing}
                  />
                  <CreditCard size={20} style={{ position: "absolute", right: "12px", top: "10px", color: "#6c757d", pointerEvents: "none" }} />
                </div>
                <small className="text-muted d-block mt-1">Powered by Stripe</small>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <label className="form-label fw-semibold small" style={{ color: "#495057" }}>
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={handleCardInputChange}
                    name="expiryDate"
                    aria-label="Expiry date"
                    disabled={isProcessing}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fw-semibold small" style={{ color: "#495057" }}>
                    CVV
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="•••"
                    value={cardDetails.cvv}
                    onChange={handleCardInputChange}
                    name="cvv"
                    aria-label="CVV code"
                    disabled={isProcessing}
                  />
                </div>
              </div>

              {/* Security Info */}
              <div
                style={{
                  backgroundColor: "#f0f8ff",
                  border: "1px solid #b0d4ff",
                  padding: "12px",
                  borderRadius: "4px",
                  marginBottom: "16px",
                  fontSize: "0.85rem",
                  color: "#0d6efd",
                }}
              >
                <strong>🔒 Secure Payment:</strong> Your payment information is encrypted and processed securely by Stripe.
              </div>

              {/* Action Buttons */}
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handlePayment}
                  disabled={isProcessing}
                  aria-label="Complete payment"
                >
                  {isProcessing ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} className="me-2" />
                      Pay ₹{nextPaymentDue.amount.toLocaleString("en-IN")}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={closeModal}
                  disabled={isProcessing}
                  aria-label="Cancel payment"
                >
                  Cancel
                </button>
              </div>

              {/* Stripe Info */}
              <p className="text-center text-muted small mt-3 mb-0">
                Secured by Stripe
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;