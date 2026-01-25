import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Announcements from "./pages/Announcements/Announcements";
import BookRoom from "./pages/BookRoom/BookRoom";
import Payments from "./pages/Payments/Payments";
import Profile from "./pages/Profile/Profile";
import Support from "./pages/Support/Support";

import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* USER Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="rooms" element={<BookRoom />} />
          <Route path="payment" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
          <Route path="support" element={<Support />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
