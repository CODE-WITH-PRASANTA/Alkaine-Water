import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
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
  FaTrashAlt,
  FaStar,
  FaCheckCircle
} from 'react-icons/fa';

const initialPlans = [
  {
    id: 1,
    name: 'Basic Plan',
    subtext: '<p>Ideal 20 litre water supply near me home delivery...</p>',
    tags: ['MO', 'Popular'],
    price: '1,499',
    period: 'Monthly',
    bestFor: 'Home & Small Families',
    features: ['20L Bottled Water', 'Free Delivery', 'Weekly Schedule']
  },
  {
    id: 2,
    name: 'Premium Plan',
    subtext: '<p>Free express delivery and more benefits.</p>',
    tags: ['YR', 'Best Value'],
    price: '2,999',
    period: 'Yearly',
    bestFor: 'Best Value Annual Subscription',
    features: ['Unlimited Water', 'Express Delivery', 'Priority Support']
  },
  {
    id: 3,
    name: 'Advanced Plan',
    subtext: '<p>High-demand drinking water supply for corporate...</p>',
    tags: ['MO'],
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
  tags: [],
  bestFor: '',
  description: '',
  features: ['', '', '']
};

const SubscriptionForm = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [formData, setFormData] = useState(emptyForm);
  const [tagInput, setTagInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Pagination & Search Filter
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Field Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({ ...prev, description: content }));
  };

  // Tag Pill System
  const handleTagKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const formattedTag = tagInput.trim().replace(/^,/, '');
      if (!formData.tags.includes(formattedTag)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, formattedTag] }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Dynamic Features List
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
    setTagInput('');
    setIsEditing(false);
  };

  // Submission Management
  const handleSavePlan = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.period) return;

    const cleanedFeatures = formData.features.filter(f => f.trim() !== '');

    if (isEditing) {
      setPlans(plans.map(p => p.id === formData.id ? {
        ...formData,
        subtext: formData.description || p.subtext,
        features: cleanedFeatures
      } : p));
    } else {
      const newPlan = {
        ...formData,
        id: Date.now(),
        subtext: formData.description || '<p>Standard subscription package.</p>',
        features: cleanedFeatures
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
      tags: plan.tags || (plan.tag ? [plan.tag] : []),
      bestFor: plan.bestFor || '',
      description: plan.subtext || '',
      features: plan.features && plan.features.length ? plan.features : ['', '']
    });
  };

  const handleDelete = (id) => {
    setPlans(plans.filter(p => p.id !== id));
    if (formData.id === id) handleReset();
  };

  // Filtering & Pagination
  const filteredPlans = plans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.bestFor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPlans.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentPlans = filteredPlans.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="SubscriptionForm-container">
      {/* Form Section */}
      <div className="SubscriptionForm-card">
        <div className="SubscriptionForm-header">
          <h2>{isEditing ? 'Update Plan' : 'Add Subscription Plan'}</h2>
          <p>Configure plan structure and pricing options below.</p>
        </div>

        <form onSubmit={handleSavePlan} className="SubscriptionForm-body">
          {/* Row 1: Plan Name & Billing Period */}
          <div className="SubscriptionForm-row">
            <div className="SubscriptionForm-group">
              <label>Plan Name *</label>
              <div className="SubscriptionForm-input-wrapper">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="e.g. Pro Plan" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <FaRegIdCard className="SubscriptionForm-icon" />
              </div>
            </div>

            <div className="SubscriptionForm-group">
              <label>Billing Period *</label>
              <div className="SubscriptionForm-input-wrapper">
                <select 
                  name="period" 
                  value={formData.period} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled hidden>Select Period</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
                <FaRegCalendarAlt className="SubscriptionForm-icon" />
              </div>
            </div>
          </div>

          {/* Row 2: Price & Tag Inputs */}
          <div className="SubscriptionForm-row">
            <div className="SubscriptionForm-group">
              <label>Price (₹) *</label>
              <div className="SubscriptionForm-input-wrapper">
                <input 
                  type="text" 
                  name="price" 
                  placeholder="e.g. 1,499" 
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
                <FaRupeeSign className="SubscriptionForm-icon" />
              </div>
            </div>

            <div className="SubscriptionForm-group">
              <label>Tags / Badges (Press Enter)</label>
              <div className="SubscriptionForm-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Add tag..." 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
                <FaTag className="SubscriptionForm-icon" />
              </div>
              {formData.tags.length > 0 && (
                <div className="SubscriptionForm-tags-badge-list">
                  {formData.tags.map((tag, idx) => (
                    <span key={idx} className="SubscriptionForm-tag-pill">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)}>
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Row 3: Target Audience */}
          <div className="SubscriptionForm-group">
            <label>Best For</label>
            <div className="SubscriptionForm-input-wrapper">
              <input 
                type="text" 
                name="bestFor" 
                placeholder="e.g. Home & Small Families" 
                value={formData.bestFor}
                onChange={handleInputChange}
              />
              <FaStar className="SubscriptionForm-icon" />
            </div>
          </div>

          {/* TinyMCE Description Editor */}
          <div className="SubscriptionForm-group">
            <label>Description</label>
            <Editor
              tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.2/tinymce.min.js"
              value={formData.description}
              init={{
                height: 180,
                menubar: false,
                plugins: ['advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'table', 'code', 'help', 'wordcount'],
                toolbar: 'undo redo | blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
                content_style: 'body { font-family:Inter,sans-serif; font-size:13px }'
              }}
              onEditorChange={handleEditorChange}
            />
          </div>

          {/* Dynamic Feature List */}
          <div className="SubscriptionForm-group">
            <label>Included Features</label>
            <div className="SubscriptionForm-features-list">
              {formData.features.map((feature, index) => (
                <div key={index} className="SubscriptionForm-feature-item">
                  <FaGripLines className="SubscriptionForm-grip" />
                  <input 
                    type="text" 
                    placeholder={`Feature #${index + 1}`} 
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
              <FaPlus /> Add Feature Row
            </button>
          </div>

          {/* Form Actions */}
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

      {/* Subscription Table Section */}
      <div className="SubscriptionForm-card">
        <div className="SubscriptionForm-header SubscriptionForm-table-header">
          <div>
            <h2>Plans List</h2>
            <p>Manage existing pricing tiers and features.</p>
          </div>
        </div>

        {/* Search and Table Filters */}
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

        {/* Data Table */}
        <div className="SubscriptionForm-table-wrapper">
          <table className="SubscriptionForm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Plan Overview</th>
                <th>Tags</th>
                <th>Price</th>
                <th>Period</th>
                <th>Features</th>
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
                      <span className="SubscriptionForm-plan-audience">{plan.bestFor}</span>
                      <div 
                        className="SubscriptionForm-plan-desc-preview"
                        dangerouslySetInnerHTML={{ __html: plan.subtext }} 
                      />
                    </td>
                    <td>
                      <div className="SubscriptionForm-table-tags">
                        {plan.tags && plan.tags.length > 0 ? (
                          plan.tags.map((t, i) => (
                            <span key={i} className="SubscriptionForm-badge">{t}</span>
                          ))
                        ) : (
                          <span className="SubscriptionForm-no-data">-</span>
                        )}
                      </div>
                    </td>
                    <td className="SubscriptionForm-price-text">₹{plan.price}</td>
                    <td><span className="SubscriptionForm-period-badge">{plan.period}</span></td>
                    <td>
                      <ul className="SubscriptionForm-table-features">
                        {plan.features && plan.features.map((feat, fIdx) => (
                          <li key={fIdx}><FaCheckCircle className="check-icon" /> {feat}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="SubscriptionForm-actions-cell">
                      <button 
                        type="button" 
                        className="SubscriptionForm-action-edit"
                        onClick={() => handleEdit(plan)}
                        title="Edit Plan"
                      >
                        <FaPencilAlt />
                      </button>
                      <button 
                        type="button" 
                        className="SubscriptionForm-action-delete"
                        onClick={() => handleDelete(plan.id)}
                        title="Delete Plan"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="SubscriptionForm-empty-td">No active subscription plans found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
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