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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/api/Profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem('token');
        });
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />

          {/* Protected Routes */}
          {user && (
            <>
              <Route path="/dashboard" element={<Dashboard user={user} />} />
              <Route path="/Profile" element={<Profile user={user} />} />
              <Route path="/upload" element={<UploadProduct />} />
              <Route path="/pickups" element={<PickupRequests />} />

              {/* Admin Only */}
              <Route
                path="/admin"
                element={user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/dashboard" />}
              />

              {/* Recycler Only */}
              <Route
                path="/recycler-panel"
                element={user?.role === 'recycler' ? <RecyclerPanel /> : <Navigate to="/dashboard" />}
              />
            </>
          )}

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
