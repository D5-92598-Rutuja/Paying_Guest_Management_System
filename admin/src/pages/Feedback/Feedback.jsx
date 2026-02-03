import { useEffect, useState } from "react";
import axios from "../../service/axiosInstance";  

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      

  //Define function BEFORE useEffect
  const getAllFeedback = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/admin/feedback");
      setFeedbacks(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load Feedback list");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFeedback();  
  }, []);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h3>User Feedback</h3>
      <table className="table table-bordered table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>User Name</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(f => (
            <tr key={f.id}>
              <td>{f.userName}</td>
              <td>{"⭐".repeat(f.rating)}</td>
              <td>{f.comment}</td>
              <td>{new Date(f.createdOn).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Feedback;
