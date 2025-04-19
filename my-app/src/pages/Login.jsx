import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = res.data;
  
      if (!user?.role) {
        throw new Error("User role not found in response.");
      }
  
      // Save token and role if needed
      // localStorage.setItem('token', token);
      // localStorage.setItem('role', user.role);
  
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.message || err.message || 'Login failed. Please try again.');
    }
  };
  

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Welcome Back to EcoCycle</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p className="switch-link">
          New here? <a href="/signup">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
