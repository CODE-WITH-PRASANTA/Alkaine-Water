import React, { useState } from 'react';
import './AlkaMyProfile.css';

const AlkaMyProfile = () => {
  // State for form fields
  const [adminName, setAdminName] = useState('Admin');
  const [email, setEmail] = useState('admin@pureflow.com');
  const [profilePhoto, setProfilePhoto] = useState(
    'https://via.placeholder.com/150/003366/FFFFFF?text=PureFlow'
  );

  // Status message state
  const [message, setMessage] = useState({ text: '', type: '' });

  // Handle Image Upload/Change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePhoto(imageUrl);
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!adminName.trim() || !email.trim()) {
      setMessage({ text: 'Please fill out all fields.', type: 'error' });
      return;
    }

    setMessage({ text: 'Profile updated successfully!', type: 'success' });

    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };

  return (
    <div className="AlkaMyProfile-fullscreen-page">
      {/* Top Banner Header */}
      <div className="AlkaMyProfile-banner">
        <div className="AlkaMyProfile-header-badge">
          <svg
            className="AlkaMyProfile-header-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>Account Settings</span>
        </div>
      </div>

      {/* Main Content Area filling full width */}
      <div className="AlkaMyProfile-content-area">
        {/* Profile Avatar & Info Header */}
        <div className="AlkaMyProfile-photo-section">
          <div className="AlkaMyProfile-photo-wrapper">
            <img
              src={profilePhoto}
              alt="Profile Avatar"
              className="AlkaMyProfile-img"
            />
            <label htmlFor="photo-upload" className="AlkaMyProfile-edit-photo-btn" title="Change Photo">
              <svg
                className="AlkaMyProfile-edit-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </label>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              onChange={handlePhotoChange}
              className="AlkaMyProfile-hidden-file-input"
            />
          </div>
          <h1 className="AlkaMyProfile-title">Profile Settings</h1>
          <p className="AlkaMyProfile-subtitle">Manage your personal details and account information</p>
        </div>

        {/* Success/Error Alert */}
        {message.text && (
          <div className={`AlkaMyProfile-alert-message AlkaMyProfile-alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="AlkaMyProfile-form">
          {/* Form Input Fields Grid */}
          <div className="AlkaMyProfile-grid">
            <div className="AlkaMyProfile-form-group">
              <label htmlFor="adminName" className="AlkaMyProfile-field-label">
                Admin Name
              </label>
              <input
                type="text"
                id="adminName"
                className="AlkaMyProfile-form-input"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Enter admin name"
                required
              />
            </div>

            <div className="AlkaMyProfile-form-group">
              <label htmlFor="email" className="AlkaMyProfile-field-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="AlkaMyProfile-form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="AlkaMyProfile-button-wrapper">
            <button type="submit" className="AlkaMyProfile-update-btn">
              <svg
                className="AlkaMyProfile-btn-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlkaMyProfile;