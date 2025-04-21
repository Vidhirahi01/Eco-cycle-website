import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import UploadProduct from './pages/UploadProduct';
import PickupRequests from './pages/PickupRequests';
import RecyclerPanel from './pages/RecyclerPanel';
import LandingPage from './pages/LandingPage';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('userData');

    if (token) {
      // Try to load from localStorage immediately
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing stored user data:", e);
        }
      }

      // Verify with backend (optional but recommended)
      axios
        .get('http://localhost:5000/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const userData = res.data.user;
          setUser(userData);
          localStorage.setItem('userData', JSON.stringify(userData));
        })
        .catch((err) => {
          console.error("Token invalid or expired:", err);
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!user ? <Signup setUser={setUser} /> : <Navigate to="/dashboard" />} />

          {/* Common Protected Routes */}
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
          <Route path="/upload" element={user ? <UploadProduct user={user} /> : <Navigate to="/login" />} />
          <Route path="/pickups" element={user ? <PickupRequests user={user} /> : <Navigate to="/login" />} />

          {/* Role-Based Routes */}
          <Route path="/admin" element={user?.role === 'admin' ? <AdminPanel user={user} /> : <Navigate to={user ? "/dashboard" : "/login"} />} />
          <Route path="/recycler-panel" element={user?.role === 'recycler' ? <RecyclerPanel user={user} /> : <Navigate to={user ? "/dashboard" : "/login"} />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
``
