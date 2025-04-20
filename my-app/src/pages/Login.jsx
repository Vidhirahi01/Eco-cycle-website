import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: formData.email,
        password: formData.password
      };

      // Login request
      const res = await axios.post('http://localhost:5000/api/auth/login', payload);
      const token = res.data.token;
      localStorage.setItem('token', token);

      // Fetch profile
      const profileRes = await axios.get('http://localhost:5000/api/Profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = profileRes.data;
      setUser(userData); // send user to App

      alert('Login successful!');

      // Redirect based on role
      if (userData.role === 'admin') {
        navigate('/admin');
      } else if (userData.role === 'recycler') {
        navigate('/recycler-panel');
      } else {
        navigate('/');
      }

    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.message || 'Login failed.');
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
