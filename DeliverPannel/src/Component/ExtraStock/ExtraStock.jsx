import React, { useState } from 'react';
import { FaPlus, FaMinus, FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ExtraStock.css';
import jarLeft from '../../assets/jar.jpg'; // Path matching your project setup

const ExtraStock = () => {
  // --- Form State ---
  const [extraProduct, setExtraProduct] = useState('20L');
  const [extraQty, setExtraQty] = useState(1);
  const [reason, setReason] = useState('Customer Requested');

  // --- CRUD & Edit Mode State ---
  const [stockList, setStockList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Pricing helper based on selected size
  const getPricePerJar = (size) => {
    if (size === '20L') return 80;
    if (size === '15L') return 60;
    return 40; // 10L
  };

  const currentTotalAmount = extraQty * getPricePerJar(extraProduct);

  // Handle Form Submit (Create or Update)
  const handleExtraStockSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update item logic
      setStockList(prevList =>
        prevList.map(item =>
          item.id === editId
            ? { 
                ...item, 
                productSize: extraProduct, 
                quantity: extraQty, 
                totalAmount: currentTotalAmount, 
                reason 
              }
            : item
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      // Create item logic
      const newItem = {
        id: Date.now(),
        productSize: extraProduct,
        quantity: extraQty,
        totalAmount: currentTotalAmount,
        reason
      };
      setStockList(prevList => [newItem, ...prevList]);
    }

    // Reset Form fields to defaults
    setExtraProduct('20L');
    setExtraQty(1);
    setReason('Customer Requested');
  };

  // Populate form fields for editing
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setExtraProduct(item.productSize);
    setExtraQty(item.quantity);
    setReason(item.reason);
  };

  // Delete item logic
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this stock entry?')) {
      setStockList(prevList => prevList.filter(item => item.id !== id));
      
      // Safety adjustment for current page view window if deleted item leaves page blank
      const totalPagesAfterDelete = Math.ceil((stockList.length - 1) / itemsPerPage);
      if (currentPage > totalPagesAfterDelete && totalPagesAfterDelete > 0) {
        setCurrentPage(totalPagesAfterDelete);
      }
    }
  };

  // --- Pagination Logic Engine ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stockList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(stockList.length / itemsPerPage);

  return (
    <div className="ExtraStock-container ExtraStock-full-page-view">
      <div className="ExtraStock-wrapper ExtraStock-full-width-stack">
        
        {/* ================= CARD: ADD EXTRA STOCK ================= */}
        <div className="ExtraStock-card ExtraStock-full-size-card">
          <div className="ExtraStock-card-header">
            <h2 className="ExtraStock-title">Add Extra Stock</h2>
            <div className="ExtraStock-header-accent"></div>
          </div>

          <form onSubmit={handleExtraStockSubmit} className="ExtraStock-form-content">
            <div className="ExtraStock-form-left">
              
              <div className="ExtraStock-form-group">
                <label className="ExtraStock-label">Product Size</label>
                <div className="ExtraStock-input-wrapper">
                  <select 
                    className="ExtraStock-select" 
                    value={extraProduct} 
                    onChange={(e) => setExtraProduct(e.target.value)}
                  >
                    <option value="20L">20L Water Jar</option>
                    <option value="15L">15L Water Jar</option>
                    <option value="10L">10L Water Jar</option>
                  </select>
                </div>
              </div>

              <div className="ExtraStock-form-group">
                <label className="ExtraStock-label">Extra Jars</label>
                <div className="ExtraStock-counter">
                  <button 
                    type="button" 
                    className="ExtraStock-counter-btn"
                    onClick={() => setExtraQty(prev => Math.max(1, prev - 1))}
                  >
                    <FaMinus size={14} />
                  </button>
                  <span className="ExtraStock-counter-value">{extraQty}</span>
                  <button 
                    type="button" 
                    className="ExtraStock-counter-btn"
                    onClick={() => setExtraQty(prev => prev + 1)}
                  >
                    <FaPlus size={14} />
                  </button>
                </div>
              </div>

              <div className="ExtraStock-form-group">
                <label className="ExtraStock-label">Total Amount</label>
                <div className="ExtraStock-amount">
                  <span className="ExtraStock-currency">₹</span>
                  {currentTotalAmount}
                </div>
              </div>

              <div className="ExtraStock-form-group">
                <label className="ExtraStock-label">Reason</label>
                <div className="ExtraStock-input-wrapper">
                  <select 
                    className="ExtraStock-select" 
                    value={reason} 
                    onChange={(e) => setReason(e.target.value)}
                  >
                    <option value="Customer Requested">Customer Requested</option>
                    <option value="Event / Party">Event / Party</option>
                    <option value="Damaged Replacement">Damaged Replacement</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="ExtraStock-form-right">
              <div className="ExtraStock-image-showcase">
                <img src={jarLeft} alt="Water Jar Extra Stock" className="ExtraStock-jar-img" />
                <div className="ExtraStock-image-glow"></div>
              </div>
            </div>

            <button type="submit" className={`ExtraStock-submit-btn ${isEditing ? 'ExtraStock-edit-mode-btn' : 'ExtraStock-primary-btn'}`}>
              {isEditing ? 'Update Stock Details' : 'Add & Update Stock'}
            </button>
          </form>
        </div>

        {/* ================= DATA TABLE SECTION ================= */}
        <div className="ExtraStock-table-section-card">
          <h3 className="ExtraStock-table-section-title">Extra Stock Ledger Logs</h3>
          <div className="ExtraStock-table-responsive-wrapper">
            <table className="ExtraStock-custom-data-table">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Product Size</th>
                  <th>Extra Jars</th>
                  <th>Total Amount</th>
                  <th>Reason</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={item.id} className="ExtraStock-table-row">
                      <td className="ExtraStock-col-id">{indexOfFirstItem + index + 1}</td>
                      <td><strong className="ExtraStock-product-name">{item.productSize} Water Jar</strong></td>
                      <td>
                        <span className="ExtraStock-qty-pill">{item.quantity}</span>
                      </td>
                      <td className="ExtraStock-price-cell">₹{item.totalAmount}</td>
                      <td>
                        <span className={`ExtraStock-reason-badge ExtraStock-reason-${item.reason.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                          {item.reason}
                        </span>
                      </td>
                      <td className="ExtraStock-table-actions-cell">
                        <button 
                          className="ExtraStock-action-btn ExtraStock-edit-action" 
                          title="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit size={16} />
                        </button>
                        <button 
                          className="ExtraStock-action-btn ExtraStock-delete-action" 
                          title="Delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrashAlt size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="ExtraStock-empty-table-placeholder">
                      <div className="ExtraStock-empty-state-content">
                        <span className="ExtraStock-empty-icon">📊</span>
                        <p>No stock adjustments found. Add entries above to populate ledger.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="ExtraStock-table-pagination-container">
              <span className="ExtraStock-pagination-info-text">
                Showing <strong>{indexOfFirstItem + 1}</strong> to <strong>{Math.min(indexOfLastItem, stockList.length)}</strong> of <strong>{stockList.length}</strong> entries
              </span>
              <div className="ExtraStock-pagination-button-group">
                <button 
                  className="ExtraStock-pagination-nav-btn" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  <FaChevronLeft size={12} /> Prev
                </button>
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx + 1}
                    className={`ExtraStock-pagination-number-btn ${currentPage === idx + 1 ? 'ExtraStock-active-page' : ''}`}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button 
                  className="ExtraStock-pagination-nav-btn" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                >
                  Next <FaChevronRight size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ExtraStock;