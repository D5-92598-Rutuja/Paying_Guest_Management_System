import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../service/axiosInstance';

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        if (sessionId) {
            verifyPayment(sessionId);
        } else {
            navigate('/home/rooms');
        }
    }, [sessionId, navigate]);

    const verifyPayment = async (sessionId) => {
    try {
        const response = await axios.post('client/payments/record-advance-payment', { sessionId });

        if (response.status >= 200 && response.status < 300) {
            console.log('Advance payment recorded successfully');
        } else {
            console.error('Payment verification failed');
        }
    } catch (error) {
        console.error('Payment verification failed:', error);
    } finally {
        setLoading(false);
    }
};


    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-success" style={{ width: '3rem', height: '3rem' }}></div>
            </div>
        );
    }

    return (
        <div className="container text-center py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {/* Success Icon */}
                    <div className="mb-4">
                        <i className="bi bi-check-circle-fill display-1 text-success"></i>
                    </div>

                    {/* Success Message */}
                    <h1 className="display-4 fw-bold mb-3">Payment Successful!</h1>
                    <p className="lead text-muted mb-5">
                        Your room booking has been confirmed. We will be in touch with you! 
                    </p>


                    {/* Action Buttons */}
                    <div className="d-grid gap-3 col-lg-6 mx-auto">
                        <button
                            className="btn btn-primary btn-lg py-3"
                            onClick={() => navigate('/home/profile')}
                        >
                            <i className="bi bi-person-check me-2"></i>
                            Verify Your KYC
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate('/dashboard')}
                        >
                            <i className="bi bi-house-door me-2"></i>
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
