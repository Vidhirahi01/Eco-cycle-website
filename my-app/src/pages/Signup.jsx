import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, role };
      const res = await axios.post('http://localhost:5000/api/auth/signup', payload);

      alert('Signup successful!');

      // Optional: Redirect to login after successful signup
      navigate('/login');

    } catch (err) {
      console.error('Signup error:', err);
      alert(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Create EcoCycle Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="auth-select"
            required
          >
            <option value="user">User</option>
            <option value="recycler">Recycler</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
        <p className="switch-link">
          Already registered? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
