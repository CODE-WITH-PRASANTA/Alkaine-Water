import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import './Payment.css';
import purseImage from '../../assets/p1.png'; // Path matching your project setup

// Custom Dropdown Component to Prevent Mobile/FB OS Drawer Overflow
const CustomDropdown = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="pay-form-group" ref={dropdownRef}>
      <label className="section-label">{label}</label>
      <div className="pay-custom-select-wrap">
        <div 
          className="pay-custom-select-trigger" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value}</span>
          <FaChevronDown size={12} className={`pay-select-chevron ${isOpen ? 'open' : ''}`} />
        </div>
        {isOpen && (
          <div className="pay-custom-options-list">
            {options.map((opt, idx) => (
              <div 
                key={idx} 
                className={`pay-custom-option ${value === opt ? 'selected' : ''}`}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Payment = () => {
  // --- Form Input States ---
  const [customerName, setCustomerName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [collectedAmount, setCollectedAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('Cash');
  const [paymentStatus, setPaymentStatus] = useState('Paid');

  // --- CRUD & Edit Mode States ---
  const [paymentList, setPaymentList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle Form Submission (Create / Update)
  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!customerName.trim() || !totalAmount || !collectedAmount) {
      alert("Please fill out all required fields.");
      return;
    }

    if (isEditing) {
      // Update entry logic
      setPaymentList(prevList =>
        prevList.map(item =>
          item.id === editId
            ? {
                ...item,
                name: customerName,
                totalAmount: Number(totalAmount),
                collectedAmount: Number(collectedAmount),
                method: selectedMethod,
                status: paymentStatus
              }
            : item
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      // Create entry logic
      const newPayment = {
        id: Date.now(),
        name: customerName,
        totalAmount: Number(totalAmount),
        collectedAmount: Number(collectedAmount),
        method: selectedMethod,
        status: paymentStatus
      };
      setPaymentList(prevList => [newPayment, ...prevList]);
    }

    // Reset fields to default
    setCustomerName('');
    setTotalAmount('');
    setCollectedAmount('');
    setSelectedMethod('Cash');
    setPaymentStatus('Paid');
  };

  // Populate fields for Editing
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setCustomerName(item.name);
    setTotalAmount(item.totalAmount);
    setCollectedAmount(item.collectedAmount);
    setSelectedMethod(item.method);
    setPaymentStatus(item.status);
  };

  // Delete payment record logic
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payment record?')) {
      setPaymentList(prevList => prevList.filter(item => item.id !== id));
      
      const totalPagesAfterDelete = Math.ceil((paymentList.length - 1) / itemsPerPage);
      if (currentPage > totalPagesAfterDelete && totalPagesAfterDelete > 0) {
        setCurrentPage(totalPagesAfterDelete);
      }
    }
  };

  // --- Pagination Engine Calculations ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paymentList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(paymentList.length / itemsPerPage);

  return (
    <div className="pay-container full-page-view">
      <div className="pay-wrapper full-width-stack">
        
        {/* ================= CARD: PAYMENT RECORD FORM ================= */}
        <div className="pay-card full-size-card">
          <div className="pay-card-header">
            <h2 className="pay-title">{isEditing ? 'Edit Payment Record' : 'Record Payment Collection'}</h2>
          </div>

          <form onSubmit={handlePaymentSubmit} className="pay-content">
            <div className="pay-left">
              
              <div className="pay-form-group">
                <label className="section-label">Customer Name</label>
                <input 
                  type="text" 
                  className="pay-input" 
                  placeholder="Enter customer name..." 
                  value={customerName} 
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="amount-grid">
                <div className="pay-form-group amount-box">
                  <label className="section-label">Total Amount</label>
                  <input 
                    type="number" 
                    className="pay-input" 
                    placeholder="₹0" 
                    value={totalAmount} 
                    onChange={(e) => setTotalAmount(e.target.value)}
                  />
                </div>
                <div className="pay-form-group amount-box">
                  <label className="section-label">Collected Amount</label>
                  <input 
                    type="number" 
                    className="pay-input text-blue" 
                    placeholder="₹0" 
                    value={collectedAmount} 
                    onChange={(e) => setCollectedAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="pay-form-group">
                <label className="section-label">Payment Method</label>
                <div className="radio-group-wrapper">
                  {["Cash", "UPI", "PhonePe", "Google Pay", "Card"].map((method) => (
                    <label key={method} className={`radio-label ${selectedMethod === method ? 'active' : ''}`}>
                      <input 
                        type="radio" 
                        name="method" 
                        value={method} 
                        checked={selectedMethod === method} 
                        onChange={() => setSelectedMethod(method)} 
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>

              <div className="pay-form-group mt-20">
                <CustomDropdown 
                  label="Payment Status"
                  value={paymentStatus}
                  options={['Paid', 'Advance', 'Unpaid']}
                  onChange={setPaymentStatus}
                />
              </div>

            </div>

            <div className="pay-right">
              <div className="wallet-img-container">
                <img src={purseImage} alt="Payment Processing" className="wallet-img" />
              </div>
            </div>

            <button type="submit" className={`save-btn emerald-btn ${isEditing ? 'edit-mode-btn' : ''}`}>
              {isEditing ? 'Update Payment Record' : 'Save Payment Entry'}
            </button>
          </form>
        </div>

        {/* ================= DATA TABLE SECTION ================= */}
        <div className="table-section-card">
          <h3 className="table-section-title">Payment Settlement History Logs</h3>
          <div className="table-responsive-wrapper">
            <table className="custom-data-table">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Customer Name</th>
                  <th>Payment Method</th>
                  <th>Payment Status</th>
                  <th>Total Amount</th>
                  <th>Collected Amount</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td><strong>{item.name}</strong></td>
                      <td>{item.method}</td>
                      <td>
                        <span className={`status-badge status-${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>₹{item.totalAmount}</td>
                      <td className="text-emerald-cell">₹{item.collectedAmount}</td>
                      <td className="table-actions-cell">
                        <button 
                          className="action-btn edit-action" 
                          title="Edit Record"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit size={14} />
                        </button>
                        <button 
                          className="action-btn delete-action" 
                          title="Delete Record"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-table-placeholder">
                      No registered payments found. Insert an entry above to populate settlement histories.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="table-pagination-container">
              <span className="pagination-info-text">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, paymentList.length)} of {paymentList.length} entries
              </span>
              <div className="pagination-button-group">
                <button 
                  className="pagination-nav-btn" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  <FaChevronLeft size={10} /> Prev
                </button>
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx + 1}
                    className={`pagination-number-btn ${currentPage === idx + 1 ? 'active-page' : ''}`}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button 
                  className="pagination-nav-btn" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                >
                  Next <FaChevronRight size={10} />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Payment;