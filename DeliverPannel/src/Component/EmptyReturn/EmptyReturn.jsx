import React, { useState } from 'react';
import { FaPlus, FaMinus, FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './EmptyReturn.css';
import jarRight from '../../assets/jar.jpg'; // Path matching your project setup

const EmptyReturn = () => {
  // --- Form State ---
  const [customerId, setCustomerId] = useState('');
  const [returnProduct, setReturnProduct] = useState('20L');
  const [returnQty, setReturnQty] = useState(1);
  const [condition, setCondition] = useState('Good');
  const [remarks, setRemarks] = useState('');
  
  // --- CRUD & Edit Mode State ---
  const [returnsList, setReturnsList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle Form Submit (Create or Update)
  const handleEmptyReturnSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update item logic
      setReturnsList(prevList =>
        prevList.map(item =>
          item.id === editId
            ? { ...item, customerId, productSize: returnProduct, quantity: returnQty, condition, remarks }
            : item
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      // Create item logic
      const newItem = {
        id: Date.now(),
        customerId,
        productSize: returnProduct,
        quantity: returnQty,
        condition,
        remarks: remarks || '-'
      };
      setReturnsList(prevList => [newItem, ...prevList]);
    }

    // Reset Form fields
    setCustomerId('');
    setReturnProduct('20L');
    setReturnQty(1);
    setCondition('Good');
    setRemarks('');
  };

  // Populate form fields for editing
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setCustomerId(item.customerId);
    setReturnProduct(item.productSize);
    setReturnQty(item.quantity);
    setCondition(item.condition);
    setRemarks(item.remarks === '-' ? '' : item.remarks);
  };

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setReturnsList(prevList => prevList.filter(item => item.id !== id));
      // Adjust page view if current page becomes completely empty due to delete
      const totalPagesAfterDelete = Math.ceil((returnsList.length - 1) / itemsPerPage);
      if (currentPage > totalPagesAfterDelete && totalPagesAfterDelete > 0) {
        setCurrentPage(totalPagesAfterDelete);
      }
    }
  };

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = returnsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(returnsList.length / itemsPerPage);

  return (
    <div className="EmptyReturn-container EmptyReturn-full-page-view">
      <div className="EmptyReturn-wrapper EmptyReturn-full-width-stack">
        
        {/* ================= CARD: EMPTY BOTTLE RETURN ================= */}
        <div className="EmptyReturn-card EmptyReturn-full-size-card">
          <div className="EmptyReturn-card-header">
            <h2 className="EmptyReturn-title">Empty Bottle Return</h2>
          </div>

          <form onSubmit={handleEmptyReturnSubmit} className="EmptyReturn-form-content">
            <div className="EmptyReturn-form-left">
              
              <div className="EmptyReturn-form-group">
                <label className="EmptyReturn-label">Customer ID</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter Customer ID" 
                  className="EmptyReturn-input"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                />
              </div>

              <div className="EmptyReturn-form-group">
                <label className="EmptyReturn-label">Product Name</label>
                <div className="EmptyReturn-checkbox-group">
                  {['20L', '15L', '10L'].map((size) => (
                    <label key={size} className="EmptyReturn-checkbox-label">
                      <input 
                        type="checkbox" 
                        className="EmptyReturn-checkbox" 
                        checked={returnProduct === size}
                        onChange={() => setReturnProduct(size)}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="EmptyReturn-form-group">
                <label className="EmptyReturn-label">Quantity</label>
                <div className="EmptyReturn-counter">
                  <button 
                    type="button" 
                    className="EmptyReturn-counter-btn"
                    onClick={() => setReturnQty(prev => Math.max(1, prev - 1))}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="EmptyReturn-counter-value">{returnQty}</span>
                  <button 
                    type="button" 
                    className="EmptyReturn-counter-btn"
                    onClick={() => setReturnQty(prev => prev + 1)}
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              <div className="EmptyReturn-form-group">
                <label className="EmptyReturn-label">Condition</label>
                <div className="EmptyReturn-radio-group">
                  {['Good', 'Not Returned', 'Average'].map((cond) => (
                    <label key={cond} className="EmptyReturn-radio-label">
                      <input 
                        type="radio" 
                        name="condition"
                        value={cond}
                        className="EmptyReturn-radio" 
                        checked={condition === cond}
                        onChange={(e) => setCondition(e.target.value)}
                      />
                      <span>{cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="EmptyReturn-form-group">
                <label className="EmptyReturn-label">Remarks (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Enter remarks..." 
                  className="EmptyReturn-input"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>

            </div>

            <div className="EmptyReturn-form-right">
              <img src={jarRight} alt="Water Jar Return" className="EmptyReturn-jar-img" />
            </div>

            <button type="submit" className={`EmptyReturn-submit-btn EmptyReturn-blue-btn ${isEditing ? 'EmptyReturn-edit-mode-btn' : ''}`}>
              {isEditing ? 'Update Return Details' : 'Save Return'}
            </button>
          </form>
        </div>

        {/* ================= DATA TABLE SECTION ================= */}
        <div className="EmptyReturn-table-section-card">
          <h3 className="EmptyReturn-table-section-title">Return Records Logs</h3>
          <div className="EmptyReturn-table-responsive-wrapper">
            <table className="EmptyReturn-custom-data-table">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Customer ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Condition</th>
                  <th>Remarks</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td><strong>{item.customerId}</strong></td>
                      <td>{item.productSize} Water Jar</td>
                      <td>{item.quantity}</td>
                      <td>
                        <span className={`EmptyReturn-status-badge EmptyReturn-cond-${item.condition.toLowerCase().replace(' ', '-')}`}>
                          {item.condition}
                        </span>
                      </td>
                      <td>{item.remarks}</td>
                      <td className="EmptyReturn-table-actions-cell">
                        <button 
                          className="EmptyReturn-action-btn EmptyReturn-edit-action" 
                          title="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit size={14} />
                        </button>
                        <button 
                          className="EmptyReturn-action-btn EmptyReturn-delete-action" 
                          title="Delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="EmptyReturn-empty-table-placeholder">
                      No matching records found. Submit entry records above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="EmptyReturn-table-pagination-container">
              <span className="EmptyReturn-pagination-info-text">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, returnsList.length)} of {returnsList.length} entries
              </span>
              <div className="EmptyReturn-pagination-button-group">
                <button 
                  className="EmptyReturn-pagination-nav-btn" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  <FaChevronLeft size={10} /> Prev
                </button>
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx + 1}
                    className={`EmptyReturn-pagination-number-btn ${currentPage === idx + 1 ? 'EmptyReturn-active-page' : ''}`}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button 
                  className="EmptyReturn-pagination-nav-btn" 
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

export default EmptyReturn;