import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Payments from './pages/Payments/Payments';
import Login from './pages/Login/Login';
import Support from './pages/Support/Support';
import '@fortawesome/fontawesome-free/css/all.min.css';


import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Announcements from './pages/Announcements/Announcements';
import Dashboard from './pages/Dashboard/Dashboard';
import BookRoom from './pages/BookRoom/BookRoom';
import RoomDetailsPage from './pages/BookRoom/RoomDetailsPage';
import PaymentSuccess from './pages/Payments/PaymentSuccess';
import BillPaymentSuccess from './pages/Payments/BillPaymentSuccess';
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ProtectedRoute from './components/ProtectedRoute';
import Feedback from "./pages/Feedback/Feedback";


function App() {

  return (
    <>
      <div>
        {/* <Navbar /> */}

        <Routes>
          {/* Default route */}
          <Route
            path='/'
            element={<Navigate to='/dashboard' />}
          />

          {/* Login Register Routes */}
          <Route
            path='/login'
            element={<Login />}
          />
          <Route path="rooms" element={<BookRoom />} />


          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* USER Protected Routes */}

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            {/* Room Announcements */}
            <Route path="announcements" element={<Announcements />} />

            {/*Room Booking  */}
            <Route path="room/:type" element={<RoomDetailsPage />} />      {/* NEW: Booking details */}
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="bill-payment-success" element={<BillPaymentSuccess />} />


            {/* Payments */}
            <Route path="payment" element={<Payments />} />

            {/* Users */}
            <Route path="profile" element={<Profile />} />

            {/* Support */}
            <Route path="support" element={<Support />} />

            <Route path="feedback" element={<Feedback />} />


          </Route>

          
            <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* 404 */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>



        {/* used to show the toasts */}
        <ToastContainer />


      </div>
    </>
  )
}

export default App
