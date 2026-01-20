import React from "react";
import { Card } from "react-bootstrap";

const StatCard = ({ title, value, desc, icon }) => {
  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="d-flex justify-content-between">
        <div>
          <h6 className="fw-semibold">{title}</h6>
          <h3 className="fw-bold mt-3">{value}</h3>
          <p className="text-muted small">{desc}</p>
        </div>
        <div className="fs-4 text-muted">{icon}</div>
      </Card.Body>
    </Card>
  );
};

export default StatCard;
