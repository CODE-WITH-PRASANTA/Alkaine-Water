import React, { useState } from 'react';
import './AlkaNotificationSetting.css';

const DEFAULT_SETTINGS = {
  orderNotifications: true,
  deliveryUpdates: true,
  paymentAlerts: true,
  promotionalNotifications: false,
  emailDigest: true,
  smsAlerts: false,
};

const AlkaNotificationSetting = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isSaved, setIsSaved] = useState(false);

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setIsSaved(false);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setIsSaved(false);
  };

  const handleSave = () => {
    // Save logic / API call here
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const notificationSections = [
    {
      category: 'Transactional Alerts',
      items: [
        {
          id: 'orderNotifications',
          title: 'Order Status & Confirmation',
          description: 'Get real-time alerts when your orders are placed or updated.',
          badge: 'Essential',
        },
        {
          id: 'deliveryUpdates',
          title: 'Delivery & Tracking Updates',
          description: 'Receive SMS and push alerts when items are out for delivery.',
          badge: 'Recommended',
        },
        {
          id: 'paymentAlerts',
          title: 'Payment & Billing Alerts',
          description: 'Get instant notifications for receipts, refunds, and payment issues.',
        },
      ],
    },
    {
      category: 'Marketing & Preferences',
      items: [
        {
          id: 'promotionalNotifications',
          title: 'Promotional Offers & Discounts',
          description: 'Receive exclusive deals, sales announcements, and localized offers.',
        },
        {
          id: 'emailDigest',
          title: 'Weekly Summary Digest',
          description: 'A weekly email highlighting account activity and recommendations.',
        },
        {
          id: 'smsAlerts',
          title: 'SMS Direct Messages',
          description: 'Allow urgent account communications to be sent directly to your phone.',
        },
      ],
    },
  ];

  return (
    <div className="AlkaNotificationSetting-page">
      <div className="AlkaNotificationSetting-wrapper">
        {/* Header Bar */}
        <header className="AlkaNotificationSetting-header">
          <div className="AlkaNotificationSetting-header-main">
            <div className="AlkaNotificationSetting-header-icon-wrapper">
              <svg
                className="AlkaNotificationSetting-header-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <div>
              <h1 className="AlkaNotificationSetting-title">Notification Preferences</h1>
              <p className="AlkaNotificationSetting-subtitle">
                Manage how and when you receive updates regarding your account and orders.
              </p>
            </div>
          </div>
          
          <div className="AlkaNotificationSetting-actions">
            <button 
              className="AlkaNotificationSetting-btn-secondary" 
              onClick={handleReset}
            >
              Reset to Default
            </button>
            <button 
              className="AlkaNotificationSetting-btn-primary" 
              onClick={handleSave}
            >
              {isSaved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </header>

        {/* Content Section */}
        <main className="AlkaNotificationSetting-content">
          {notificationSections.map((section, idx) => (
            <section key={idx} className="AlkaNotificationSetting-section">
              <h2 className="AlkaNotificationSetting-category">{section.category}</h2>
              <div className="AlkaNotificationSetting-card">
                {section.items.map((item, itemIdx) => (
                  <div key={item.id} className="AlkaNotificationSetting-item">
                    <div className="AlkaNotificationSetting-info">
                      <div className="AlkaNotificationSetting-title-row">
                        <h3 className="AlkaNotificationSetting-item-title">{item.title}</h3>
                        {item.badge && (
                          <span className="AlkaNotificationSetting-badge">{item.badge}</span>
                        )}
                      </div>
                      <p className="AlkaNotificationSetting-item-desc">{item.description}</p>
                    </div>

                    <label
                      className="AlkaNotificationSetting-switch"
                      htmlFor={`toggle-${item.id}`}
                    >
                      <input
                        type="checkbox"
                        id={`toggle-${item.id}`}
                        checked={!!settings[item.id]}
                        onChange={() => handleToggle(item.id)}
                        aria-checked={!!settings[item.id]}
                        aria-label={item.title}
                        className="AlkaNotificationSetting-checkbox"
                      />
                      <span className="AlkaNotificationSetting-slider"></span>
                    </label>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default AlkaNotificationSetting;