import './App.css'

import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";

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
import Announcements from './pages/Announcements/Announcements'
import Home from './pages/Home/Home';
//import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
//import AuthProvider from './providers/AuthProvider'


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
            <Route
              path='home'
              //element={user ? <Home /> : <Navigate to='/login' />}
              element={<Home/>}
            >

            {/* Dashboard */}
<<<<<<< HEAD
            <Route path="/dashboard" element={<Dashboard/>} />
           
=======
            <Route path="Dashboard" element={
              <Dashboard/>} 
              />
>>>>>>> 60206ed9d0834d0eaf0c663e3f80230864ec0d22

             {/* Room Management */}
            <Route path="rooms-add" element={<AddRoom />} />
            <Route path="rooms-update" element={<UpdateRoom />} />
            
            {/* Bookings  */}
            <Route path="room-allocate" element={<AllocateRoom />} />
            <Route path="bookings-view" element={<ViewBookings />} />

            {/* Payments */}
            <Route path="payments-due" element={<DuePayments />} />
            <Route path="payments-view" element={<ViewPayments />} />

            {/* Support */}
            <Route path="support-resolve" element={<ResolveIssue/>} />

            {/* Users */}
            <Route path="users-verify" element={<VerifyKYC />} />
            <Route path="announcements" element={<Announcements />} />
          </Route>
          </Routes>
            {/* used to show the toasts */}
      <ToastContainer />
    </div>
  )
}

export default App
