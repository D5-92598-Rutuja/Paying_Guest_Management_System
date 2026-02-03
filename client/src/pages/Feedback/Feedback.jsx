import React, { useState } from "react";
import axios from "../../service/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Feedback.css";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.warn("Please select a rating");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/client/feedback", {
        rating,
        comment,
      });

      toast.success("Thank you for your feedback!");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-card">
        <h2>Feedback</h2>
        <p>Help us improve your PG experience</p>

        {/* Rating */}
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "star active" : "star"}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment */}
        <textarea
          placeholder="Write your feedback here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Submit */}
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default Feedback;
