import React, { useState } from 'react';
import './SubscriptionForm.css';
import { 
  FaRegIdCard, 
  FaRegCalendarAlt, 
  FaRupeeSign, 
  FaTag, 
  FaGripLines, 
  FaTimes, 
  FaPlus, 
  FaUndo, 
  FaRegSave, 
  FaSearch, 
  FaPencilAlt, 
  FaTrashAlt 
} from 'react-icons/fa';

const initialPlans = [
  {
    id: 1,
    name: 'Basic Plan',
    subtext: 'Ideal 20 litre water supply near me home delivery...',
    tag: 'MO',
    price: '1,499',
    period: 'Monthly',
    bestFor: 'Home & Small Families',
    features: ['20L Bottled Water', 'Free Delivery', 'Weekly Schedule']
  },
  {
    id: 2,
    name: 'Premium Plan',
    subtext: 'Free express delivery and more benefits.',
    tag: 'YR',
    price: '2,999',
    period: 'Yearly',
    bestFor: 'Best Value Annual Subscription',
    features: ['Unlimited Water', 'Express Delivery', 'Priority Support']
  },
  {
    id: 3,
    name: 'Advanced Plan',
    subtext: 'High-demand drinking water supply for corporate...',
    tag: 'MO',
    price: '2,199',
    period: 'Monthly',
    bestFor: 'Workplaces, Gyms & Studios',
    features: ['Corporate Dispensers', 'Daily Bulk Delivery']
  }
];

const emptyForm = {
  id: null,
  name: '',
  period: '',
  price: '',
  tag: '',
  bestFor: '',
  description: '',
  features: ['', '', '', '']
};

const SubscriptionForm = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  // Pagination & Filter States
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };

  const handleAddFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };

  const handleReset = () => {
    setFormData(emptyForm);
    setIsEditing(false);
  };

  const handleSavePlan = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    if (isEditing) {
      setPlans(plans.map(p => p.id === formData.id ? {
        ...formData,
        subtext: formData.description || p.subtext
      } : p));
    } else {
      const newPlan = {
        ...formData,
        id: Date.now(),
        subtext: formData.description || 'Custom plan package',
        period: formData.period || 'Monthly'
      };
      setPlans([...plans, newPlan]);
    }

    handleReset();
  };

  const handleEdit = (plan) => {
    setIsEditing(true);
    setFormData({
      id: plan.id,
      name: plan.name || '',
      period: plan.period || '',
      price: plan.price || '',
      tag: plan.tag || '',
      bestFor: plan.bestFor || '',
      description: plan.subtext || '',
      features: plan.features && plan.features.length ? plan.features : ['', '', '', '']
    });
  };

  const handleDelete = (id) => {
    setPlans(plans.filter(p => p.id !== id));
    if (formData.id === id) handleReset();
  };

  // Search & Pagination Logic
  const filteredPlans = plans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.bestFor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPlans.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentPlans = filteredPlans.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="SubscriptionForm-container">
      {/* Left Column - Form Card */}
      <div className="SubscriptionForm-card">
        <div className="SubscriptionForm-header">
          <h2>Add / Update Plan</h2>
          <p>Fill in the details to add a new subscription plan.</p>
        </div>

        <form onSubmit={handleSavePlan} className="SubscriptionForm-body">
          <div className="SubscriptionForm-group">
            <label>Plan Name</label>
            <div className="SubscriptionForm-input-wrapper">
              <input 
                type="text" 
                name="name" 
                placeholder="Enter plan name" 
                value={formData.name}
                onChange={handleInputChange}
              />
              <FaRegIdCard className="SubscriptionForm-icon" />
            </div>
          </div>

          <div className="SubscriptionForm-group">
            <label>Billing Period</label>
            <div className="SubscriptionForm-input-wrapper">
              <select 
                name="period" 
                value={formData.period} 
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>Select billing period</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
              <FaRegCalendarAlt className="SubscriptionForm-icon" />
            </div>
          </div>

          <div className="SubscriptionForm-group">
            <label>Price (₹)</label>
            <div className="SubscriptionForm-input-wrapper">
              <input 
                type="text" 
                name="price" 
                placeholder="Enter price" 
                value={formData.price}
                onChange={handleInputChange}
              />
              <FaRupeeSign className="SubscriptionForm-icon" />
            </div>
          </div>

          <div className="SubscriptionForm-group">
            <label>Tag / Badge</label>
            <div className="SubscriptionForm-input-wrapper">
              <input 
                type="text" 
                name="tag" 
                placeholder="e.g. MO, YR" 
                value={formData.tag}
                onChange={handleInputChange}
              />
              <FaTag className="SubscriptionForm-icon" />
            </div>
          </div>

          <div className="SubscriptionForm-group">
            <label>Best For</label>
            <input 
              type="text" 
              name="bestFor" 
              placeholder="e.g. Home & Small Families" 
              value={formData.bestFor}
              onChange={handleInputChange}
              className="SubscriptionForm-standalone-input"
            />
          </div>

          <div className="SubscriptionForm-group">
            <label>Description</label>
            <textarea 
              name="description" 
              placeholder="Enter plan description" 
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="SubscriptionForm-group">
            <label>Features</label>
            <div className="SubscriptionForm-features-list">
              {formData.features.map((feature, index) => (
                <div key={index} className="SubscriptionForm-feature-item">
                  <FaGripLines className="SubscriptionForm-grip" />
                  <input 
                    type="text" 
                    placeholder="Enter feature" 
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="SubscriptionForm-remove-btn" 
                    onClick={() => handleRemoveFeature(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
            <button 
              type="button" 
              className="SubscriptionForm-add-feature-btn" 
              onClick={handleAddFeature}
            >
              <FaPlus /> Add Feature
            </button>
          </div>

          <div className="SubscriptionForm-actions">
            <button type="button" className="SubscriptionForm-btn-reset" onClick={handleReset}>
              <FaUndo /> Reset
            </button>
            <button type="submit" className="SubscriptionForm-btn-save">
              <FaRegSave /> {isEditing ? 'Update Plan' : 'Save Plan'}
            </button>
          </div>
        </form>
      </div>

      {/* Right Column - Table Card */}
      <div className="SubscriptionForm-card">
        <div className="SubscriptionForm-header SubscriptionForm-table-header">
          <div>
            <h2>Plans List</h2>
            <p>View and manage all subscription plans.</p>
          </div>
        </div>

        <div className="SubscriptionForm-controls">
          <div className="SubscriptionForm-show-entries">
            Show 
            <select 
              value={entriesPerPage} 
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            entries
          </div>

          <div className="SubscriptionForm-search">
            <input 
              type="text" 
              placeholder="Search plans..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="button" className="SubscriptionForm-search-btn">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="SubscriptionForm-table-wrapper">
          <table className="SubscriptionForm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Plan Name</th>
                <th>Tag</th>
                <th>Price (₹)</th>
                <th>Period</th>
                <th>Best For</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPlans.length > 0 ? (
                currentPlans.map((plan, index) => (
                  <tr key={plan.id}>
                    <td>{startIndex + index + 1}</td>
                    <td className="SubscriptionForm-name-cell">
                      <span className="SubscriptionForm-plan-title">{plan.name}</span>
                      <span className="SubscriptionForm-plan-desc">{plan.subtext}</span>
                    </td>
                    <td>
                      {plan.tag && (
                        <span className={`SubscriptionForm-tag ${plan.tag === 'YR' ? 'yr' : 'mo'}`}>
                          {plan.tag}
                        </span>
                      )}
                    </td>
                    <td>{plan.price}</td>
                    <td>{plan.period}</td>
                    <td>{plan.bestFor}</td>
                    <td className="SubscriptionForm-actions-cell">
                      <button 
                        type="button" 
                        className="SubscriptionForm-action-edit"
                        onClick={() => handleEdit(plan)}
                      >
                        <FaPencilAlt />
                      </button>
                      <button 
                        type="button" 
                        className="SubscriptionForm-action-delete"
                        onClick={() => handleDelete(plan.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="SubscriptionForm-empty-td">No plans found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="SubscriptionForm-footer">
          <div className="SubscriptionForm-showing-info">
            Showing {filteredPlans.length ? startIndex + 1 : 0} to {Math.min(startIndex + entriesPerPage, filteredPlans.length)} of {filteredPlans.length} entries
          </div>
          <div className="SubscriptionForm-pagination">
            <button 
              type="button" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                className={currentPage === page ? 'active' : ''}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button 
              type="button" 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;