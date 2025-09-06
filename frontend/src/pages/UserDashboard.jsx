import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const navigate = useNavigate();

  const handleSave = () => {
    // In a real app, you'd make an API call to update user info
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <button onClick={() => navigate('/')} className="back-btn">← Back</button>
          <h1>🌱 EcoFinds</h1>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="user-profile">
          <div className="profile-image">
            <div className="avatar">👤</div>
          </div>
          
          <div className="profile-info">
            <h2>User Dashboard</h2>
            
            <div className="form-group">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <p>{user?.email}</p>
              )}
            </div>

            <div className="form-group">
              <label>Username</label>
              {isEditing ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                <p>{user?.username || 'Not set'}</p>
              )}
            </div>

            <div className="form-group">
              <label>Member Since</label>
              <p>{new Date().toLocaleDateString()}</p>
            </div>

            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="save-btn">Save</button>
                  <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="edit-btn">Edit Profile</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
