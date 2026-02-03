import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {CheckCircle, Home, ShieldCheck} from "lucide-react";
import { toast } from 'react-toastify';
import axios from "../../service/axiosInstance";
function Payments() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [unpaidBills, setUnpaidBills] = useState([]);
  const [securityDeposit, setSecurityDeposit] = useState(null);
  const [loading, setLoading] = useState(true);
  const bookingId = searchParams.get('bookingId') || '9';

  useEffect(() => {
    if (bookingId) {
      fetchData();
    }
  }, [bookingId]);

  const getMonthName = (month) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

  const fetchData = async () => {
    try {
      // API FOR FETCHING RECURRING BIILS
      // const { data: bills } = await axios.get(`/client/recurring/bills?bookingId=${bookingId}`);
      const { data: bills } = await axios.get(`/client/recurring/bills`);

      setUnpaidBills(bills);

      //Harcoded for now
      setSecurityDeposit({
        paid: true,
        amount: 15000,
        date: "2026-01-15"
      });
    } catch (error) {
      console.error('Payment data error:', error.response?.data || error.message);
      toast.error("Failed to load payment data");
    } finally {
      setLoading(false);
    }
  };




  const payBill = async (billId) => {
    try {
      const { data: { url } } = await axios.post(`client/recurring/pay-bill/${billId}`);

      console.log('Stripe URL:', url); 
      window.location.href = url;       // Stripe redirect
    } catch (error) {
      console.error('Payment error:', error.response?.data || error.message);
      toast.error("Payment initiation failed");
    }
  };


  const stats = {
    unpaidCount: unpaidBills.length,
    totalDue: unpaidBills.reduce((sum, b) => sum + b.amount, 0),
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} />
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <p className="lead text-muted">Manage your rent & view payment history</p>
        {/* <small className="text-muted">Booking #{bookingId}</small> */}
      </div>




      {/* Stats */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card shadow-sm h-100 text-center p-4">
            <div className="h3 fw-bold text-warning mb-2">{stats.unpaidCount}</div>
            <p className="text-muted mb-0">Unpaid Bills</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100 text-center p-4">
            <div className="h3 fw-bold text-danger mb-2">
              ₹{stats.totalDue.toLocaleString("en-IN")}
            </div>
            <p className="text-muted mb-0">Total Due</p>
          </div>
        </div>
        {/* Security Deposit */}
        {securityDeposit?.paid && (
          <div className="col-md-4">
            <div className="card h-100 shadow-sm mb-1">
              <h5 className="text-success fw-bold mb-2 text-center">
                Security Deposit Paid
              </h5>

              <p className="text-muted mb-1">₹{securityDeposit.amount?.toLocaleString()}
                <ShieldCheck size={12} className="text-success mb-3" />
              </p>
              {/* <small className="text-success fw-semibold">{securityDeposit.date}</small> */}
            </div>

          </div>
        )}

      </div>

      {/* No Bills Celebration */}
      {unpaidBills.length === 0 ? (
        <div className="text-center py-5 my-5">
          <CheckCircle size={120} className="text-success display-1 mb-4" />
          <h1 className="display-4 fw-bold text-success mb-4">Woo-hoo! No pending payments!</h1>
          <p className="lead text-muted mb-5">
            All your rent payments are up to date. Pending payments for rent will show up here.
          </p>
          <button
            className="btn btn-primary btn-lg px-5 py-3"
            onClick={() => navigate('/home/dashboard')}
          >
            <Home size={20} className="me-2" />
            Take Me Back Home
          </button>
        </div>
      ) : (
        /* Compact Bills Cards */
        <div className="d-flex flex-column gap-3">
          {unpaidBills.map((bill) => (
            <div key={bill.id} className="card p-1 shadow-sm border-0">
              <div className="card-body p-2">
                <div className="row align-items-center gy-3">

                  {/* 1. Month & ID */}
                  <div className="col-12 col-md-4">
                    <div className="d-flex align-items-center">
                      {/* Calendar Icon Box */}
                      <div className="bg-light rounded p-2 me-3 text-center" style={{ minWidth: '60px' }}>
                        <div className="fw-bold mb-0">{getMonthName(bill.month)}</div>
                        <span className="fw-bold">{bill.year.toString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Amount */}
                  <div className="col-6 col-md-3">
                    <small className="text-muted d-block text-uppercase" style={{ fontSize: '0.7rem' }}>Amount</small>
                    <div className="h5 fw-bold text-dark mb-0">
                      ₹{bill.amount.toLocaleString("en-IN")}
                    </div>
                  </div>

                  {/* 3. Due Date */}
                  <div className="col-6 col-md-3">
                    <small className="text-muted d-block text-uppercase" style={{ fontSize: '0.7rem' }}>Due Date</small>
                    <div className="fw-semibold text-danger">
                      {bill.dueDate}
                    </div>
                  </div>

                  {/* 4. Action Button */}
                  <div className="col-12 col-md-2 text-md-end">
                    <button
                      className="btn btn-warning w-100 fw-semibold shadow-sm"
                      onClick={() => payBill(bill.id)}
                    >
                      Pay Now
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>


      )}

      {/* History Coming Soon */}
      <div className="text-center mt-5 pt-5 border-top py-5">
        <h5>Payment History <span className="badge bg-secondary">Coming Soon</span></h5>
        <p className="text-muted">View all your past payments</p>
      </div>
    </div>
  );
}

export default Payments;
