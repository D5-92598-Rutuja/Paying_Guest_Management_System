import StatusBadge from "./StatusBadge";

const BookingTable = ({ bookings }) => {
  return (
    <div className="card shadow-sm rounded-4 border">
      <div className="card-body">

        <h6 className="fw-bold mb-3">
          Bookings ({bookings.length})
        </h6>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            
            <thead className="border-bottom text-muted">
              <tr>
                <th>Booking ID</th>
                <th>Room Type</th>
                <th>User</th>
                <th>Join Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="fw-semibold">{b.id}</td>
                  <td>{b.room}</td>
                  <td>{b.user}</td>
                  <td>{b.join}</td>
                  <td>{b.end}</td>
                  <td><StatusBadge status={b.status} /></td>
                  <td className="text-center">
                    <button className="btn btn-outline-secondary btn-sm rounded-pill px-4">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default BookingTable;
