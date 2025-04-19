// LandingPage.jsx

import React from 'react';
import Navbar from '../components/Navbar';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />

      <section id='home' className="hero glass-container">
        <h1 className="hero-title">
          Recycle Smart. Earn EcoPoints. Save the Planet.
        </h1>
        <p className="hero-subtitle">
          Join us in making the world cleaner by recycling and earning rewards!
        </p>
        <button className="cta-button">Get Started</button>
      </section>

      <section id='features' className="features">
       
        
          <div className="feature-card">
            ♻️ <h3>Easy Recycling</h3>
            <p>Schedule pickups for your recyclables effortlessly.</p>
          </div>
          <div className="feature-card">
            🌍 <h3>EcoPoints</h3>
            <p>Earn EcoPoints for each successful pickup and redeem rewards.</p>
          </div>
          <div className="feature-card">
            📊 <h3>Track Impact</h3>
            <p>See how much waste you’ve recycled and CO₂ saved.</p>
        </div>
      </section>

      <div id="how-it-works" className="how-it-works">
  <h2>How It Works</h2>
  <div className="hiw-steps">
    <div className="hiw-step">
      <div className="hiw-icon">🗑️</div>
      <h3>Step 1</h3>
      <p>Collect recyclable items and prepare them for pickup.</p>
    </div>
    <div className="hiw-step">
      <div className="hiw-icon">📍</div>
      <h3>Step 2</h3>
      <p>Schedule a pickup with your location and convenient time.</p>
    </div>
    <div className="hiw-step">
      <div className="hiw-icon">♻️</div>
      <h3>Step 3</h3>
      <p>Our recycler collects your items and verifies the materials.</p>
    </div>
    <div className="hiw-step">
      <div className="hiw-icon">🌱</div>
      <h3>Step 4</h3>
      <p>Earn EcoPoints and track your environmental impact!</p>
    </div>
  </div>
</div>


<div id="about" className="about-us-hero">
  <div className="about-glass-card">
    <div className="about-text">
      <h2>Who We Are</h2>
      <p>
        At <strong>EcoCycle</strong>, we believe every item recycled is a step toward
        a cleaner planet. We're not just building an app—we're building a
        sustainable movement powered by you.
      </p>
      <p>
        From doorstep pickups to EcoPoints, we make recycling effortless,
        traceable, and rewarding. Because recycling should feel as good as it does
        for the planet.
      </p>
      <button className="cta-btn">Join the Movement</button>
    </div>
    <div className="about-image-side">
      <img src="sustain.png" alt="Eco Mission"  className="about-image"/>
    </div>
  </div>
</div>

<footer className="glass-footer">
      <div className="footer-content">
        <div className="footer-logo">♻️ EcoCycle</div>
       
        <p className="footer-copy">&copy; 2025 EcoCycle. All rights reserved.</p>
      </div>
    </footer>
    </div>

  );
};

 
export default LandingPage;
