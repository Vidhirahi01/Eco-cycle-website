import React, { useEffect, useState } from 'react';
import './PickupRequests.css';
import { useNavigate } from 'react-router-dom';

const PickupRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch pickup requests - replace with actual API call
    const dummyData = [
      { id: 1, date: '2025-04-14', status: 'Pending' },
      { id: 2, date: '2025-04-10', status: 'In Process' },
      { id: 3, date: '2025-04-05', status: 'Recycled' }
    ];
    setRequests(dummyData);
  }, []);

  return (
    <div className="pickup-requests">
      <header>
        <h2>My Pickup Requests</h2>
        <button onClick={() => navigate(-1)}>Back</button>
      </header>

      <div className="request-list">
        {requests.length > 0 ? (
          requests.map(req => (
            <div key={req.id} className={`request-box ${req.status.toLowerCase()}`}>
              <p><strong>Request ID:</strong> {req.id}</p>
              <p><strong>Date:</strong> {req.date}</p>
              <p><strong>Status:</strong> {req.status}</p>
            </div>
          ))
        ) : (
          <p className="no-data">No pickup requests found.</p>
        )}
      </div>
    </div>
  );
};

export default PickupRequests;
