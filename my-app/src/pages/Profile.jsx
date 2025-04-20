import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  });

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          password: ''
        });
      } catch (err) {
        console.error('Failed to load profile:', err);
        alert('Error loading profile');
      }
    };

    fetchProfile();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update profile API call
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/user/update', {
        name: formData.name,
        password: formData.password
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Profile updated successfully!');
      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-info">
        <label>Name:</label>
        {editMode ? (
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        ) : (
          <p>{formData.name}</p>
        )}

        <label>Email:</label>
        <p>{formData.email}</p>

        <label>Role:</label>
        <p>{formData.role}</p>

        {editMode && (
          <>
            <label>New Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep unchanged"
            />
          </>
        )}
      </div>

      <div className="profile-actions">
        {editMode ? (
          <>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
