import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  House,
  People,
  CreditCard,
  ExclamationTriangle,
} from "react-bootstrap-icons";

import StatCard from "../../components/Dashboard/StatCard";
import ActivityItem from "../../components/Dashboard/ActivityItem";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Container fluid>
        {/* Header */}
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-muted">Overview of your PG management system</p>

        {/* Stat Cards */}
        <Row className="g-4 mt-3">
          <Col lg={3} md={6}>
            <StatCard
              title="Total Rooms"
              value="120"
              desc="Available rooms in the system"
              icon={<House />}
            />
          </Col>

          <Col lg={3} md={6}>
            <StatCard
              title="Booked Rooms"
              value="95"
              desc="Currently occupied rooms"
              icon={<People />}
            />
          </Col>

          <Col lg={3} md={6}>
            <StatCard
              title="Pending Dues"
              value="₹2,45,000"
              desc="Outstanding payments"
              icon={<CreditCard />}
            />
          </Col>

          <Col lg={3} md={6}>
            <StatCard
              title="Unresolved Tickets"
              value="8"
              desc="Customer care issues"
              icon={<ExclamationTriangle />}
            />
          </Col>
        </Row>

        {/* Recent Activities */}
        <Card className="mt-5 shadow-sm border-0">
          <Card.Body>
            <h5 className="fw-semibold mb-4">Recent Activities</h5>

            <ActivityItem
              text="New booking by John Doe for Room 101"
              time="2 hours ago"
              type="booking"
            />

            <ActivityItem
              text="Payment of ₹15,000 received from Jane Smith"
              time="4 hours ago"
              type="payment"
            />

            <ActivityItem
              text="KYC submitted by Mike Johnson"
              time="6 hours ago"
              type="kyc"
            />

            <ActivityItem
              text="Issue raised about AC in Room 205"
              time="8 hours ago"
              type="issue"
            />
          </Card.Body>
        </Card>
      </Container>
    </DashboardLayout>
  );
};

export default Dashboard;
