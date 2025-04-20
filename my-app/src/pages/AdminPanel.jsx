import React, { useEffect, useState } from 'react';
import './AdminPanel.css';
import axios from 'axios';

const AdminPanel = () => {
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    fetchPickups();
  }, []);

  const fetchPickups = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/pickups', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPickups(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const assignRecycler = async (pickupId, recyclerId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/pickups/${pickupId}/assign`, { recyclerId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Assigned successfully!');
      fetchPickups();
    } catch (err) {
      alert('Assignment failed!');
      console.error(err);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Pickup Requests</h2>
      {pickups.length === 0 ? (
        <p>No pickup requests available.</p>
      ) : (
        <div className="pickup-list">
          {pickups.map(p => (
            <div key={p._id} className="pickup-card">
              <p><strong>User:</strong> {p.user?.name || 'N/A'}</p>
              <p><strong>Location:</strong> {p.location}</p>
              <p><strong>Status:</strong> {p.status}</p>
              <p><strong>Assigned Recycler:</strong> {p.recycler?.name || 'None'}</p>
              <input
                type="text"
                placeholder="Recycler ID"
                onBlur={(e) => assignRecycler(p._id, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
