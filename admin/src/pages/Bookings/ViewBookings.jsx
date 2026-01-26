import { useEffect, useState } from "react";
import axios from "axios";
import BookingFilters from "../../components/Bookings/BookingFilters";
import BookingTable from "../../components/Bookings/BookingTable";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  //Fetch from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/bookings")
      .then((res) => {
        // Map backend data to UI format
        const mapped = res.data.map((b) => ({
          id: "BK" + b.bookingId,
          bookingId: b.bookingId, 
          room: b.roomType + " Sharing",
          user: b.userName,
          join: b.joinDate,
          end: b.endDate,
          status: b.status,
        }));

        setBookings(mapped);
      })
      .catch((err) => console.error(err));
  }, []);

  // Dynamic filtering
  const filteredBookings = bookings.filter((b) => {
  const user = b.userName ? b.userName.toLowerCase() : "";
  const id = b.bookingId ? String(b.bookingId) : "";

  const matchesSearch =
    user.includes(search.toLowerCase()) ||
    id.includes(search);

  let backendStatus = "";

  if (status === "Active") backendStatus = "APPROVED";
  else if (status === "Pending") backendStatus = "PENDING";
  else if (status === "Completed") backendStatus = "COMPLETED";

  const matchesStatus =
    status === "All" || b.status === backendStatus;

  return matchesSearch && matchesStatus;
});


  return (
    <div className="container mt-4">
      <h3 className="fw-bold">View Bookings</h3>
      <p className="text-muted">Manage and view all booking records</p>

      <BookingFilters onSearch={setSearch} onStatusChange={setStatus} />

      <BookingTable bookings={filteredBookings} />
    </div>
  );
};

export default ViewBookings;
