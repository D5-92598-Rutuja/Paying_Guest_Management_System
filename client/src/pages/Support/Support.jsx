import React, { useState, useMemo } from "react";
import {
  AlertCircle,
  Phone,
  Clock,
  Filter,
  MessageSquare,
  Plus,
  Search,
  CheckCircle,
  AlertTriangle,
  Eye,
  MapPin,
  Mail,
  Building2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Zap,
} from "lucide-react";
import { toast } from 'react-toastify';

// Mock support tickets data
const initialTickets = [
  {
    id: "TKT001",
    subject: "WiFi connectivity issue in Room A-101",
    description: "WiFi connection is very slow and keeps disconnecting in my room. This is affecting my work from home setup.",
    status: "In Progress",
    priority: "High",
    createdDate: "Dec 5, 10:15 AM",
    updatedDate: "Dec 8, 10:15 AM",
    assignedTo: "IT Support Team",
    latestUpdate: "Our technician will visit your room today between 2-4 PM to check the WiFi router.",
    updateAuthor: "IT Support",
  },
  {
    id: "TKT002",
    subject: "Request for additional study table",
    description: "I need an additional study table as I have a lot of books and study materials.",
    status: "Resolved",
    priority: "Medium",
    createdDate: "Nov 28, 2:30 PM",
    updatedDate: "Nov 28, 2:30 PM",
    assignedTo: "Facilities Team",
    latestUpdate: "Additional study table has been installed in your room. Please check and confirm.",
    updateAuthor: "Facilities Team",
  },
  {
    id: "TKT003",
    subject: "Laundry machine not working properly",
    description: "The washing machine on 2nd floor is not spinning properly and leaves clothes quite wet.",
    status: "Open",
    priority: "Medium",
    createdDate: "Dec 5, 6:44 PM",
    updatedDate: "Dec 5, 6:44 PM",
    assignedTo: "Maintenance Team",
    latestUpdate: "Maintenance team has been notified. We will schedule a repair visit soon.",
    updateAuthor: "Maintenance Team",
  },
];

function Support() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newTicketData, setNewTicketData] = useState({
    subject: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        !search ||
        ticket.id.toLowerCase().includes(search.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
        ticket.assignedTo.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "All" || ticket.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, tickets]);

  const stats = useMemo(() => {
    return {
      totalTickets: tickets.length,
      activeTickets: tickets.filter((t) => t.status === "In Progress").length,
      resolvedTickets: tickets.filter((t) => t.status === "Resolved").length,
      openTickets: tickets.filter((t) => t.status === "Open").length,
    };
  }, [tickets]);

  const handleCreateTicket = async () => {
    if (!newTicketData.subject.trim() || !newTicketData.description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newTicket = {
        id: `TKT${(Math.max(...tickets.map((t) => parseInt(t.id.slice(3)))) + 1)
          .toString()
          .padStart(3, "0")}`,
        subject: newTicketData.subject,
        description: newTicketData.description,
        status: "Open",
        priority: "Medium",
        createdDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        updatedDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        assignedTo: "Support Team",
        latestUpdate: "Your ticket has been created and assigned to our team.",
        updateAuthor: "Admin",
      };

      setTickets([newTicket, ...tickets]);
      setShowNewTicketModal(false);
      setNewTicketData({ subject: "", description: "" });
      toast.success("Support ticket created successfully!");
    } catch (error) {
      toast.error("Failed to create ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return { badge: "badge bg-info text-white", color: "#0d6efd" };
      case "In Progress":
        return { badge: "badge bg-warning text-dark", color: "#fd7e14" };
      case "Resolved":
        return { badge: "badge bg-success text-white", color: "#198754" };
      default:
        return { badge: "badge bg-secondary", color: "#6c757d" };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "badge bg-danger";
      case "Medium":
        return "badge bg-warning text-dark";
      case "Low":
        return "badge bg-info";
      default:
        return "badge bg-secondary";
    }
  };

  const toggleTicketExpand = (ticketId) => {
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  };

  const handleCallSupport = (phone) => {
    window.location.href = `tel:${phone}`;
    toast.success("Opening phone dialer...");
  };

  const handleEmailSupport = (email) => {
    window.location.href = `mailto:${email}`;
    toast.success("Opening email client...");
  };

  return (
    <div style={{ minHeight: "100vh", overflowY: "auto", padding: "50px" }}>
      {/* Header Section */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#1a1a1a", marginBottom: "8px", letterSpacing: "-0.5px" }}>
              Customer Support
            </h1>
            <p className="text-muted" style={{ marginBottom: 0, fontSize: "1rem", lineHeight: "1.5" }}>
              Get help with any issues or requests related to your accommodation
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: "#fff" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted fw-semibold" style={{ fontSize: "0.8rem", letterSpacing: "0.3px" }}>Total Tickets</small>
                  <MessageSquare size={16} style={{ color: "#6c757d" }} />
                </div>
                <h3 className="mb-0 fw-bold" style={{ fontSize: "2rem", color: "#1a1a1a" }}>
                  {stats.totalTickets}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: "#fff", borderTop: "3px solid #fd7e14" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small style={{ color: "#fd7e14", fontWeight: "600", fontSize: "0.8rem", letterSpacing: "0.3px" }}>Active Tickets</small>
                  <Clock size={16} style={{ color: "#fd7e14" }} />
                </div>
                <h3 className="mb-0 fw-bold" style={{ fontSize: "2rem", color: "#fd7e14" }}>
                  {stats.activeTickets}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: "#fff", borderTop: "3px solid #0d6efd" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small style={{ color: "#0d6efd", fontWeight: "600", fontSize: "0.8rem", letterSpacing: "0.3px" }}>Open Tickets</small>
                  <AlertCircle size={16} style={{ color: "#0d6efd" }} />
                </div>
                <h3 className="mb-0 fw-bold" style={{ fontSize: "2rem", color: "#0d6efd" }}>
                  {stats.openTickets}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: "#fff", borderTop: "3px solid #198754" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small style={{ color: "#198754", fontWeight: "600", fontSize: "0.8rem", letterSpacing: "0.3px" }}>Resolved</small>
                  <CheckCircle size={16} style={{ color: "#198754" }} />
                </div>
                <h3 className="mb-0 fw-bold" style={{ fontSize: "2rem", color: "#198754" }}>
                  {stats.resolvedTickets}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="row g-4">
        {/* Left Column - Search, Raise Ticket & Quick Tips */}
        <div className="col-12 col-lg-4">

          {/* Raise New Ticket Card - Enhanced */}
          <div 
            className="card border-0 shadow-sm mb-4"
            style={{ 
              backgroundColor: "#fff",
              backgroundImage: "linear-gradient(135deg, rgba(13, 110, 253, 0.02) 0%, rgba(13, 110, 253, 0.05) 100%)",
              border: "1px solid rgba(13, 110, 253, 0.1)"
            }}
          >
            <div className="card-body">
              {/* Title with Icon */}
              <div className="mb-3 d-flex align-items-center gap-2">
                <div 
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#e7f1ff",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Plus size={24} style={{ color: "#0d6efd" }} />
                </div>
                <div>
                  <h5 className="mb-0 fw-bold" style={{ color: "#1a1a1a", fontSize: "1.15rem", letterSpacing: "-0.3px" }}>
                    Raise New Ticket
                  </h5>
                  <small className="text-muted" style={{ fontSize: "0.8rem" }}>Report an issue or make a request</small>
                </div>
              </div>

              {/* Main CTA Button */}
              <button
                type="button"
                className="btn w-100 d-flex align-items-center justify-content-center gap-2 mb-4 fw-semibold"
                onClick={() => setShowNewTicketModal(true)}
                aria-label="Create new support ticket"
                style={{
                  backgroundColor: "#0d6efd",
                  color: "#fff",
                  border: "none",
                  padding: "12px 16px",
                  fontSize: "0.95rem",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(13, 110, 253, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0b5ed7";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(13, 110, 253, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0d6efd";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(13, 110, 253, 0.2)";
                }}
              >
                <Plus size={20} />
                Create Support Ticket
              </button>

              {/* Quick Tips Section */}
              <div>
                <h6 className="fw-bold mb-3" style={{ color: "#1a1a1a", fontSize: "0.95rem", letterSpacing: "-0.2px" }}>
                  <Lightbulb size={16} style={{ marginRight: "6px", color: "#ffc107", verticalAlign: "text-bottom" }} />
                  Quick Tips
                </h6>
                <ul className="list-unstyled small" style={{ color: "#495057", lineHeight: "1.9" }}>
                  <li className="mb-2 d-flex gap-2" style={{ fontSize: "0.9rem" }}>
                    <span style={{ color: "#198754", fontWeight: "bold", marginTop: "-2px" }}>✓</span>
                    <span><strong>Be specific</strong> about your issue - provide details and context</span>
                  </li>
                  <li className="mb-2 d-flex gap-2" style={{ fontSize: "0.9rem" }}>
                    <span style={{ color: "#198754", fontWeight: "bold", marginTop: "-2px" }}>✓</span>
                    <span><strong>Include room number</strong> - helps us locate you quickly</span>
                  </li>
                  <li className="mb-2 d-flex gap-2" style={{ fontSize: "0.9rem" }}>
                    <span style={{ color: "#dc3545", fontWeight: "bold", marginTop: "-2px" }}>⚡</span>
                    <span><strong>Urgent issues?</strong> Call reception immediately for faster response</span>
                  </li>
                  <li className="d-flex gap-2" style={{ fontSize: "0.9rem" }}>
                    <span style={{ color: "#0d6efd", fontWeight: "bold", marginTop: "-2px" }}>⏱</span>
                    <span><strong>Response time:</strong> 2-4 hours during working hours</span>
                  </li>
                </ul>
              </div>

              {/* Support Info Box */}
              <div
                style={{
                  backgroundColor: "#f0f8ff",
                  border: "1px solid #b0d4ff",
                  padding: "12px",
                  borderRadius: "6px",
                  marginTop: "16px",
                  fontSize: "0.85rem",
                  color: "#0d6efd",
                  lineHeight: "1.5",
                }}
              >
                <strong>💡 Tip:</strong> Detailed descriptions help our team resolve your issue faster. Include what, when, and how it happened.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Support Tickets */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#fff", height: "100%" }}>
            <div
              className="card-header"
              style={{
                backgroundImage: "linear-gradient(to right, #f8f9fa, #e9ecef)",
                borderBottom: "1px solid #dee2e6",
                padding: "18px 20px",
              }}
            >
              <h5 className="mb-0 fw-bold" style={{ color: "#1a1a1a", fontSize: "1.05rem", letterSpacing: "-0.2px" }}>
                My Support Tickets <span style={{ color: "#0d6efd", fontWeight: "700" }}>({filteredTickets.length})</span>
              </h5>
            </div>

            <div className="card-body p-0">
              {filteredTickets.length === 0 ? (
                <div style={{ padding: "80px 20px", textAlign: "center", color: "#6c757d" }}>
                  <Eye size={56} style={{ opacity: 0.3, marginBottom: "16px" }} />
                  <p className="mb-2" style={{ fontSize: "1rem", fontWeight: "500" }}>No tickets found</p>
                  <small style={{ fontSize: "0.9rem" }}>Create a new ticket to report an issue</small>
                </div>
              ) : (
                <div>
                  {filteredTickets.map((ticket, index) => (
                    <div
                      key={ticket.id}
                      style={{
                        borderBottom: index < filteredTickets.length - 1 ? "1px solid #dee2e6" : "none",
                        borderLeft: `4px solid ${getStatusColor(ticket.status).color}`,
                      }}
                    >
                      {/* Ticket Summary */}
                      <div
                        style={{
                          padding: "18px 20px",
                          cursor: "pointer",
                          backgroundColor: expandedTicket === ticket.id ? "#f8f9fa" : "transparent",
                          transition: "background-color 0.2s ease",
                        }}
                        onClick={() => toggleTicketExpand(ticket.id)}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            toggleTicketExpand(ticket.id);
                          }
                        }}
                        aria-expanded={expandedTicket === ticket.id}
                        aria-label={`Expand ticket ${ticket.id}`}
                      >
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="flex-grow-1">
                            <h6 className="mb-1 fw-bold" style={{ color: "#1a1a1a", fontSize: "0.95rem", letterSpacing: "-0.2px" }}>
                              {ticket.subject}
                            </h6>
                            <p className="small text-muted mb-2" style={{ marginBottom: "8px", fontSize: "0.8rem" }}>
                              {ticket.id}
                            </p>
                          </div>
                          <div style={{ marginLeft: "12px" }}>
                            {expandedTicket === ticket.id ? (
                              <ChevronUp size={20} style={{ color: "#0d6efd" }} />
                            ) : (
                              <ChevronDown size={20} style={{ color: "#6c757d" }} />
                            )}
                          </div>
                        </div>

                        <div className="d-flex gap-2 mb-2" style={{ flexWrap: "wrap" }}>
                          <span className={getStatusColor(ticket.status).badge} style={{ fontSize: "0.8rem" }}>
                            {ticket.status}
                          </span>
                          <span className={getPriorityColor(ticket.priority)} style={{ fontSize: "0.8rem" }}>
                            {ticket.priority}
                          </span>
                        </div>
                      </div>

                      {/* Ticket Details - Expandable */}
                      {expandedTicket === ticket.id && (
                        <div
                          style={{
                            padding: "18px 20px",
                            backgroundColor: "#fafbfc",
                            borderTop: "1px solid #dee2e6",
                          }}
                        >
                          {/* Description */}
                          <div className="mb-4">
                            <p className="small fw-semibold text-muted mb-2" style={{ fontSize: "0.8rem", letterSpacing: "0.3px" }}>
                              DESCRIPTION
                            </p>
                            <p
                              style={{
                                backgroundColor: "#fff",
                                padding: "12px",
                                borderRadius: "4px",
                                borderLeft: "3px solid #0d6efd",
                                color: "#495057",
                                marginBottom: 0,
                                fontSize: "0.9rem",
                                lineHeight: "1.6",
                              }}
                            >
                              {ticket.description}
                            </p>
                          </div>

                          {/* Ticket Info Grid */}
                          <div className="row g-3 mb-4">
                            <div className="col-6">
                              <p className="small fw-semibold text-muted mb-1" style={{ fontSize: "0.8rem", letterSpacing: "0.3px" }}>
                                CREATED DATE
                              </p>
                              <p className="mb-0" style={{ color: "#1a1a1a", fontSize: "0.9rem" }}>
                                {ticket.createdDate}
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="small fw-semibold text-muted mb-1" style={{ fontSize: "0.8rem", letterSpacing: "0.3px" }}>
                                UPDATED DATE
                              </p>
                              <p className="mb-0" style={{ color: "#1a1a1a", fontSize: "0.9rem" }}>
                                {ticket.updatedDate}
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="small fw-semibold text-muted mb-1" style={{ fontSize: "0.8rem", letterSpacing: "0.3px" }}>
                                ASSIGNED TO
                              </p>
                              <p className="mb-0" style={{ color: "#1a1a1a", fontSize: "0.9rem" }}>
                                {ticket.assignedTo}
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="small fw-semibold text-muted mb-1" style={{ fontSize: "0.8rem", letterSpacing: "0.3px" }}>
                                PRIORITY
                              </p>
                              <span className={getPriorityColor(ticket.priority)} style={{ fontSize: "0.8rem" }}>
                                {ticket.priority}
                              </span>
                            </div>
                          </div>

                          {/* Latest Update */}
                          <div
                            style={{
                              backgroundColor: "#e7f1ff",
                              padding: "14px",
                              borderRadius: "4px",
                              borderLeft: "3px solid #0d6efd",
                              marginBottom: "16px",
                            }}
                          >
                            <p className="small fw-semibold mb-1" style={{ color: "#0d6efd", fontSize: "0.85rem", letterSpacing: "0.2px" }}>
                              LATEST UPDATE
                            </p>
                            <p style={{ color: "#495057", marginBottom: "6px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                              {ticket.latestUpdate}
                            </p>
                            <p className="small text-muted mb-0" style={{ fontSize: "0.8rem" }}>
                              By <strong>{ticket.updateAuthor}</strong>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Section */}
      <div className="row g-4 mt-4">
        <div className="col-12">
          <div
            className="alert d-flex align-items-start gap-3"
            role="alert"
            style={{
              backgroundColor: "#ffe0e0",
              color: "#c41c31",
              border: "1px solid #ffb3b3",
              marginBottom: 0,
              padding: "16px 20px",
            }}
          >
            <AlertTriangle size={24} style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <strong style={{ fontSize: "0.95rem", letterSpacing: "-0.2px" }}>Emergency Contact</strong>
              <p style={{ fontSize: "0.9rem", marginBottom: 0, lineHeight: "1.5" }}>
                For urgent issues that require immediate attention
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: "#fff" }}>
            <div className="card-body text-center">
              <Phone size={32} style={{ color: "#0d6efd", marginBottom: "12px" }} />
              <h6 className="fw-bold mb-2" style={{ color: "#1a1a1a", fontSize: "0.95rem" }}>
                Reception Desk
              </h6>
              <p className="text-muted small mb-3" style={{ fontSize: "0.85rem" }}>24/7 Available</p>
              <button
                className="btn btn-primary btn-sm w-100 fw-semibold"
                onClick={() => handleCallSupport("+91-8012345678")}
                aria-label="Call reception desk"
                style={{ fontSize: "0.9rem" }}
              >
                <Phone size={14} className="me-2" />
                +91-80-12345678
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: "#fff" }}>
            <div className="card-body text-center">
              <AlertCircle size={32} style={{ color: "#dc3545", marginBottom: "12px" }} />
              <h6 className="fw-bold mb-2" style={{ color: "#1a1a1a", fontSize: "0.95rem" }}>
                Security Office
              </h6>
              <p className="text-muted small mb-3" style={{ fontSize: "0.85rem" }}>Emergency Only</p>
              <button
                className="btn btn-danger btn-sm w-100 fw-semibold"
                onClick={() => handleCallSupport("+91-8076543211")}
                aria-label="Call security office"
                style={{ fontSize: "0.9rem" }}
              >
                <Phone size={14} className="me-2" />
                +91-8076543211
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: "#fff" }}>
            <div className="card-body text-center">
              <Building2 size={32} style={{ color: "#198754", marginBottom: "12px" }} />
              <h6 className="fw-bold mb-2" style={{ color: "#1a1a1a", fontSize: "0.95rem" }}>
                Maintenance
              </h6>
              <p className="text-muted small mb-3" style={{ fontSize: "0.85rem" }}>Mon-Sat, 9 AM - 8 PM</p>
              <button
                className="btn btn-success btn-sm w-100 fw-semibold"
                onClick={() => handleEmailSupport("maintenance@accommodation.com")}
                aria-label="Email maintenance team"
                style={{ fontSize: "0.9rem" }}
              >
                <Mail size={14} className="me-2" />
                +91-80-11223344
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
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
          onClick={() => setShowNewTicketModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-ticket-title"
        >
          <div
            className="card border-0 shadow-lg"
            style={{
              width: "100%",
              maxWidth: "500px",
              backgroundColor: "#fff",
              maxHeight: "90vh",
              overflowY: "auto",
              margin: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="card-header"
              style={{
                backgroundImage: "linear-gradient(to right, #0d6efd, #0b5ed7)",
                borderBottom: "1px solid #dee2e6",
                padding: "16px 20px",
                position: "sticky",
                top: 0,
                zIndex: 1051,
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold text-white" id="new-ticket-title" style={{ fontSize: "1.05rem", letterSpacing: "-0.2px" }}>
                  Create Support Ticket
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowNewTicketModal(false)}
                  aria-label="Close modal"
                  style={{ padding: "4px", cursor: "pointer" }}
                ></button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="card-body p-4">
              <div className="mb-4">
                <label className="form-label fw-semibold small" style={{ color: "#495057", fontSize: "0.85rem", letterSpacing: "0.2px" }}>
                  Issue Subject <span style={{ color: "#dc3545" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Brief description of your issue"
                  value={newTicketData.subject}
                  onChange={(e) =>
                    setNewTicketData({ ...newTicketData, subject: e.target.value })
                  }
                  aria-label="Issue subject"
                  disabled={isSubmitting}
                  style={{ fontSize: "0.9rem" }}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold small" style={{ color: "#495057", fontSize: "0.85rem", letterSpacing: "0.2px" }}>
                  Detailed Description <span style={{ color: "#dc3545" }}>*</span>
                </label>
                <textarea
                  className="form-control"
                  placeholder="Please provide details about your issue..."
                  rows="5"
                  value={newTicketData.description}
                  onChange={(e) =>
                    setNewTicketData({ ...newTicketData, description: e.target.value })
                  }
                  aria-label="Issue description"
                  disabled={isSubmitting}
                  style={{ fontSize: "0.9rem", lineHeight: "1.5" }}
                ></textarea>
                <small className="text-muted d-block mt-1" style={{ fontSize: "0.8rem" }}>
                  Include any relevant information (room number, when it started, etc.)
                </small>
              </div>

              <div
                style={{
                  backgroundColor: "#f0f8ff",
                  border: "1px solid #b0d4ff",
                  padding: "12px",
                  borderRadius: "6px",
                  marginBottom: "16px",
                  fontSize: "0.85rem",
                  color: "#0d6efd",
                  lineHeight: "1.5",
                }}
              >
                <strong>ℹ️ Note:</strong> Our team typically responds within 2-4 hours during working hours.
              </div>

              {/* Action Buttons */}
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg fw-semibold"
                  onClick={handleCreateTicket}
                  disabled={isSubmitting}
                  aria-label="Submit support ticket"
                  style={{ fontSize: "0.9rem", padding: "10px 16px" }}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Plus size={18} className="me-2" />
                      Create Ticket
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary fw-semibold"
                  onClick={() => setShowNewTicketModal(false)}
                  disabled={isSubmitting}
                  aria-label="Cancel"
                  style={{ fontSize: "0.9rem", padding: "10px 16px" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Support;