import { FaSearch, FaFilter } from "react-icons/fa";

const BookingFilters = ({ onSearch, onStatusChange }) => {
  return (
    <div className="card p-4 mb-4 shadow-sm rounded-4 border">

      <div className="d-flex align-items-center gap-2 mb-3">
        <FaFilter />
        <h6 className="mb-0 fw-semibold">Filters</h6>
      </div>

      <div className="row g-4">

        {/* SEARCH */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">Search</label>
          <div className="input-group bg-light rounded-3">
            <span className="input-group-text bg-light border-0">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control bg-light border-0"
              placeholder="Search by user or booking ID"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        {/* STATUS */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">Status</label>
          <select
            className="form-select bg-light border-0"
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default BookingFilters;
