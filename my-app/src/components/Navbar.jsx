import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="Navbar">
      <div className="logo">EcoCycle</div>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <a href="#home">Home</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#features">Features</a>
        <a href="#about">About Us</a>
      </div>
      <div className="auth-buttons">
        <button className="login-btn" onClick={() => navigate('/login')}>Log In</button>
        <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
