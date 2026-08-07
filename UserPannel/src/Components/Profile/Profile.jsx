import React, { useState } from 'react';
import { 
  FiUser, 
  FiSettings, 
  FiEdit2, 
  FiLock, 
  FiMail, 
  FiBell, 
  FiDroplet, 
  FiShield, 
  FiChevronRight, 
  FiSave,
  FiX
} from 'react-icons/fi';
import './Profile.css';

const Profile = () => {
  // User profile state
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  });

  // Toggles for notifications / switches
  const [settingsToggles, setSettingsToggles] = useState({
    emailNotifications: true,
    pushNotifications: true,
    waterDeliveryAlerts: true
  });

  // Dropdown / Expanded View States
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Edit Profile Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profileData);

  // Save feedback state
  const [saveMessage, setSaveMessage] = useState('');

  // Handle Switch Toggle
  const handleToggleChange = (key) => {
    setSettingsToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Toggle Dropdowns for list items
  const handleDropdownToggle = (section) => {
    setActiveDropdown(prev => (prev === section ? null : section));
  };

  // Handle Edit Profile Save
  const handleSaveProfileModal = (e) => {
    e.preventDefault();
    setProfileData(tempProfile);
    setIsEditing(false);
    setSaveMessage('Profile details updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // Handle global "Save Changes" button
  const handleSaveChangesAll = () => {
    setSaveMessage('All account settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="profile-container">
      <div className="profile-card-wrapper">
        
        {/* Global Save Feedback Alert */}
        {saveMessage && (
          <div className="profile-save-banner">
            <span>{saveMessage}</span>
          </div>
        )}

        {/* Top Title Section */}
        <div className="profile-header-section">
          <div className="profile-title-box">
            <FiUser className="profile-header-main-icon" />
          </div>
          <h2 className="profile-main-title">Profile & Settings</h2>
        </div>

        {/* User Card Section */}
        <div className="profile-user-card">
          <div className="profile-user-info-group">
            <img 
              src={profileData.avatar} 
              alt={profileData.name} 
              className="profile-user-avatar" 
            />
            <div className="profile-user-details">
              <div className="profile-name-row">
                <h3 className="profile-user-name">{profileData.name}</h3>
                <span className="profile-badge-premium">Premium User</span>
              </div>
              <p className="profile-user-email">{profileData.email}</p>
              <p className="profile-user-phone">{profileData.phone}</p>
            </div>
          </div>
          <button 
            type="button" 
            className="profile-edit-btn"
            onClick={() => { setTempProfile(profileData); setIsEditing(true); }}
          >
            <FiEdit2 className="profile-edit-icon" /> Edit Profile
          </button>
        </div>

        {/* Account Settings Header */}
        <div className="profile-section-heading-group">
          <div className="profile-settings-icon-box">
            <FiSettings className="profile-settings-heading-icon" />
          </div>
          <h4 className="profile-section-title">Account Settings</h4>
        </div>

        {/* Settings Options List */}
        <div className="profile-settings-list">

          {/* 1. Personal Information */}
          <div className="profile-setting-item-wrapper">
            <div 
              className="profile-setting-item"
              onClick={() => handleDropdownToggle('personal')}
            >
              <div className="profile-setting-left">
                <div className="profile-item-icon-box">
                  <FiUser className="profile-item-icon" />
                </div>
                <div className="profile-item-text">
                  <h5>Personal Information</h5>
                  <p>Manage your personal details</p>
                </div>
              </div>
              <FiChevronRight className={`profile-arrow-icon ${activeDropdown === 'personal' ? 'rotate' : ''}`} />
            </div>
            {activeDropdown === 'personal' && (
              <div className="profile-dropdown-content">
                <p><strong>Full Name:</strong> {profileData.name}</p>
                <p><strong>Email Address:</strong> {profileData.email}</p>
                <p><strong>Phone Number:</strong> {profileData.phone}</p>
                <p><strong>Member Since:</strong> January 2025</p>
              </div>
            )}
          </div>

          {/* 2. Change Password */}
          <div className="profile-setting-item-wrapper">
            <div 
              className="profile-setting-item"
              onClick={() => handleDropdownToggle('password')}
            >
              <div className="profile-setting-left">
                <div className="profile-item-icon-box">
                  <FiLock className="profile-item-icon" />
                </div>
                <div className="profile-item-text">
                  <h5>Change Password</h5>
                  <p>Keep your account secure</p>
                </div>
              </div>
              <FiChevronRight className={`profile-arrow-icon ${activeDropdown === 'password' ? 'rotate' : ''}`} />
            </div>
            {activeDropdown === 'password' && (
              <div className="profile-dropdown-content">
                <form onSubmit={(e) => { e.preventDefault(); alert('Password updated successfully!'); handleDropdownToggle(null); }}>
                  <div className="profile-form-group">
                    <label>Current Password</label>
                    <input type="password" placeholder="••••••••" required />
                  </div>
                  <div className="profile-form-group">
                    <label>New Password</label>
                    <input type="password" placeholder="••••••••" required />
                  </div>
                  <button type="submit" className="profile-dropdown-submit-btn">Update Password</button>
                </form>
              </div>
            )}
          </div>

          {/* 3. Email Notifications (Switch) */}
          <div className="profile-setting-item">
            <div className="profile-setting-left">
              <div className="profile-item-icon-box">
                <FiMail className="profile-item-icon" />
              </div>
              <div className="profile-item-text">
                <h5>Email Notifications</h5>
                <p>Get updates on your email</p>
              </div>
            </div>
            <label className="profile-switch">
              <input 
                type="checkbox" 
                checked={settingsToggles.emailNotifications} 
                onChange={() => handleToggleChange('emailNotifications')} 
              />
              <span className="profile-slider round"></span>
            </label>
          </div>

          {/* 4. Push Notifications (Switch) */}
          <div className="profile-setting-item">
            <div className="profile-setting-left">
              <div className="profile-item-icon-box">
                <FiBell className="profile-item-icon" />
              </div>
              <div className="profile-item-text">
                <h5>Push Notifications</h5>
                <p>Get real-time updates</p>
              </div>
            </div>
            <label className="profile-switch">
              <input 
                type="checkbox" 
                checked={settingsToggles.pushNotifications} 
                onChange={() => handleToggleChange('pushNotifications')} 
              />
              <span className="profile-slider round"></span>
            </label>
          </div>

          {/* 5. Water Delivery Alerts (Switch) */}
          <div className="profile-setting-item">
            <div className="profile-setting-left">
              <div className="profile-item-icon-box">
                <FiDroplet className="profile-item-icon" />
              </div>
              <div className="profile-item-text">
                <h5>Water Delivery Alerts</h5>
                <p>Receive delivery status updates</p>
              </div>
            </div>
            <label className="profile-switch">
              <input 
                type="checkbox" 
                checked={settingsToggles.waterDeliveryAlerts} 
                onChange={() => handleToggleChange('waterDeliveryAlerts')} 
              />
              <span className="profile-slider round"></span>
            </label>
          </div>

          {/* 6. Privacy & Security */}
          <div className="profile-setting-item-wrapper">
            <div 
              className="profile-setting-item"
              onClick={() => handleDropdownToggle('privacy')}
            >
              <div className="profile-setting-left">
                <div className="profile-item-icon-box">
                  <FiShield className="profile-item-icon" />
                </div>
                <div className="profile-item-text">
                  <h5>Privacy & Security</h5>
                  <p>Your data is safe with us</p>
                </div>
              </div>
              <FiChevronRight className={`profile-arrow-icon ${activeDropdown === 'privacy' ? 'rotate' : ''}`} />
            </div>
            {activeDropdown === 'privacy' && (
              <div className="profile-dropdown-content">
                <p><strong>Data Encryption:</strong> End-to-end 256-bit secure encryption.</p>
                <p><strong>Two-Factor Auth:</strong> Disabled (Tap to configure)</p>
                <p><strong>Active Sessions:</strong> 2 devices connected</p>
              </div>
            )}
          </div>

        </div>

        {/* Footer Save Changes Button */}
        <div className="profile-footer-action">
          <button 
            type="button" 
            className="profile-save-changes-btn"
            onClick={handleSaveChangesAll}
          >
            <FiSave className="profile-save-icon" /> Save Changes
          </button>
        </div>

      </div>

      {/* Edit Profile Modal Dialog */}
      {isEditing && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-card">
            <div className="profile-modal-header">
              <h3>Edit Profile Information</h3>
              <button onClick={() => setIsEditing(false)} className="profile-modal-close-btn">
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSaveProfileModal}>
              <div className="profile-form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={tempProfile.name} 
                  onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                  required 
                />
              </div>
              <div className="profile-form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={tempProfile.email} 
                  onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                  required 
                />
              </div>
              <div className="profile-form-group">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  value={tempProfile.phone} 
                  onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                  required 
                />
              </div>
              <div className="profile-modal-footer">
                <button type="button" className="profile-modal-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit" className="profile-modal-save">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;