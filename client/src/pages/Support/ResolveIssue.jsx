import React, { useState, useMemo } from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  MapPin,
  Calendar,
  Filter,
  Search,
  Send,
  Download,
  Eye,
  AlertTriangle,
  Ticket,
} from "lucide-react";
import { toast } from "sonner";

const initialIssues = [
  {
    id: "TKT001",
    subject: "AC not working in Room 205",
    user: "John Doe",
    room: "S2-205",
    category: "Maintenance",
    priority: "High",
    status: "Open",
    createdDate: "5/10/2024",
    updatedDate: "5/10/2024",
    description: "The AC unit in my room is not cooling properly. Temperature remains high even at full capacity.",
    comments: [
      {
        author: "Admin",
        text: "Technician will visit tomorrow at 10 AM.",
        date: "5/10/2024",
      },
    ],
  },
  {
    id: "TKT002",
    subject: "Wi-Fi connectivity issue",
    user: "Jane Smith",
    room: "D1-102",
    category: "Utilities",
    priority: "Medium",
    status: "In Progress",
    createdDate: "6/10/2024",
    updatedDate: "6/10/2024",
    description: "Internet connection keeps dropping in my room. Affecting work productivity.",
    comments: [
      {
        author: "Admin",
        text: "Router reset performed. Monitoring signal strength.",
        date: "6/10/2024",
      },
    ],
  },
  {
    id: "TKT003",
    subject: "Water leakage in bathroom",
    user: "Mike Johnson",
    room: "T1-103",
    category: "Maintenance",
    priority: "High",
    status: "Open",
    createdDate: "7/10/2024",
    updatedDate: "7/10/2024",
    description: "Water is leaking from the shower area. Creating puddles on the floor.",
    comments: [],
  },
  {
    id: "TKT004",
    subject: "Noise complaint",
    user: "Sarah Wilson",
    room: "S1-101",
    category: "Disturbance",
    priority: "Low",
    status: "Resolved",
    createdDate: "3/10/2024",
    updatedDate: "3/10/2024",
    description: "Noise from neighboring room late at night.",
    comments: [
      {
        author: "Admin",
        text: "Addressed with neighbors. Issue resolved.",
        date: "3/10/2024",
      },
    ],
  },
  {
    id: "TKT005",
    subject: "Food quality concern",
    user: "David Brown",
    room: "D2-201",
    category: "Amenities",
    priority: "Medium",
    status: "Open",
    createdDate: "4/10/2024",
    updatedDate: "4/10/2024",
    description: "Inconsistent food quality in the mess. Requesting review of vendors.",
    comments: [
      {
        author: "Admin",
        text: "Will conduct inspection of food preparation area.",
        date: "4/10/2024",
      },
    ],
  },
];

const CATEGORIES = ["All", "Maintenance", "Utilities", "Disturbance", "Amenities"];
const STATUSES = ["All", "Open", "In Progress", "Resolved"];
const PRIORITIES = ["All", "High", "Medium", "Low"];

function ResolveIssues() {
  const [issues, setIssues] = useState(initialIssues);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showAddComment, setShowAddComment] = useState(false);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch =
        !search ||
        issue.id.toLowerCase().includes(search.toLowerCase()) ||
        issue.user.toLowerCase().includes(search.toLowerCase()) ||
        issue.subject.toLowerCase().includes(search.toLowerCase()) ||
        issue.room.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = categoryFilter === "All" || issue.category === categoryFilter;
      const matchesStatus = statusFilter === "All" || issue.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || issue.priority === priorityFilter;

      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });
  }, [search, categoryFilter, statusFilter, priorityFilter, issues]);

  const stats = useMemo(() => {
    return {
      total: issues.length,
      open: issues.filter((i) => i.status === "Open").length,
      inProgress: issues.filter((i) => i.status === "In Progress").length,
      resolved: issues.filter((i) => i.status === "Resolved").length,
    };
  }, [issues]);

  const handleStatusChange = (issueId, newStatus) => {
    const updatedIssues = issues.map((issue) =>
      issue.id === issueId
        ? { ...issue, status: newStatus, updatedDate: new Date().toLocaleDateString("en-IN") }
        : issue
    );
    setIssues(updatedIssues);

    const issue = updatedIssues.find((i) => i.id === issueId);
    if (selectedIssue && selectedIssue.id === issueId) {
      setSelectedIssue(issue);
    }

    toast.success(`Ticket ${issueId} status updated to ${newStatus}`);
  };

  const handlePriorityChange = (issueId, newPriority) => {
    const updatedIssues = issues.map((issue) =>
      issue.id === issueId ? { ...issue, priority: newPriority } : issue
    );
    setIssues(updatedIssues);

    const issue = updatedIssues.find((i) => i.id === issueId);
    if (selectedIssue && selectedIssue.id === issueId) {
      setSelectedIssue(issue);
    }

    toast.success(`Ticket ${issueId} priority updated to ${newPriority}`);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    const updatedIssues = issues.map((issue) =>
      issue.id === selectedIssue.id
        ? {
            ...issue,
            comments: [
              ...issue.comments,
              {
                author: "Admin",
                text: newComment,
                date: new Date().toLocaleDateString("en-IN"),
              },
            ],
            updatedDate: new Date().toLocaleDateString("en-IN"),
          }
        : issue
    );

    setIssues(updatedIssues);
    setSelectedIssue(updatedIssues.find((i) => i.id === selectedIssue.id));
    setNewComment("");
    setShowAddComment(false);
    toast.success("Comment added successfully");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return { badge: "badge bg-danger" };
      case "In Progress":
        return { badge: "badge bg-warning text-dark" };
      case "Resolved":
        return { badge: "badge bg-success" };
      default:
        return { badge: "badge bg-secondary" };
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

  const getCategoryColor = (category) => {
    const colors = {
      Maintenance: "badge bg-primary text-white",
      Utilities: "badge bg-info text-white",
      Disturbance: "badge bg-warning text-dark",
      Amenities: "badge bg-success text-white",
    };
    return colors[category] || "badge bg-secondary text-white";
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", overflowY: "auto", padding: "20px" }}>
      {/* Header Section */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#1a1a1a", marginBottom: "8px" }}>
              Resolve Issues
            </h1>
            <p className="text-muted" style={{ marginBottom: 0 }}>
              Manage customer care tickets and issues
            </p>
          </div>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
            <Download size={16} />
            Export Report
          </button>
        </div>

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: "#fff" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted fw-semibold">Total Tickets</small>
                  <Ticket size={16} style={{ color: "#6c757d" }} />
                </div>
                <h3 className="mb-0 fw-bold" style={{ fontSize: "1.75rem", color: "#1a1a1a" }}>
                  {stats.total}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: "#fff", borderTop: "3px solid #dc3545" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small style={{ color: "#dc3545", fontWeight: "600" }}>Open Tickets</small>
                  <AlertTriangle size={16} style={{ color: "#dc3545" }} />
                </div>
                <h3 className="mb-0 fw-bold" style={{ fontSize: "1.75rem", color: "#dc3545" }}>
                  {stats.open}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: "#fff", borderTop: "3px solid #fd7e14" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small style={{ color: "#fd7e14", fontWeight: "600" }}>In Progress</small>
                  <Clock size={16} style={{ color: "#fd7e14" }} />
                </div>
                <h3 className="mb-0 fw-bold" style={{ fontSize: "1.75rem", color: "#fd7e14" }}>
                  {stats.inProgress}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: "#fff", borderTop: "3px solid #198754" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small style={{ color: "#198754", fontWeight: "600" }}>Resolved</small>
                  <CheckCircle size={16} style={{ color: "#198754" }} />
                </div>
                <h3 className="mb-0 fw-bold" style={{ fontSize: "1.75rem", color: "#198754" }}>
                  {stats.resolved}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="card border-0 shadow-sm mb-4" style={{ backgroundColor: "#fff" }}>
        <div className="card-body">
          <h5 className="card-title mb-4 d-flex align-items-center gap-2" style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1a1a1a" }}>
            <Filter size={18} />
            Search & Filters
          </h5>
          <div className="row g-3">
            <div className="col-12 col-md-3">
              <label className="form-label fw-semibold small" style={{ color: "#495057" }}>
                Search
              </label>
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#fff", borderRight: "none" }}>
                  <Search size={16} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  style={{ borderLeft: "none",color: "#495057" ,borderColor:"#495057"}}
                  placeholder="Ticket ID, user, room..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label fw-semibold small" style={{ color: "#495057" }}>
                Category
              </label>
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label fw-semibold small" style={{ color: "#495057" }}>
                Status
              </label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label fw-semibold small" style={{ color: "#495057" }}>
                Priority
              </label>
              <select
                className="form-select"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Issues Table and Detail View */}
      <div className="row g-4">
        {/* Tickets List */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#fff", maxHeight: "700px", display: "flex", flexDirection: "column" }}>
            <div
              className="card-header"
              style={{
                backgroundImage: "linear-gradient(to right, #f8f9fa, #e9ecef)",
                borderBottom: "1px solid #dee2e6",
              }}
            >
              <h6 className="mb-0 fw-bold" style={{ color: "#1a1a1a" }}>
                Tickets ({filteredIssues.length})
              </h6>
            </div>

            <div style={{ overflowY: "auto", flex: 1 }}>
              {filteredIssues.length === 0 ? (
                <div style={{ padding: "40px 20px", textAlign: "center", color: "#6c757d" }}>
                  <Eye size={48} style={{ opacity: 0.5, marginBottom: "8px" }} />
                  <p>No tickets found</p>
                </div>
              ) : (
                <div>
                  {filteredIssues.map((issue) => (
                    <div
                      key={issue.id}
                      onClick={() => setSelectedIssue(issue)}
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #dee2e6",
                        borderLeft: selectedIssue?.id === issue.id ? "4px solid #0d6efd" : issue.priority === "High" ? "4px solid #dc3545" : issue.priority === "Medium" ? "4px solid #fd7e14" : "4px solid #e9ecef",
                        backgroundColor: selectedIssue?.id === issue.id ? "#e7f1ff" : "transparent",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedIssue?.id !== issue.id) {
                          e.currentTarget.style.backgroundColor = "#f8f9fa";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedIssue?.id !== issue.id) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="mb-0 fw-bold" style={{ color: "#1a1a1a" }}>
                          {issue.id}
                        </h6>
                        <span className={getStatusColor(issue.status).badge}>{issue.status}</span>
                      </div>
                      <p className="small text-muted mb-1 d-flex align-items-center gap-1">
                        <User size={12} />
                        {issue.user}
                      </p>
                      <p className="small fw-semibold" style={{ color: "#1a1a1a", lineHeight: 1.4, marginBottom: "8px" }}>
                        {issue.subject}
                      </p>
                      <div>
                        <span className={getPriorityColor(issue.priority)}>{issue.priority}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="col-12 col-lg-8">
          {selectedIssue ? (
            <div className="card border-0 shadow-sm" style={{ backgroundColor: "#fff", maxHeight: "700px", display: "flex", flexDirection: "column" }}>
              {/* Header */}
              <div
                className="card-header"
                style={{
                  backgroundImage: "linear-gradient(to right, #f8f9fa, #e9ecef)",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="mb-1 fw-bold" style={{ color: "#1a1a1a" }}>
                      {selectedIssue.subject}
                    </h5>
                    <small className="text-muted">{selectedIssue.id}</small>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedIssue(null)}
                    aria-label="Close"
                  ></button>
                </div>
              </div>

              {/* Content */}
              <div style={{ overflowY: "auto", flex: 1 }}>
                <div className="card-body">
                  {/* Quick Info Grid */}
                  <div className="row g-3 mb-4 pb-4" style={{ borderBottom: "1px solid #dee2e6" }}>
                    <div className="col-6">
                      <small className="fw-semibold text-muted d-block mb-1">User</small>
                      <p className="mb-0 d-flex align-items-center gap-1" style={{ color: "#1a1a1a", fontWeight: "500" }}>
                        <User size={16} style={{ color: "#0d6efd" }} />
                        {selectedIssue.user}
                      </p>
                    </div>
                    <div className="col-6">
                      <small className="fw-semibold text-muted d-block mb-1">Room</small>
                      <p className="mb-0 d-flex align-items-center gap-1" style={{ color: "#1a1a1a", fontWeight: "500" }}>
                        <MapPin size={16} style={{ color: "#0d6efd" }} />
                        {selectedIssue.room}
                      </p>
                    </div>
                    <div className="col-6">
                      <small className="fw-semibold text-muted d-block mb-1">Category</small>
                      <span className={getCategoryColor(selectedIssue.category)}>{selectedIssue.category}</span>
                    </div>
                    <div className="col-6">
                      <small className="fw-semibold text-muted d-block mb-1">Created</small>
                      <p className="mb-0 d-flex align-items-center gap-1" style={{ color: "#1a1a1a", fontWeight: "500" }}>
                        <Calendar size={16} style={{ color: "#0d6efd" }} />
                        {selectedIssue.createdDate}
                      </p>
                    </div>
                  </div>

                  {/* Status and Priority Controls */}
                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <label className="form-label fw-semibold small" style={{ color: "#495057" }}>
                        Status
                      </label>
                      <select
                        className="form-select form-select-sm"
                        value={selectedIssue.status}
                        onChange={(e) => handleStatusChange(selectedIssue.id, e.target.value)}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-semibold small" style={{ color: "#495057" }}>
                        Priority
                      </label>
                      <select
                        className="form-select form-select-sm"
                        value={selectedIssue.priority}
                        onChange={(e) => handlePriorityChange(selectedIssue.id, e.target.value)}
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <h6 className="fw-bold" style={{ color: "#1a1a1a", marginBottom: "8px" }}>
                      Description
                    </h6>
                    <p
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "12px",
                        borderRadius: "4px",
                        marginBottom: 0,
                        borderLeft: "3px solid #0d6efd",
                        color: "#495057",
                      }}
                    >
                      {selectedIssue.description}
                    </p>
                  </div>

                  {/* Comments Section */}
                  <div>
                    <h6 className="fw-bold" style={{ color: "#1a1a1a", marginBottom: "12px" }}>
                      Comments ({selectedIssue.comments.length})
                    </h6>
                    <div
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "12px",
                        borderRadius: "4px",
                        marginBottom: "12px",
                        border: "1px solid #dee2e6",
                        maxHeight: "150px",
                        overflowY: "auto",
                      }}
                    >
                      {selectedIssue.comments.length === 0 ? (
                        <p className="text-muted text-center small mb-0">No comments yet</p>
                      ) : (
                        <div>
                          {selectedIssue.comments.map((comment, idx) => (
                            <div
                              key={idx}
                              style={{
                                backgroundColor: "#fff",
                                padding: "8px",
                                borderRadius: "4px",
                                marginBottom: "8px",
                                border: "1px solid #dee2e6",
                                fontSize: "0.875rem",
                              }}
                            >
                              <p className="fw-bold mb-1" style={{ color: "#1a1a1a", marginBottom: "4px" }}>
                                {comment.author}
                              </p>
                              <p className="text-muted small mb-1" style={{ marginBottom: "4px" }}>
                                {comment.date}
                              </p>
                              <p style={{ color: "#495057", marginBottom: 0 }}>{comment.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Add Comment */}
                    {!showAddComment ? (
                      <button
                        type="button"
                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                        onClick={() => setShowAddComment(true)}
                      >
                        <Send size={16} />
                        Add Comment
                      </button>
                    ) : (
                      <div>
                        <textarea
                          placeholder="Write your comment here..."
                          className="form-control form-control-sm mb-2"
                          rows="2"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm flex-grow-1"
                            onClick={handleAddComment}
                          >
                            Send
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm flex-grow-1"
                            onClick={() => {
                              setShowAddComment(false);
                              setNewComment("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="card border-0 shadow-sm d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#fff",
                minHeight: "700px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Eye size={64} style={{ opacity: 0.25, marginBottom: "12px" }} />
                <p style={{ color: "#6c757d", fontWeight: "500", marginBottom: 0 }}>
                  Select a ticket to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResolveIssues;