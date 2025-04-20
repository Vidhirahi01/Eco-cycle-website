import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For API calls
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPickups: 0,
    pending: 0,
    completed: 0
  });
  const [products, setProducts] = useState([]);
  const [pickupHistory, setPickupHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState('products'); // Manage which tab is visible

  useEffect(() => {
    setStats({ totalPickups: 12, pending: 3, completed: 9 });

    axios.get(`http://localhost:5000/api/products?userId=${user._id}`).then(response => {
      setProducts(response.data);
    });

    axios.get(`http://localhost:5000/api/pickups/history?userId=${user._id}`).then(response => {
      setPickupHistory(response.data);
    });
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleTabSwitch = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="dashboard">
      <header>
        <h2>Welcome, {user?.name || 'User'} 👋</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <section className="stats">
        <div className="stat-box">
          <h4>Total Pickups</h4>
          <p>{stats.totalPickups}</p>
        </div>
        <div className="stat-box">
          <h4>Pending Requests</h4>
          <p>{stats.pending}</p>
        </div>
        <div className="stat-box">
          <h4>Completed</h4>
          <p>{stats.completed}</p>
        </div>
      </section>

      <nav className="dashboard-nav">
        <button onClick={() => navigate('/upload')}>Upload Product</button>
        <button onClick={() => navigate('/pickups')}>Pickup Requests</button>
        <button onClick={() => navigate('/profile')}>My Profile</button>
        {user?.role === 'admin' && (
          <button onClick={() => navigate('/admin')}>Admin Panel</button>
        )}
      </nav>

      {/* Tab Navigation */}
      <div className="tabs">
        <button onClick={() => handleTabSwitch('products')} className={selectedTab === 'products' ? 'active' : ''}>
          All Products
        </button>
        <button onClick={() => handleTabSwitch('history')} className={selectedTab === 'history' ? 'active' : ''}>
          Pickup History
        </button>
      </div>

      {/* Product List Section */}
      {selectedTab === 'products' && (
        <div className="products-list">
          <h2>All Products</h2>
          <input type="text" placeholder="Search Products..." className="search-input" />
          <select className="status-filter">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-process">In Process</option>
            <option value="recycled">Recycled</option>
          </select>
          <ul className="product-items">
            {products.map((product) => (
              <li key={product._id} className="product-item">
                <h3>{product.name}</h3>
                <p>Status: {product.status}</p>
                <button className="btn">View Details</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pickup History Section */}
      {selectedTab === 'history' && (
        <div className="pickup-history">
          <h2>Pickup History</h2>
          <input type="date" className="date-filter" />
          <select className="status-filter">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <ul className="pickup-items">
            {pickupHistory.map((pickup) => (
              <li key={pickup._id} className="pickup-item">
                <p>Product: {pickup.productName}</p>
                <p>Status: {pickup.status}</p>
                <p>Date: {new Date(pickup.date).toLocaleDateString()}</p>
                <p>Eco Points: {pickup.ecoPoints}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
