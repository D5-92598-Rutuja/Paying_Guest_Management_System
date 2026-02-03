import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import './RoomDetailsPage.css';
// import axios from 'axios';
import axios from '../../service/axiosInstance';

// Load Stripe with your publishable key (get from Stripe Dashboard)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function RoomDetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [joinDate, setJoinDate] = useState('');
    const [loading, setLoading] = useState(false);
    // const [clientSecret, setClientSecret] = useState('');

    const room = location.state?.room;

    // Room configurations - keyed by room type
    const roomConfigs = {
        SINGLE: {
            amenities: [
                { icon: 'bi-door-closed', name: 'Private Room' },
                { icon: 'bi-droplet-fill', name: 'Attached Bathroom' },
                { icon: 'bi-thermometer-sun', name: 'AC Available' },
                { icon: 'bi-lamp', name: 'Study Area' },
                { icon: 'bi-door-open', name: 'Spacious Wardrobe' },
                { icon: 'bi-wifi', name: 'High Speed WiFi' },
            ],
            features: [
                'Double bed with premium mattress',
                'Study table with chair',
                'Individual locker for valuables',
                '24/7 Security & CCTV',
                'Hot & Cold water 24/7',
                'Power backup (8 hours daily)',
            ],
            extras: [
                'Laundry twice a week (included)',
                'Monthly housekeeping',
                'Electricity charges based on meter reading',
                'Optional food plan available',
            ],
            description: 'Premium private room with all modern amenities for maximum comfort and privacy.',
            depositMultiplier: 1.5 // Deposit = 1.5x price
        },
        DOUBLE: {
            amenities: [
                { icon: 'bi-people-fill', name: '2-Bed Shared' },
                { icon: 'bi-droplet-fill', name: 'Attached Bathroom' },
                { icon: 'bi-fan', name: 'AC/Fan Available' },
                { icon: 'bi-lamp', name: 'Study Space' },
                { icon: 'bi-door-open', name: 'Storage Locker' },
                { icon: 'bi-wifi', name: 'Shared WiFi' },
            ],
            features: [
                'Individual beds with quality mattress',
                'Shared study table',
                'Individual locker',
                '24/7 Security & CCTV',
                'Hot & Cold water',
                'Power backup available',
            ],
            extras: [
                'Laundry twice a week',
                'Common area access',
                'Electricity based on usage',
                'Food packages available',
            ],
            description: 'Affordable shared accommodation with good amenities. Perfect for budget-conscious professionals.',
            depositMultiplier: 1.5
        },
        TRIPLE: {
            amenities: [
                { icon: 'bi-people-fill', name: '3-Bed Shared' },
                { icon: 'bi-droplet-fill', name: 'Attached Bathroom' },
                { icon: 'bi-fan', name: 'Fan Cooling' },
                { icon: 'bi-lamp', name: 'Common Study' },
                { icon: 'bi-door-open', name: 'Locker Storage' },
                { icon: 'bi-wifi', name: 'Common WiFi' },
            ],
            features: [
                'Individual beds with mattress',
                'Common study table',
                'Individual locker',
                '24/7 Security & CCTV',
                'Hot water availability',
                'Basic power backup',
            ],
            extras: [
                'Laundry once a week',
                'Common living area',
                'Electricity charges applicable',
                'Food plan available',
            ],
            description: 'Budget-friendly option with essential amenities. Great for making friends and community living.',
            depositMultiplier: 1.5
        }
    };

    // Get config based on room type
    const config = useMemo(() => {
        if (!room) return null;
        return roomConfigs[room.type] || roomConfigs.SINGLE;
    }, [room]);

    if (!room || !config) {
        return (
            <div className="container py-5 text-center">
                <p className="text-muted">Room information not found</p>
                <button
                    onClick={() => navigate('/rooms')}
                    className="btn btn-primary"
                >
                    ← Back to Rooms
                </button>
            </div>
        );
    }


    const calculateProRatedPrice = (roomPrice, joinDateStr) => {
        if (!joinDateStr) return roomPrice;

        const joinDate = new Date(joinDateStr);
        const year = joinDate.getFullYear();
        const month = joinDate.getMonth(); // 0-11
        const day = joinDate.getDate();

        // First day of joinDate's month
        const monthStart = new Date(year, month, 1);
        // Last day of joinDate's month  
        const monthEnd = new Date(year, month + 1, 0);

        const daysInMonth = monthEnd.getDate();
        const daysJoined = Math.max(1, monthEnd.getDate() - day + 1);

        const proRatedPrice = (roomPrice * daysJoined) / daysInMonth;
        console.log(`Join: ${joinDateStr}, Days joined: ${daysJoined}/${daysInMonth}`);

        return Math.round(proRatedPrice);
    };


    // Usage
    const price = calculateProRatedPrice(
        parseInt(room.price?.toString().replace(/[₹,]/g, '') || 0),
        joinDate
    );

    // Extract price from room.price (e.g., "₹12000" or "12000")
    const roomPrice = parseInt(room.price?.toString().replace(/[₹,]/g, '') || 0);
    const deposit = Math.ceil(roomPrice * config.depositMultiplier);
    const totalAmount = price + deposit;



    const handleProceedToPay = async () => {
        if (!joinDate) {
            toast.error('Please select your move-in date first');
            return;
        }

        setLoading(true);

        try {
            // console.log(room.type)
            //get from bookings (Samiksha)
            const response = await axios.post('/client/bookings', {
                roomType: room.type,
                joinDate: joinDate
            }
            );

            const bookingId = response.data; // Returns Long bookingId directly
            console.log('Booking created with ID:', bookingId);

            // const bookingId = 2;
            // 1. Create Checkout Session
            const { data } = await axios.post('/client/payments/create-checkout-session', {
                bookingId: bookingId,
                amount: price + deposit
            });

            const { url, client_secret } = data;  // Backend returns either url OR client_secret

            if (url) {
                // Stripe Checkout (hosted page)
                window.location.href = url;
            } else if (client_secret) {
                // Stripe.js Elements (embedded)
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({
                    sessionId: client_secret  // Note: sessionId, not client_secret for redirectToCheckout
                });

                if (error) {
                    toast.error(error.message);
                }
            } else {
                throw new Error('No payment URL or client_secret returned');
            }
        } catch (error) {
            console.error('Payment initiation failed:', error.response?.data || error.message);
            toast.error('Payment initiation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-light min-vh-80 py-4 room-details-container">
            <div className="container-lg">

                <div className="row g-4 relative-container">
                    {/* Left: Amenities & Features (Scrollable) */}
                    <div className="col-lg-8 left-scroll-section">
                        {/* Room Description Card */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body">
                                <h5 className="card-title text-primary mb-3">
                                    <i className="bi bi-info-circle"></i> About this Room
                                </h5>
                                <p className="text-muted small mb-0">{config.description}</p>
                            </div>
                        </div>

                        {/* Amenities Card */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white border-0 pb-0 pt-4 px-4">
                                <h5 className="mb-0">
                                    <i className="bi bi-stars text-warning"></i> Amazing Amenities
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="row g-3">
                                    {config.amenities.map((amenity, i) => (
                                        <div key={i} className="col-md-6 col-12">
                                            <div className="d-flex align-items-center gap-3 p-3 bg-white border rounded h-100">
                                                <div className="icon-box bg-light text-success rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                                    <i className={`bi ${amenity.icon} fs-5`}></i>
                                                </div>
                                                <span className="text-dark fw-medium">{amenity.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Features Card */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white border-0 pb-0 pt-4 px-4">
                                <h5 className="mb-0">
                                    <i className="bi bi-check-circle text-success"></i> Facilities Included
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="row g-2">
                                    {config.features.map((feature, i) => (
                                        <div key={i} className="col-12">
                                            <div className="d-flex gap-3 align-items-start mb-2">
                                                <i className="bi bi-check-lg text-success mt-1"></i>
                                                <span className="text-dark">{feature}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Extras Card */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white border-0 pb-0 pt-4 px-4">
                                <h5 className="mb-0">
                                    <i className="bi bi-plus-circle text-info"></i> Additional Services
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <ul className="list-group list-group-flush">
                                    {config.extras.map((extra, i) => (
                                        <li key={i} className="list-group-item px-0 border-0 d-flex gap-2">
                                            <i className="bi bi-dot fs-4 text-muted"></i>
                                            <span className="mt-1">{extra}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Space filler to ensure scrolling feel */}
                        <div style={{ height: '50px' }}></div>
                    </div>

                    {/* Right: Booking & Payment (Fixed/Sticky) */}
                    <div className="col-lg-4">
                        <div className="payment-sticky-wrapper">
                            {/* Booking Section */}
                            <div className="card border-0 shadow-md p-4">
                                <div className="card-header border-0 py-2">
                                    <h6 className="mb-0 fw-bold">
                                        {/* <i className="bi bi-calendar-check me-2"></i>  */}
                                        Confirm Move-in
                                    </h6>
                                </div>
                                <div className="card-body p-4">
                                    <div className="text-center mb-3">
                                        <h2 className="text-success fw-bold mb-0">₹{roomPrice.toLocaleString()}</h2>
                                        <small className="text-muted">per month</small>
                                    </div>

                                    {/* Move-in Date */}
                                    <div className="mb-4">
                                        <label className="form-label fw-bold small text-uppercase text-muted">
                                            Move-in Date
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control form-control-lg border-2"
                                            value={joinDate}
                                            onChange={(e) => setJoinDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>

                                    {/* Summary Box */}
                                    <div className="bg-light rounded-3 p-3 mb-4 border">
                                        <div className="d-flex justify-content-between mb-2 small">
                                            <span className="text-muted">Room Type</span>
                                            <span className="fw-bold">{room.title}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2 small">
                                            <span className="text-muted">First Month Rent</span>
                                            <span className="fw-bold">₹{price.toLocaleString()}</span>
                                        </div>

                                        <div className="d-flex justify-content-between mb-3 small">
                                            <span className="text-muted">Security Deposit</span>
                                            <span className="fw-bold">₹{deposit.toLocaleString()}</span>
                                        </div>
                                        <hr className="my-2" />
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            <span className="fw-bold text-dark">Total Due</span>
                                            <span className="h5 mb-0 text-success fw-bold">₹{totalAmount.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Pay Button */}
                                    <button
                                        disabled={!joinDate || loading}
                                        onClick={handleProceedToPay}
                                        className="btn btn-success btn-lg w-100 fw-bold py-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                                        style={{
                                            background: 'linear-gradient(135deg, #198754 0%, #157347 100%)',
                                            border: 'none',
                                            transition: 'transform 0.2s'
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-credit-card-fill"></i>
                                                PAY ₹{totalAmount.toLocaleString()}
                                            </>
                                        )}
                                    </button>

                                    {/* <div className="text-center mt-3">
                                        <small className="text-muted d-flex align-items-center justify-content-center gap-1">
                                            <i className="bi bi-shield-check text-success"></i> 
                                            100% Secure & Refundable
                                        </small>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
