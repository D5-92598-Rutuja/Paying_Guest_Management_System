import { useEffect, useState } from "react";
import BookingFilters from "../../components/Bookings/BookingFilters";
import BookingTable from "../../components/Bookings/BookingTable";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // Dummy data for now (Backend later)
  useEffect(() => {
    setBookings([
      {
        id: "BK001",
        room: "Single Sharing",
        user: "John",
        join: "15/01/24",
        end: "15/07/24",
        status: "Active",
      },
      {
        id: "BK002",
        room: "Double Sharing",
        user: "Riya",
        join: "01/02/24",
        end: "01/08/24",
        status: "Completed",
      },
      {
        id: "BK003",
        room: "Triple Sharing",
        user: "Aman",
        join: "10/03/24",
        end: "10/09/24",
        status: "Pending",
      },
    ]);
  }, []);

  //Dynamic filtering
  const filteredBookings = bookings.filter(
    (b) =>
      (b.user.toLowerCase().includes(search.toLowerCase()) ||
        b.id.toLowerCase().includes(search.toLowerCase())) &&
      (status === "All" || b.status === status)
  );

  return (
    <div className="container mt-4">
      <h3 className="fw-bold">View Bookings</h3>
      <p className="text-muted">Manage and view all booking records</p>

      <BookingFilters
        onSearch={setSearch}
        onStatusChange={setStatus}
      />

      <BookingTable bookings={filteredBookings} />
    </div>
  );
};

export default ViewBookings;
