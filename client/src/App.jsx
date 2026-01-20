import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Payments from './pages/Payments/Payments';
import Login from './pages/Login/Login';
import Support from './pages/Support/Support';


import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Announcements from './pages/Announcements/Announcements';
import Dashboard from './pages/Dashboard/Dashboard';
import BookRoom from './pages/BookRoom/BookRoom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* <Navbar /> */}

        <Routes>
          {/* Default route */}
          <Route
            path='/'
            element={<Navigate to='/home/dashboard' />}
          />

          {/* Login Register Routes */}
          <Route
            path='login'
            element={<Login />}
          />
          <Route
            path='home'
            //element={user ? <Home /> : <Navigate to='/login' />}
            element={<Home />}
          >
            {/* Dashboard */}
            <Route path="dashboard" element={<Dashboard />} />

            {/* Room Announcements */}
            <Route path="announcements" element={<Announcements />} />

            {/*Room Booking  */}
            <Route path="rooms" element={<BookRoom />} />

            {/* Payments */}
            <Route path="payment" element={<Payments />} />

            {/* Users */}
            <Route path="profile" element={<Profile />} />

            {/* Support */}
            <Route path="support" element={<Support />} />


          </Route>
        </Routes>
        {/* used to show the toasts */}
        <ToastContainer />

      </div>
    </>
  )
}

export default App
