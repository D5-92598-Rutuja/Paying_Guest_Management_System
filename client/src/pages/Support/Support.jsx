import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../service/axiosInstance";

export default function Support() {
  const [showForm, setShowForm] = useState(false);
  const [tickets, setTickets] = useState([]);

  // Form state
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(""); // Category ID
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    axios
      .get("/client/tickets")
      .then((res) => setTickets(res.data))
      .catch((err) => console.error(err.response?.data || err.message));
  };

  const submitTicket = () => {
    if (!subject || !description || !id) {
      toast.warning("Please fill all fields");
      return;
    }

    axios
      .post("/client/tickets", {
        subject,
        description,
        id: Number(id),
      })
      .then(() => {
        setMessage("Ticket raised successfully!");
        setSubject("");
        setDescription("");
        setId("");
        setShowForm(false);
        fetchTickets();
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        toast.error("Failed to create ticket");
      });
  };

  return (
    
    <div className="container-fluid mt-4">
      <div className="row">

        {/* <h1>Customer Support</h1>
        <br></br> */}

        {/* LEFT PANEL - Form */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              {!showForm ? (
                <>
                  <button
                    className="btn btn-danger w-100 fw-bold mb-4"
                    onClick={() => setShowForm(true)}
                  >
                    + Raise Ticket
                  </button>
                  <div className="alert alert-light border">
                    <h6 className="fw-bold">📌 Support Rules</h6>
                    <ul className="small mb-0">
                      <li>One problem per ticket</li>
                      <li>Provide clear details</li>
                      <li>No fake complaints</li>
                      <li>Admin replies within 24 hours</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <h5 className="fw-bold text-primary text-center mb-3">
                    Raise Support Ticket
                  </h5>
                  {message && <div className="alert alert-success">{message}</div>}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Issue Title</label>
                    <input
                      className="form-control"
                      placeholder="AC not working"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Category</label>
                    <select
                      className="form-select"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    >
                      <option value="">Select category</option>
                      <option value="1">Maintenance</option>
                      <option value="2">Payment</option>
                      <option value="3">Cleaning</option>
                      <option value="4">Food</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Explain your issue..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={submitTicket}
                  >
                    Submit Ticket
                  </button>
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Tickets */}
        <div className="col-md-8">
          {tickets.length === 0 ? (
            <div className="text-center text-muted mt-5">
              <h5>No tickets raised yet</h5>
              <p>Click "Raise Ticket" to create one</p>
            </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="card shadow mb-4 rounded-3"
                style={{ width: "100%", maxWidth: "100%", minHeight: "150px" }}
              >
                {/* Colored top stripe by priority */}
                <div
                  style={{
                    height: "5px",
                    borderTopLeftRadius: "0.3rem",
                    borderTopRightRadius: "0.3rem",
                    backgroundColor:
                      ticket.category?.priority === "HIGH"
                        ? "#dc3545"
                        : ticket.category?.priority === "MEDIUM"
                        ? "#ffc107"
                        : "#198754",
                  }}
                ></div>

                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-bold" title={ticket.subject}>
                      {ticket.subject}
                    </h5>

                    <span
                      className={
                        ticket.ticketStatus === "OPEN"
                          ? "badge bg-warning text-dark"
                          : ticket.ticketStatus === "IN_PROGRESS"
                          ? "badge bg-primary"
                          : "badge bg-success"
                      }
                      style={{ fontSize: "0.85rem" }}
                    >
                      {ticket.ticketStatus}
                    </span>
                  </div>

                  <div className="d-flex gap-2 mb-2 flex-wrap">
                    <span className="badge bg-secondary">
                      {ticket.category?.categoryName || "N/A"}
                    </span>
                    <span
                      className={
                        ticket.category?.priority === "HIGH"
                          ? "badge bg-danger"
                          : ticket.category?.priority === "MEDIUM"
                          ? "badge bg-warning text-dark"
                          : "badge bg-success"
                      }
                    >
                      {ticket.category?.priority || "N/A"}
                    </span>
                  </div>

                  <p className="small text-muted flex-grow-1">
                    {ticket.description.length > 200
                      ? ticket.description.substring(0, 200) + "..."
                      : ticket.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>


          
      </div>
      


      
    </div>
  );
}