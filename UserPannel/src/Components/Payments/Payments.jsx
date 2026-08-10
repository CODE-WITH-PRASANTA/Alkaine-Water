import React, { useState } from 'react';
import './Payments.css';
import {  
  Bell, 
  Settings, 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Gift, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Calendar, 
  Plus, 
  X, 
  CreditCard, 
  ChevronDown, 
  MoreVertical 
} from 'lucide-react';

const Payments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    methodType: '',
    paymentMethodName: '',
    accountNumber: '',
    holderName: '',
    expiryDate: '',
    ifscCode: '',
    upiId: '',
    isDefault: false,
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Payment Method:", formData);
    setIsModalOpen(false);
  };

  return (
    <div className="payments-dashboard-layout">
    
      {/* --- KPI Grid Cards --- */}
      <section className="payments-kpi-grid">
        
        <div className="payments-kpi-card">
          <div className="payments-kpi-header">
            <span>Wallet Balance</span>
            <div className="payments-kpi-icon payments-icon-purple">
              <Wallet size={20} />
            </div>
          </div>
          <div className="payments-kpi-value-row">
            <h3 className="payments-kpi-value">₹245.75</h3>
            <span className="payments-kpi-change payments-change-positive">
              <TrendingUp size={14} /> +4.3%
            </span>
          </div>
          <p className="payments-kpi-comparison">from last month</p>
        </div>

        <div className="payments-kpi-card">
          <div className="payments-kpi-header">
            <span>Total Received</span>
            <div className="payments-kpi-icon payments-icon-green">
              <ArrowDownLeft size={20} />
            </div>
          </div>
          <div className="payments-kpi-value-row">
            <h3 className="payments-kpi-value">₹5,420.00</h3>
            <span className="payments-kpi-change payments-change-positive">
              <TrendingUp size={14} /> +12.5%
            </span>
          </div>
          <p className="payments-kpi-comparison">from last month</p>
        </div>

        <div className="payments-kpi-card">
          <div className="payments-kpi-header">
            <span>Total Issued</span>
            <div className="payments-kpi-icon payments-icon-amber">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <div className="payments-kpi-value-row">
            <h3 className="payments-kpi-value">₹5,176.25</h3>
            <span className="payments-kpi-change payments-change-negative">
              <TrendingDown size={14} /> -2.4%
            </span>
          </div>
          <p className="payments-kpi-comparison">from last month</p>
        </div>

        <div className="payments-kpi-card">
          <div className="payments-kpi-header">
            <span>Cashback Earned</span>
            <div className="payments-kpi-icon payments-icon-pink">
              <Gift size={20} />
            </div>
          </div>
          <div className="payments-kpi-value-row">
            <h3 className="payments-kpi-value">₹320.50</h3>
            <span className="payments-kpi-change payments-change-positive">
              <TrendingUp size={14} /> +8.1%
            </span>
          </div>
          <p className="payments-kpi-comparison">from last month</p>
        </div>

      </section>

      {/* --- Content Grid --- */}
      <div className="payments-content-grid">
        
        <div className="payments-transactions-card">
          <div className="payments-card-header">
            <h2>Recent Transactions</h2>
            <a href="#view-all" className="payments-view-all-link">View All Transactions</a>
          </div>
          <div className="payments-table-responsive">
            <table className="payments-transaction-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>18 May 2025, 10:30 AM</td>
                  <td className="payments-td-desc">Online payment received</td>
                  <td><span className="payments-tag payments-tag-credit">Credit</span></td>
                  <td className="payments-amount-positive">+ ₹245.00</td>
                  <td><span className="payments-tag payments-tag-success">Success</span></td>
                </tr>
                <tr>
                  <td>18 May 2025, 09:45 AM</td>
                  <td className="payments-td-desc">Order #ORD123 refund</td>
                  <td><span className="payments-tag payments-tag-debit">Debit</span></td>
                  <td className="payments-amount-negative">- ₹150.00</td>
                  <td><span className="payments-tag payments-tag-failed">Failed</span></td>
                </tr>
                <tr>
                  <td>17 May 2025, 04:20 PM</td>
                  <td className="payments-td-desc">Wallet top-up by user</td>
                  <td><span className="payments-tag payments-tag-credit">Credit</span></td>
                  <td className="payments-amount-positive">+ ₹500.00</td>
                  <td><span className="payments-tag payments-tag-success">Success</span></td>
                </tr>
                <tr>
                  <td>17 May 2025, 01:15 PM</td>
                  <td className="payments-td-desc">Order #ORD122 payment</td>
                  <td><span className="payments-tag payments-tag-debit">Debit</span></td>
                  <td className="payments-amount-negative">- ₹230.00</td>
                  <td><span className="payments-tag payments-tag-success">Success</span></td>
                </tr>
                <tr>
                  <td>16 May 2025, 08:10 AM</td>
                  <td className="payments-td-desc">Cashback received</td>
                  <td><span className="payments-tag payments-tag-credit">Credit</span></td>
                  <td className="payments-amount-positive">+ ₹120.50</td>
                  <td><span className="payments-tag payments-tag-success">Success</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="payments-methods-card">
          <div className="payments-card-header">
            <h2>Payment Methods</h2>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="payments-add-method-btn"
            >
              + Add New
            </button>
          </div>

          <div className="payments-method-list">
            <div className="payments-method-item">
              <div className="payments-method-details">
                <CreditCard size={24} color="#2563eb" />
                <div className="payments-method-text">
                  <h4>Visa Credit Card</h4>
                  <p>**** **** **** 4242</p>
                </div>
              </div>
              <span className="payments-badge payments-badge-default">Default</span>
              <MoreVertical size={16} className="payments-text-secondary payments-cursor-pointer" />
            </div>

            <div className="payments-method-item">
              <div className="payments-method-details">
                <div className="payments-bank-avatar payments-sbi-bg">SBI</div>
                <div className="payments-method-text">
                  <h4>State Bank of India</h4>
                  <p>**** **** 0127</p>
                </div>
              </div>
              <span className="payments-badge payments-badge-bank">Bank</span>
              <MoreVertical size={16} className="payments-text-secondary payments-cursor-pointer" />
            </div>

            <div className="payments-method-item">
              <div className="payments-method-details">
                <div className="payments-bank-avatar payments-upi-bg">UPI</div>
                <div className="payments-method-text">
                  <h4>UPI - 9876543210</h4>
                  <p>john@upi</p>
                </div>
              </div>
              <MoreVertical size={16} className="payments-text-secondary payments-cursor-pointer" />
            </div>

            <div className="payments-method-item">
              <div className="payments-method-details">
                <div className="payments-bank-avatar payments-hdfc-bg">HDFC</div>
                <div className="payments-method-text">
                  <h4>HDFC Bank **** 1236</h4>
                  <p>Savings Account</p>
                </div>
              </div>
              <MoreVertical size={16} className="payments-text-secondary payments-cursor-pointer" />
            </div>
          </div>

          <a href="#all-methods" className="payments-view-all-methods-link">
            View all Payment Methods &gt;
          </a>
        </div>

      </div>

      {/* --- Footer Section --- */}
      <footer className="payments-footer-section">
        <div className="payments-secure-box">
          <ShieldCheck size={28} className="payments-secure-icon" />
          <div>
            <h4>100% Secure Payments</h4>
            <p>Your payments are fully protected and secured with us</p>
          </div>
        </div>
        <div className="payments-chart-placeholder" />
        <div className="payments-date-selector">
          <Calendar size={16} />
          <span>This Month</span>
          <ChevronDown size={14} />
        </div>
      </footer>

      {/* --- Glassmorphism Modal --- */}
      {isModalOpen && (
        <div className="payments-modal-overlay">
          <div className="payments-modal-card">
            
            <div className="payments-modal-header">
              <h2>Add New Payment Method</h2>
              <button onClick={() => setIsModalOpen(false)} className="payments-close-button">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="payments-modal-body">
              
              <div className="payments-form-group">
                <label className="payments-label">Method Type</label>
                <div className="payments-input-wrapper">
                  <CreditCard size={18} className="payments-icon-inside" />
                  <select 
                    name="methodType"
                    value={formData.methodType}
                    onChange={handleInputChange}
                    className="payments-select payments-input-with-icon"
                  >
                    <option value="">Select Method Type</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="bank_account">Bank Account</option>
                    <option value="upi">UPI ID</option>
                  </select>
                </div>
              </div>

              <div className="payments-form-group">
                <label className="payments-label">Payment Method Name</label>
                <input 
                  type="text" 
                  name="paymentMethodName"
                  placeholder="e.g., HDFC Bank Savings Account" 
                  value={formData.paymentMethodName}
                  onChange={handleInputChange}
                  className="payments-input"
                />
              </div>

              <div className="payments-form-group">
                <label className="payments-label">Account / Card Details</label>
                <input 
                  type="text" 
                  name="accountNumber"
                  placeholder="Enter account number or card number" 
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="payments-input"
                />
              </div>

              <div className="payments-row">
                <div className="payments-form-group">
                  <label className="payments-label">Holder Name</label>
                  <input 
                    type="text" 
                    name="holderName"
                    placeholder="Enter holder name" 
                    value={formData.holderName}
                    onChange={handleInputChange}
                    className="payments-input"
                  />
                </div>
                <div className="payments-form-group">
                  <label className="payments-label">Expiry Date <span className="payments-label-optional">(if applicable)</span></label>
                  <div className="payments-input-wrapper">
                    <input 
                      type="text" 
                      name="expiryDate"
                      placeholder="MM/YY" 
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="payments-input"
                    />
                    <Calendar size={18} className="payments-calendar-icon-absolute" />
                  </div>
                </div>
              </div>

              <div className="payments-row">
                <div className="payments-form-group">
                  <label className="payments-label">IFSC Code <span className="payments-label-optional">(if applicable)</span></label>
                  <input 
                    type="text" 
                    name="ifscCode"
                    placeholder="Enter IFSC code" 
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    className="payments-input"
                  />
                </div>
                <div className="payments-form-group">
                  <label className="payments-label">UPI ID <span className="payments-label-optional">(if applicable)</span></label>
                  <input 
                    type="text" 
                    name="upiId"
                    placeholder="Enter UPI ID (e.g., name@upi)" 
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className="payments-input"
                  />
                </div>
              </div>

              <div className="payments-toggle-group">
                <div className="payments-toggle-text">
                  <h4>Set as Default</h4>
                  <p>This will be set as your default payment method</p>
                </div>
                <label className="payments-switch">
                  <input 
                    type="checkbox" 
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleInputChange}
                  />
                  <span className="payments-slider" style={{ background: formData.isDefault ? '#7c3aed' : '#ccc' }} />
                </label>
              </div>

              <div className="payments-form-group">
                <label className="payments-label">Notes <span className="payments-label-optional">(Optional)</span></label>
                <textarea 
                  name="notes"
                  rows="2"
                  placeholder="Add any additional notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="payments-input payments-textarea-resize"
                />
              </div>

              <div className="payments-modal-actions">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="payments-btn-cancel"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="payments-btn-submit"
                >
                  <Plus size={16} /> Save Payment Method
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Payments;