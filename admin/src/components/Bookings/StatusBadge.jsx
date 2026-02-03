const StatusBadge = ({ status }) => {
  const getBadgeStyle = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return 'badge bg-success px-3 py-2 fw-semibold';
      case 'COMPLETED':
        return 'badge bg-success text-white px-3 py-2 fw-semibold';
      case 'PENDING':
        return 'badge bg-warning text-dark px-3 py-2 fw-semibold';
      case 'CANCELLED':
        return 'badge bg-danger px-3 py-2 fw-semibold';
      default:
        return 'badge bg-secondary px-3 py-2 fw-semibold';
    }
  };

  return (
    <span 
      className={getBadgeStyle(status)} 
      style={{ 
        minWidth: '100px', 
        maxWidth: '100px', 
        textAlign: 'center',
        display: 'inline-block'
      }}
      title={status}
    >
      {status || 'Unknown'}
    </span>
  );
};

export default StatusBadge;
