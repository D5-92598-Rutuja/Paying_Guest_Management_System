const StatusBadge = ({ status }) => {
  const style =
    status === "Active"
      ? "badge bg-dark px-3 py-2"
      : status === "Completed"
      ? "badge bg-light border text-dark px-3 py-2"
      : "badge bg-secondary px-3 py-2";

  return <span className={style}>{status}</span>;
};

export default StatusBadge;
