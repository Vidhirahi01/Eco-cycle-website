import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, userId, role } = res.data;

      // Store token
      localStorage.setItem('token', token);

      // Build userData object
      const userData = { _id: userId, email: formData.email, role };

      // Store user in localStorage and state
      localStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);

      // Navigate based on role after a tiny delay
      setTimeout(() => {
        if (role === 'admin') navigate('/admin');
        else if (role === 'recycler') navigate('/recycler-panel');
        else navigate('/dashboard');
      }, 50); // tiny delay to ensure setUser completes
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Welcome Back to EcoCycle</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button 
            type="submit" 
            className="auth-btn" 
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="switch-link">
          New here? <a href="/signup">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
