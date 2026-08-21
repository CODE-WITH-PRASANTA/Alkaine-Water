import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Share2, 
  ShoppingBag, 
  Wallet, 
  Users, 
  CheckCircle2, 
  Gift, 
  Clock, 
  Send, 
  MoreHorizontal 
} from 'lucide-react';
import './ReferEarn.css';

const ReferEarn = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const referralCode = "PURESIP50";
  const referralLink = "https://puresip.com/ref/PURESIP50";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const referralHistory = [
    { email: "rahul.kumar@email.com", date: "20 May 2025", status: "Completed", reward: "₹50.00", paymentStatus: "Paid" },
    { email: "priya.sharma@email.com", date: "18 May 2025", status: "Completed", reward: "₹50.00", paymentStatus: "Paid" },
    { email: "amit.verma@email.com", date: "15 May 2025", status: "Pending", reward: "₹50.00", paymentStatus: "Pending" },
  ];

  return (
    <div className="refer-earn-wrapper">
      
      {/* Hero Banner & Referral Card Grid */}
      <div className="refer-earn-hero-grid">
        
        {/* Left Hero Banner */}
        <div className="refer-earn-banner-left">
          <div>
            <h2 className="refer-earn-banner-title">
              Share PureSip<br />
              <span className="text-blue-600">Get Rewards!</span>
            </h2>
            <p className="refer-earn-banner-desc">
              Invite your friends to PureSip.<br />
              They get <span className="font-semibold text-gray-800">20% OFF</span> on their first order and you earn <span className="font-semibold text-gray-800">₹50 wallet cashback!</span>
            </p>
          </div>

          {/* Bottom Steps inside Hero */}
          <div className="refer-earn-steps-container">
            <div className="refer-earn-step-item">
              <div className="refer-earn-step-icon">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="refer-earn-step-text">Share your referral link</span>
            </div>
            <div className="refer-earn-step-item">
              <div className="refer-earn-step-icon">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="refer-earn-step-text">Friend places their first order</span>
            </div>
            <div className="refer-earn-step-item">
              <div className="refer-earn-step-icon">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="refer-earn-step-text">You earn ₹50 cashback</span>
            </div>
          </div>

          {/* Decorative graphic placeholder */}
          <div className="refer-earn-decoration-bg">
            <div className="refer-earn-illustration"></div>
          </div>
        </div>

        {/* Right Referral Code & Share Panel */}
        <div className="refer-earn-panel-right">
          <div>
            <h3 className="refer-earn-section-heading">Your Referral Code</h3>
            
            {/* Code Box */}
            <div className="refer-earn-code-box">
              <span className="refer-earn-code-text">{referralCode}</span>
              <button onClick={handleCopyCode} className="refer-earn-copy-action">
                {copiedCode ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copiedCode ? "Copied" : ""}
              </button>
            </div>

            <p className="refer-earn-or-text">or share via</p>

            {/* Social Share Buttons */}
            <div className="refer-earn-social-row">
              <button className="refer-earn-social-btn text-green-600 bg-green-50 hover:bg-green-100">
                <Send className="w-5 h-5" />
              </button>
              
              <button className="refer-earn-social-btn text-blue-600 bg-blue-50 hover:bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>

              <button className="refer-earn-social-btn text-pink-600 bg-pink-50 hover:bg-pink-100 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>

              <button className="refer-earn-social-btn text-gray-600 bg-gray-100 hover:bg-gray-200">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Referral Link Box */}
          <div className="refer-earn-link-group">
            <label className="refer-earn-link-label">Referral Link</label>
            <div className="refer-earn-link-box">
              <span className="refer-earn-link-string">{referralLink}</span>
              <button onClick={handleCopyLink} className="refer-earn-link-copy-btn">
                {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Stats Cards Row */}
      <div className="refer-earn-stats-grid">
        
        <div className="refer-earn-stat-card">
          <div className="refer-earn-stat-icon bg-blue-50 text-blue-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="refer-earn-stat-label">Total Referrals</p>
            <h4 className="refer-earn-stat-value">24</h4>
          </div>
        </div>

        <div className="refer-earn-stat-card">
          <div className="refer-earn-stat-icon bg-green-50 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="refer-earn-stat-label">Successful Referrals</p>
            <h4 className="refer-earn-stat-value">18</h4>
          </div>
        </div>

        <div className="refer-earn-stat-card">
          <div className="refer-earn-stat-icon bg-purple-50 text-purple-600">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <p className="refer-earn-stat-label">Rewards Earned</p>
            <h4 className="refer-earn-stat-value">₹900.00</h4>
          </div>
        </div>

        <div className="refer-earn-stat-card">
          <div className="refer-earn-stat-icon bg-amber-50 text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="refer-earn-stat-label">Rewards Pending</p>
            <h4 className="refer-earn-stat-value">₹150.00</h4>
          </div>
        </div>

        <div className="refer-earn-wallet-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-blue-100 font-medium">Available Balance</p>
              <h4 className="text-xl font-bold mt-0.5">₹750.00</h4>
            </div>
          </div>
          <button className="refer-earn-withdraw-btn">
            Withdraw
          </button>
        </div>

      </div>

      {/* Bottom Section: History & How it Works */}
      <div className="refer-earn-bottom-grid">
        
        {/* Referral History Table */}
        <div className="refer-earn-history-section">
          <h3 className="refer-earn-section-title">Referral History</h3>
          
          <div className="refer-earn-table-container">
            <table className="refer-earn-table">
              <thead>
                <tr>
                  <th>Referred User</th>
                  <th>Date</th>
                  <th>Order Status</th>
                  <th>Reward</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {referralHistory.map((item, index) => (
                  <tr key={index}>
                    <td className="font-medium text-gray-800">{item.email}</td>
                    <td className="text-gray-500">{item.date}</td>
                    <td>
                      <span className={`inline-block text-xs font-medium ${item.status === 'Completed' ? 'text-gray-700' : 'text-amber-500'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="font-medium text-gray-800">{item.reward}</td>
                    <td>
                      <span className={`refer-earn-badge ${item.paymentStatus === 'Paid' ? 'refer-earn-badge-paid' : 'refer-earn-badge-pending'}`}>
                        {item.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How it Works Panel */}
        <div className="refer-earn-guide-section">
          <div>
            <h3 className="refer-earn-section-title mb-6">How it Works?</h3>
            
            <div className="refer-earn-guide-list">
              <div className="refer-earn-guide-item">
                <div className="refer-earn-guide-icon">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">Share your referral link or code</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Send your link to friends via social media or messaging apps.</p>
                </div>
              </div>

              <div className="refer-earn-guide-item">
                <div className="refer-earn-guide-icon">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">Your friend places their first order</h4>
                  <p className="text-xs text-gray-400 mt-0.5">They get an instant discount on their checkout.</p>
                </div>
              </div>

              <div className="refer-earn-guide-item">
                <div className="refer-earn-guide-icon">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">You earn ₹50 in your wallet</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Cashback is credited once their order is completed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ReferEarn;