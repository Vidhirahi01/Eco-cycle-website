import React, { useEffect, useState } from 'react';
import './RecyclerPanel.css';
import axios from 'axios';

const RecyclerPanel = () => {
  const [assignedPickups, setAssignedPickups] = useState([]);

  useEffect(() => {
    fetchAssigned();
  }, []);

  const fetchAssigned = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/pickups/assigned', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignedPickups(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (pickupId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/pickups/${pickupId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Status updated!');
      fetchAssigned();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="recycler-panel">
      <h2>Assigned Pickups</h2>
      {assignedPickups.length === 0 ? (
        <p>No pickups assigned yet.</p>
      ) : (
        <div className="pickup-list">
          {assignedPickups.map(p => (
            <div key={p._id} className="pickup-card">
              <p><strong>Location:</strong> {p.location}</p>
              <p><strong>Status:</strong> {p.status}</p>
              <select
                onChange={(e) => updateStatus(p._id, e.target.value)}
                defaultValue={p.status}
              >
                <option value="Pending">Pending</option>
                <option value="In Process">In Process</option>
                <option value="Recycled">Recycled</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecyclerPanel;
