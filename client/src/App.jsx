import './App.css'

import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";

//Pages
import Dashboard from './pages/Dashboard/Dashboard'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import AddRoom from './pages/RoomManagement/AddRoom'
import UpdateRoom from './pages/RoomManagement/UpdateRoom'
import AllocateRoom from './pages/Bookings/AllocateRoom'
import ViewBookings from './pages/Bookings/ViewBookings'
import DuePayments from './pages/Payments/DuePayments'
import ViewPayments from './pages/Payments/ViewPayments'
import ResolveIssue from './pages/Support/ResolveIssue'
import VerifyKYC from './pages/UserManagement/VerifyKYC'


function App() {
  return (
    <div>

          <Routes>
            {/* Default route */}
            <Route
              path='/'
              element={<Navigate to='/login' />}
            />

            {/* Login Register Routes */}
            <Route
              path='login'
              element={<Login />}
            />
            <Route
              path='register'
              element={<Register />}
            />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard/>} />

             {/* Room Management */}
            <Route path="/rooms/add" element={<AddRoom />} />
            <Route path="/rooms/update" element={<UpdateRoom />} />
            
            {/* Bookings */}
            <Route path="/bookings/allocate" element={<AllocateRoom />} />
            <Route path="/bookings/view" element={<ViewBookings />} />

            {/* Payments */}
            <Route path="/payments/due" element={<DuePayments />} />
            <Route path="/payments/view" element={<ViewPayments />} />

            {/* Support */}
            <Route path="/support/resolve" element={<ResolveIssue/>} />

            {/* Users */}
            <Route path="/users/verify" element={<VerifyKYC />} />

          </Routes>
    
    

      {/* used to show the toasts */}
      <ToastContainer />
    </div>
  )
}

export default App
