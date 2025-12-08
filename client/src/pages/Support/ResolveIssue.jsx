import React, { useState, useMemo } from "react";
import {
  MessageSquare,
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
} from "lucide-react";
import { toast } from "sonner";

const initialIssues = [
  {
    id: "ISS001",
    tenantName: "John Doe",
    room: "101",
    category: "Maintenance",
    title: "Broken Bathroom Tap",
    description: "The bathroom tap is leaking continuously.",
    status: "Open",
    priority: "High",
    createdDate: "2025-12-01",
    updatedDate: "2025-12-01",
    comments: [
      {
        author: "Admin",
        text: "We will send a plumber tomorrow.",
        date: "2025-12-02",
      },
    ],
  },
  {
    id: "ISS002",
    tenantName: "Jane Smith",
    room: "205",
    category: "Noise",
    title: "Noise Complaint",
    description: "Neighbors are making too much noise late at night.",
    status: "In Progress",
    priority: "Medium",
    createdDate: "2025-11-28",
    updatedDate: "2025-12-01",
    comments: [
      {
        author: "Admin",
        text: "Reminder sent to neighbor regarding quiet hours.",
        date: "2025-11-29",
      },
      {
        author: "Admin",
        text: "Issue seems to be resolved.",
        date: "2025-12-01",
      },
    ],
  },
  {
    id: "ISS003",
    tenantName: "Mike Johnson",
    room: "302",
    category: "Cleanliness",
    title: "Common Area Not Cleaned",
    description: "The common corridor hasn't been cleaned in 2 days.",
    status: "Resolved",
    priority: "Low",
    createdDate: "2025-11-25",
    updatedDate: "2025-11-27",
    comments: [
      {
        author: "Admin",
        text: "Cleaning staff has been notified.",
        date: "2025-11-26",
      },
      {
        author: "Admin",
        text: "Area cleaned on 27th Nov.",
        date: "2025-11-27",
      },
    ],
  },
  {
    id: "ISS004",
    tenantName: "Sarah Wilson",
    room: "104",
    category: "Utilities",
    title: "Water Supply Issue",
    description: "No water supply in the morning hours (6 AM - 9 AM).",
    status: "Open",
    priority: "High",
    createdDate: "2025-12-02",
    updatedDate: "2025-12-02",
    comments: [],
  },
  {
    id: "ISS005",
    tenantName: "David Brown",
    room: "203",
    category: "Security",
    title: "Lost Room Key",
    description: "I lost my room key and need a replacement.",
    status: "In Progress",
    priority: "Medium",
    createdDate: "2025-11-30",
    updatedDate: "2025-12-01",
    comments: [
      {
        author: "Admin",
        text: "New key is being prepared. Will be ready by tomorrow.",
        date: "2025-12-01",
      },
    ],
  },
];

const CATEGORIES = ["All", "Maintenance", "Noise", "Cleanliness", "Utilities", "Security", "Other"];
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

  // Filter issues
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch =
        !search ||
        issue.id.toLowerCase().includes(search.toLowerCase()) ||
        issue.tenantName.toLowerCase().includes(search.toLowerCase()) ||
        issue.title.toLowerCase().includes(search.toLowerCase()) ||
        issue.room.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = categoryFilter === "All" || issue.category === categoryFilter;
      const matchesStatus = statusFilter === "All" || issue.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || issue.priority === priorityFilter;

      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });
  }, [search, categoryFilter, statusFilter, priorityFilter, issues]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: issues.length,
      open: issues.filter((i) => i.status === "Open").length,
      inProgress: issues.filter((i) => i.status === "In Progress").length,
      resolved: issues.filter((i) => i.status === "Resolved").length,
      high: issues.filter((i) => i.priority === "High").length,
    };
  }, [issues]);

  // Handle status change
  const handleStatusChange = (issueId, newStatus) => {
    const updatedIssues = issues.map((issue) =>
      issue.id === issueId
        ? { ...issue, status: newStatus, updatedDate: new Date().toISOString().split("T")[0] }
        : issue
    );
    setIssues(updatedIssues);

    const issue = updatedIssues.find((i) => i.id === issueId);
    if (selectedIssue && selectedIssue.id === issueId) {
      setSelectedIssue(issue);
    }

    toast.success(`Issue ${issueId} status updated to ${newStatus}`);
  };

  // Handle priority change
  const handlePriorityChange = (issueId, newPriority) => {
    const updatedIssues = issues.map((issue) =>
      issue.id === issueId ? { ...issue, priority: newPriority } : issue
    );
    setIssues(updatedIssues);

    const issue = updatedIssues.find((i) => i.id === issueId);
    if (selectedIssue && selectedIssue.id === issueId) {
      setSelectedIssue(issue);
    }

    toast.success(`Issue ${issueId} priority updated to ${newPriority}`);
  };

  // Add comment
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
                date: new Date().toISOString().split("T")[0],
              },
            ],
            updatedDate: new Date().toISOString().split("T")[0],
          }
        : issue
    );

    setIssues(updatedIssues);
    setSelectedIssue(updatedIssues.find((i) => i.id === selectedIssue.id));
    setNewComment("");
    setShowAddComment(false);
    toast.success("Comment added successfully");
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-orange-100 text-orange-800";
      case "Low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="h-4 w-4" />;
      case "In Progress":
        return <Clock className="h-4 w-4" />;
      case "Resolved":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Resolve Issues</h2>
            <p className="text-sm text-gray-600">Manage and resolve tenant complaints</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>

        {/* User Guide / Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Quick Guide</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Search & Filter:</strong> Find issues by ID, tenant name, or keyword</li>
                <li>• <strong>View Details:</strong> Click an issue to see full description and comments</li>
                <li>• <strong>Update Status:</strong> Mark issues as Open, In Progress, or Resolved</li>
                <li>• <strong>Add Comments:</strong> Communicate with tenants through the comment section</li>
                <li>• <strong>Set Priority:</strong> High priority issues are marked with red badge</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="bg-white rounded-lg border p-3 shadow-sm">
          <p className="text-xs text-gray-600 mb-1">Total Issues</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-red-50 rounded-lg border border-red-200 p-3 shadow-sm">
          <p className="text-xs text-red-700 font-medium mb-1">Open</p>
          <p className="text-2xl font-bold text-red-700">{stats.open}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-3 shadow-sm">
          <p className="text-xs text-yellow-700 font-medium mb-1">In Progress</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.inProgress}</p>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-3 shadow-sm">
          <p className="text-xs text-green-700 font-medium mb-1">Resolved</p>
          <p className="text-2xl font-bold text-green-700">{stats.resolved}</p>
        </div>
        <div className="bg-red-100 rounded-lg border border-red-300 p-3 shadow-sm">
          <p className="text-xs text-red-900 font-medium mb-1">High Priority</p>
          <p className="text-2xl font-bold text-red-700">{stats.high}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6 shadow-sm">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="ID, tenant name, or title..."
                className="w-full pl-8 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">Category</label>
            <select
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">Status</label>
            <select
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">Priority</label>
            <select
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Issues List and Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Issues List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border shadow-sm h-[600px] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-3 font-semibold text-sm">
              Issues ({filteredIssues.length})
            </div>

            {filteredIssues.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">No issues found</div>
            ) : (
              <div className="divide-y">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue)}
                    className={`p-3 cursor-pointer hover:bg-gray-50 transition border-l-4 ${
                      selectedIssue?.id === issue.id
                        ? "bg-blue-50 border-l-blue-500"
                        : issue.priority === "High"
                        ? "border-l-red-500"
                        : issue.priority === "Medium"
                        ? "border-l-orange-500"
                        : "border-l-blue-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="font-semibold text-sm">{issue.id}</div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{issue.tenantName}</p>
                    <p className="text-xs font-medium text-gray-700 line-clamp-2">{issue.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Issue Details */}
        <div className="lg:col-span-2">
          {selectedIssue ? (
            <div className="bg-white rounded-lg border shadow-sm p-4 h-[600px] overflow-y-auto flex flex-col">
              {/* Issue Header */}
              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold">{selectedIssue.title}</h3>
                    <p className="text-sm text-gray-600">{selectedIssue.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedIssue(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                  <div>
                    <p className="text-gray-600">Tenant</p>
                    <p className="font-semibold flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {selectedIssue.tenantName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Room</p>
                    <p className="font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {selectedIssue.room}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Category</p>
                    <p className="font-semibold">{selectedIssue.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Created</p>
                    <p className="font-semibold flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {selectedIssue.createdDate}
                    </p>
                  </div>
                </div>

                {/* Status and Priority Controls */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">Status</label>
                    <select
                      className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedIssue.status}
                      onChange={(e) => handleStatusChange(selectedIssue.id, e.target.value)}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">Priority</label>
                    <select
                      className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedIssue.priority}
                      onChange={(e) => handlePriorityChange(selectedIssue.id, e.target.value)}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Description</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                  {selectedIssue.description}
                </p>
              </div>

              {/* Comments Section */}
              <div className="flex-1 mb-4 flex flex-col">
                <h4 className="font-semibold text-sm mb-2">Comments ({selectedIssue.comments.length})</h4>
                <div className="flex-1 overflow-y-auto bg-gray-50 rounded p-3 mb-3 space-y-3">
                  {selectedIssue.comments.length === 0 ? (
                    <p className="text-xs text-gray-500 text-center py-4">No comments yet</p>
                  ) : (
                    selectedIssue.comments.map((comment, idx) => (
                      <div key={idx} className="bg-white p-2 rounded border text-xs">
                        <p className="font-semibold text-gray-900">{comment.author}</p>
                        <p className="text-gray-600 text-xs mb-1">{comment.date}</p>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Comment */}
                {!showAddComment ? (
                  <button
                    onClick={() => setShowAddComment(true)}
                    className="w-full px-3 py-2 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600 transition flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Add Comment
                  </button>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      placeholder="Write your comment here..."
                      className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="2"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddComment}
                        className="flex-1 px-3 py-1.5 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600 transition"
                      >
                        Send
                      </button>
                      <button
                        onClick={() => {
                          setShowAddComment(false);
                          setNewComment("");
                        }}
                        className="flex-1 px-3 py-1.5 bg-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border shadow-sm p-8 h-[600px] flex items-center justify-center">
              <div className="text-center">
                <Eye className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Select an issue to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResolveIssues;
