import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  // General Settings State - Initialized empty to showcase placeholders
  const [formData, setFormData] = useState({
    storeName: '',
    storeEmail: '',
    storePhone: '',
    defaultCurrency: 'INR - Indian Rupee',
    timezone: 'Asia/Kolkata (GMT +05:30)',
    dateFormat: 'DD-MM-YYYY',
    storeAddress: '',
  });

  // Security Settings State
  const [twoFactor, setTwoFactor] = useState(true);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save changes handler
  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  // Update password handler
  const handleUpdatePassword = () => {
    alert('Update Password action triggered.');
  };

  return (
    <div className="settings-container">
      <div className="settings-wrapper">
        {/* Page Title */}
        <div className="settings-page-header">
          <h1 className="settings-page-title">Account & Store Settings</h1>
          <p className="settings-page-subtitle">
            Manage your store details, regional configuration, and account security.
          </p>
        </div>

        {/* General Settings Section */}
        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon-badge">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
            <h2 className="settings-title">General Settings</h2>
          </div>

          <form onSubmit={handleSave} className="settings-form">
            <div className="settings-grid">
              {/* Store Name */}
              <div className="settings-field">
                <label className="settings-label">Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  className="settings-input"
                  placeholder="Enter store name"
                  value={formData.storeName}
                  onChange={handleChange}
                />
              </div>

              {/* Store Email */}
              <div className="settings-field">
                <label className="settings-label">Store Email</label>
                <input
                  type="email"
                  name="storeEmail"
                  className="settings-input"
                  placeholder="Enter store email"
                  value={formData.storeEmail}
                  onChange={handleChange}
                />
              </div>

              {/* Store Phone */}
              <div className="settings-field">
                <label className="settings-label">Store Phone</label>
                <input
                  type="text"
                  name="storePhone"
                  className="settings-input"
                  placeholder="Enter store phone number"
                  value={formData.storePhone}
                  onChange={handleChange}
                />
              </div>

              {/* Default Currency */}
              <div className="settings-field">
                <label className="settings-label">Default Currency</label>
                <div className="settings-select-wrapper">
                  <select
                    name="defaultCurrency"
                    className="settings-select"
                    value={formData.defaultCurrency}
                    onChange={handleChange}
                  >
                    <option value="INR - Indian Rupee">INR - Indian Rupee</option>
                    <option value="USD - US Dollar">USD - US Dollar</option>
                    <option value="EUR - Euro">EUR - Euro</option>
                    <option value="GBP - British Pound">GBP - British Pound</option>
                  </select>
                </div>
              </div>

              {/* Timezone */}
              <div className="settings-field">
                <label className="settings-label">Timezone</label>
                <div className="settings-select-wrapper">
                  <select
                    name="timezone"
                    className="settings-select"
                    value={formData.timezone}
                    onChange={handleChange}
                  >
                    <option value="Asia/Kolkata (GMT +05:30)">
                      Asia/Kolkata (GMT +05:30)
                    </option>
                    <option value="UTC (GMT +00:00)">UTC (GMT +00:00)</option>
                    <option value="America/New_York (GMT -05:00)">
                      America/New_York (GMT -05:00)
                    </option>
                    <option value="Europe/London (GMT +00:00)">
                      Europe/London (GMT +00:00)
                    </option>
                  </select>
                </div>
              </div>

              {/* Date Format */}
              <div className="settings-field">
                <label className="settings-label">Date Format</label>
                <div className="settings-select-wrapper">
                  <select
                    name="dateFormat"
                    className="settings-select"
                    value={formData.dateFormat}
                    onChange={handleChange}
                  >
                    <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              {/* Store Address */}
              <div className="settings-field settings-field-full">
                <label className="settings-label">Store Address</label>
                <textarea
                  name="storeAddress"
                  className="settings-textarea"
                  rows="4"
                  placeholder="Enter complete store address..."
                  value={formData.storeAddress}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Save Button */}
            <div className="settings-btn-wrapper">
              <button type="submit" className="settings-save-btn">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </section>

        {/* Security Settings Section */}
        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon-badge">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
            </div>
            <h2 className="settings-title">Security Settings</h2>
          </div>

          <div className="settings-security-content">
            {/* Change Password */}
            <div className="settings-security-row">
              <div className="settings-tfa-info">
                <span className="settings-security-label">Change Password</span>
                <p className="settings-security-desc">
                  Update your password regularly to keep your account secure.
                </p>
              </div>
              <button
                type="button"
                className="settings-update-btn"
                onClick={handleUpdatePassword}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>Update Password</span>
              </button>
            </div>

            <hr className="settings-divider" />

            {/* Two-Factor Authentication */}
            <div className="settings-security-row">
              <div className="settings-tfa-info">
                <span className="settings-security-label">
                  Two-Factor Authentication
                </span>
                <p className="settings-security-desc">
                  Add an extra layer of security to prevent unauthorized access.
                </p>
              </div>
              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.checked)}
                />
                <span className="settings-slider"></span>
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;