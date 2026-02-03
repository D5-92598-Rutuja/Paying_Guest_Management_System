import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Home, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from '../../service/axiosInstance';

function BillPaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const billId = searchParams.get('billId'); // 👈 Get billId from URL
  
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      setMessage('Invalid session.');
      return;
    }

    const recordPayment = async () => {
      try {
        // Send BOTH sessionId and billId to backend
        await axios.post('client/recurring/record-bill-payment', { 
            sessionId,
            billId  // 👈 Explicitly passing billId helps backend
        });
        
        setStatus('success');
        setMessage('Your bill payment has been successfully recorded!');
        toast.success('Payment verified!');
      } catch (error) {
        console.error('Payment record error:', error);
        if (error.response?.status === 409 || error.response?.data?.includes('already processed')) {
            setStatus('success');
            setMessage('Payment already recorded.');
        } else {
            setStatus('error');
            setMessage('Verification failed. Please contact support.');
        }
      }
    };

    recordPayment();
  }, [sessionId, billId]); // Depend on both

  // ... (Rest of UI same as before) ...
  // Render loading/success/error screens
  if (status === 'processing') return <div className="text-center p-5">Processing...</div>;

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      {/* {status === 'success' && <Confetti recycle={false} numberOfPieces={300} />} */}
      <div className="card shadow p-5 text-center" style={{maxWidth: 500}}>
        {status === 'success' ? <CheckCircle size={64} className="text-success mx-auto mb-3"/> 
                              : <AlertCircle size={64} className="text-danger mx-auto mb-3"/>}
        
        <h2>{status === 'success' ? 'Payment Successful!' : 'Failed'}</h2>
        <p className="text-muted mb-4">{message}</p>
        
        {billId && <p className="small text-muted">Bill ID: #{billId}</p>}

        <button onClick={() => navigate('/home/payment')} className="btn btn-dark w-100">
          View My Payments
        </button>
      </div>
    </div>
  );
}

export default BillPaymentSuccess;
