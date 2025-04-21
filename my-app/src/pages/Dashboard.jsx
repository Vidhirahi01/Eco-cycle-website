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
  const [selectedTab, setSelectedTab] = useState('products'); // Manage which tab is visible
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Mock stats data
    setStats({ totalPickups: 12, pending: 3, completed: 9 });

    // Fetch products
    axios.get(`http://localhost:5000/api/products?userId=${user._id}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.warn("Expected an array but got:", response.data);
          setProducts([]); // Fallback to an empty array if not an array
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]); // Fallback to an empty array
      });
  }, [user, statusFilter]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleTabSwitch = (tab) => {
    setSelectedTab(tab);
  };

  // Filtered Products based on Search and Status
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
      </div>

      {/* Product List Section */}
      {selectedTab === 'products' && (
        <div className="products-list">
          <h2>All Products</h2>
          <input 
            type="text" 
            placeholder="Search Products..." 
            className="search-input" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <select 
            className="status-filter" 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-process">In Process</option>
            <option value="recycled">Recycled</option>
          </select>

          <ul className="product-items">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <li key={product._id} className="product-item">
                  <h3>{product.name}</h3>
                  <p>Status: {product.status}</p>
                  <button className="btn">View Details</button>
                </li>
              ))
            ) : (
              <p>No products found matching your criteria.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
