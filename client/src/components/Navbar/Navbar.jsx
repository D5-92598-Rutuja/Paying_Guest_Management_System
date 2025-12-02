import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="sidebar bg-white border-end p-3">

      <h5 className="fw-bold mb-4">
        PG Admin Panel</h5>

      <ul className="list-unstyled">

        {/* Overview */}
        <li className="text-uppercase small fw-semibold text-secondary mb-2">
          Overview
        </li>
        <li>
          <NavLink className="nav-link sidebar-link" 
          to="/home/dashboard">
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </NavLink>
        </li>

        {/* Room Management */}
        <li className="text-uppercase small fw-semibold text-secondary mt-3 mb-2">
          Room Management
        </li>
        <li>
          <NavLink className="nav-link sidebar-link" 
          to="/home/rooms-add">
            <i className="bi bi-plus-circle me-2"></i> Add Room
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link sidebar-link" 
          to="rooms-update">
            <i className="bi bi-cash-stack me-2"></i> Set/Update Rent
          </NavLink>
        </li>

        {/* Bookings */}
        <li className="text-uppercase small fw-semibold text-secondary mt-3 mb-2">
          Bookings
        </li>
        <li>
          <NavLink className="nav-link sidebar-link" 
          to="bookings-view">
            <i className="bi bi-journal-bookmark me-2"></i> View Bookings
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link sidebar-link" 
          to="/home/room-allocate">
            <i className="bi bi-house-door me-2"></i> Allocate Room
          </NavLink>
        </li>

        {/* Payments */}
        <li className="text-uppercase small fw-semibold text-secondary mt-3 mb-2"> Payments
        </li>
        <li>
          <NavLink className="nav-link sidebar-link" 
          to="/home/payments-view">
            <i className="bi bi-credit-card me-2"></i> View Payments
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link sidebar-link" 
          to="payments-due">
            <i className="bi bi-exclamation-circle me-2"></i> Due Payments
          </NavLink>
        </li>

        {/* User Management */}
        <li className="text-uppercase small fw-semibold text-secondary mt-3 mb-2">
          User Management
        </li>
        <li>
          <NavLink className="nav-link sidebar-link" 
          to="/home/users-verify">
            <i className="bi bi-person-badge me-2"></i> Verify KYC
          </NavLink>
        </li>

        {/* Support */}
        <li className="text-uppercase small fw-semibold text-secondary mt-3 mb-2"> Support
        </li>
        <li>
          <NavLink className="nav-link sidebar-link" 
          to="/home/support-resolve">
            <i className="bi bi-bug me-2"></i> Resolve Issues
          </NavLink>
        </li>

        {/* Communication */}
        <li className="text-uppercase small fw-semibold text-secondary mt-3 mb-2">
          Communication
        </li>
        <li>
          <NavLink className="nav-link sidebar-link" 
          to="/home/announcements">
            <i className="bi bi-megaphone me-2"></i> Post Announcement
          </NavLink>
        </li>

      </ul>
    </div>
  );
}

export default Navbar;
