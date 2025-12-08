import React from "react";
import { Badge } from "react-bootstrap";

const ActivityItem = ({ text, time, type }) => {
  const badgeColor =
    type === "booking"
      ? "secondary"
      : type === "payment"
      ? "primary"
      : type === "kyc"
      ? "info"
      : "danger";

  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-3">
      <div>
        <p className="mb-1">{text}</p>
        <small className="text-muted">{time}</small>
      </div>

      <Badge bg={badgeColor} className="text-capitalize px-3 py-2">
        {type}
      </Badge>
    </div>
  );
};

export default ActivityItem;
