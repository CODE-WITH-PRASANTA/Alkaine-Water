import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import API from '../../api/axios';
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
  FaCheckCircle,
  FaSpinner
} from 'react-icons/fa';

const emptyForm = {
  _id: null,
  name: '',
  period: '',
  price: '',
  tags: [],
  bestFor: '',
  description: '',
  features: ['', '', '']
};

const SubscriptionForm = () => {
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [tagInput, setTagInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Pagination & Search Filter
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all subscription plans from backend
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await API.get('/subscription/all');
      let dataList = [];
      if (res.data && res.data.success && Array.isArray(res.data.plans)) {
        dataList = res.data.plans;
      } else if (res.data && Array.isArray(res.data.data)) {
        dataList = res.data.data;
      } else if (Array.isArray(res.data)) {
        dataList = res.data;
      }
      setPlans(dataList);
    } catch (error) {
      console.error('Error fetching /subscription/all, trying fallback /subscription:', error);
      try {
        const fallbackRes = await API.get('/subscription');
        let dataList = [];
        if (fallbackRes.data && fallbackRes.data.success && Array.isArray(fallbackRes.data.plans)) {
          dataList = fallbackRes.data.plans;
        } else if (fallbackRes.data && Array.isArray(fallbackRes.data.data)) {
          dataList = fallbackRes.data.data;
        } else if (Array.isArray(fallbackRes.data)) {
          dataList = fallbackRes.data;
        }
        setPlans(dataList);
      } catch (err) {
        console.error('Fallback fetch error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Field Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({ ...prev, description: content }));
  };

  // Tag Pill System
  const addTagItems = (inputStr) => {
    if (!inputStr || !inputStr.trim()) return;
    const rawItems = inputStr.split(/[,;\s]+/);
    const newTags = [];
    rawItems.forEach((item) => {
      const clean = item.trim().replace(/^,+/, '').replace(/,+$/, '').trim();
      if (clean && !formData.tags.includes(clean) && !newTags.includes(clean)) {
        newTags.push(clean);
      }
    });

    if (newTags.length > 0) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, ...newTags]
      }));
    }
    setTagInput('');
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTagItems(tagInput);
    }
  };

  const handleTagBlur = () => {
    if (tagInput.trim()) {
      addTagItems(tagInput);
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
    setFormData(prev => ({ ...prev, features: updatedFeatures.length ? updatedFeatures : [''] }));
  };

  const handleReset = () => {
    setFormData(emptyForm);
    setTagInput('');
    setIsEditing(false);
  };

  // Submission Management (Create / Update in Database)
  const handleSavePlan = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.period) {
      alert('Please fill in Plan Name, Billing Period, and Price.');
      return;
    }

    // Merge any leftover text from tagInput
    let finalTags = [...(formData.tags || [])];
    if (tagInput.trim()) {
      const extraTags = tagInput
        .split(/[,;\s]+/)
        .map(t => t.trim().replace(/^,+/, '').replace(/,+$/, '').trim())
        .filter(Boolean);
      extraTags.forEach(t => {
        if (!finalTags.includes(t)) finalTags.push(t);
      });
    }

    const cleanedFeatures = (formData.features || [])
      .map(f => String(f).trim())
      .filter(f => f.length > 0);

    const payload = {
      name: formData.name.trim(),
      period: formData.period,
      price: formData.price.trim(),
      tags: finalTags,
      bestFor: formData.bestFor.trim(),
      description: formData.description || '',
      features: cleanedFeatures
    };

    setSubmitting(true);
    try {
      if (isEditing && formData._id) {
        const res = await API.put(`/subscription/${formData._id}`, payload);
        if (res.data && res.data.success) {
          alert('Subscription plan updated successfully!');
          fetchPlans();
          handleReset();
        }
      } else {
        const res = await API.post('/subscription/create', payload);
        if (res.data && res.data.success) {
          alert('Subscription plan created successfully!');
          fetchPlans();
          handleReset();
        }
      }
    } catch (error) {
      console.error('Error saving subscription plan:', error);
      alert(error.response?.data?.message || 'Failed to save subscription plan.');
    } finally {
      setSubmitting(false);
    }
  };

  // Edit Action (fetches real plan data by ID)
  const handleEdit = async (plan) => {
    const planId = plan._id || plan.id;
    if (!planId) return;

    setIsEditing(true);
    try {
      const res = await API.get(`/subscription/${planId}`);
      const activePlan = (res.data && res.data.success && (res.data.plan || res.data.data)) || plan;

      setFormData({
        _id: activePlan._id || activePlan.id,
        name: activePlan.name || '',
        period: activePlan.period || 'Monthly',
        price: activePlan.price || '',
        tags: Array.isArray(activePlan.tags) ? activePlan.tags : [],
        bestFor: activePlan.bestFor || '',
        description: activePlan.description || activePlan.subtext || '',
        features: Array.isArray(activePlan.features) && activePlan.features.length ? activePlan.features : ['', '']
      });
      setTagInput('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching plan by ID:', error);
      // Fallback to locally passed plan data
      setFormData({
        _id: planId,
        name: plan.name || '',
        period: plan.period || 'Monthly',
        price: plan.price || '',
        tags: Array.isArray(plan.tags) ? plan.tags : [],
        bestFor: plan.bestFor || '',
        description: plan.description || plan.subtext || '',
        features: Array.isArray(plan.features) && plan.features.length ? plan.features : ['', '']
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Delete Action
  const handleDelete = async (planId) => {
    if (!planId) return;
    if (window.confirm('Are you sure you want to delete this subscription plan?')) {
      try {
        const res = await API.delete(`/subscription/${planId}`);
        if (res.data && res.data.success) {
          alert('Subscription plan deleted successfully!');
          fetchPlans();
          if (formData._id === planId) handleReset();
        }
      } catch (error) {
        console.error('Error deleting subscription plan:', error);
        alert(error.response?.data?.message || 'Failed to delete subscription plan.');
      }
    }
  };

  // Filtering & Pagination
  const filteredPlans = (Array.isArray(plans) ? plans : []).filter(plan => {
    const name = plan?.name ? String(plan.name).toLowerCase() : '';
    const bestFor = plan?.bestFor ? String(plan.bestFor).toLowerCase() : '';
    const period = plan?.period ? String(plan.period).toLowerCase() : '';
    const search = searchTerm.toLowerCase();

    return (
      name.includes(search) ||
      bestFor.includes(search) ||
      period.includes(search)
    );
  });

  const totalPages = Math.ceil(filteredPlans.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentPlans = filteredPlans.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="SubscriptionForm-container">
      {/* Form Section */}
      <div className="SubscriptionForm-card">
        <div className="SubscriptionForm-header">
          <div>
            <h2>{isEditing ? 'Update Plan' : 'Add Subscription Plan'}</h2>
            <p>Configure plan structure, pricing tiers, and included features.</p>
          </div>
          {isEditing && (
            <button type="button" className="SubscriptionForm-remove-btn" style={{ padding: '6px 12px', width: 'auto', borderRadius: '6px' }} onClick={handleReset}>
              <FaTimes /> Cancel Editing
            </button>
          )}
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
                  placeholder="e.g. Basic Plan, Pro Plan" 
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
                  <option value="Weekly">Weekly</option>
                  <option value="Daily">Daily</option>
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
              <label>Tags / Badges (Press Enter, Comma, or click + Add)</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="SubscriptionForm-input-wrapper" style={{ flex: 1 }}>
                  <input 
                    type="text" 
                    placeholder="e.g. MO, Popular, Best Value..." 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    onBlur={handleTagBlur}
                  />
                  <FaTag className="SubscriptionForm-icon" />
                </div>
                <button 
                  type="button" 
                  className="SubscriptionForm-btn-save" 
                  style={{ padding: '0 16px', height: '42px', whiteSpace: 'nowrap' }}
                  onClick={() => addTagItems(tagInput)}
                >
                  + Add
                </button>
              </div>

              {formData.tags && formData.tags.length > 0 && (
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
            <button type="submit" className="SubscriptionForm-btn-save" disabled={submitting}>
              {submitting ? (
                <>
                  <FaSpinner className="fa-spin" /> Saving...
                </>
              ) : (
                <>
                  <FaRegSave /> {isEditing ? 'Update Plan' : 'Save Plan'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Subscription Table Section */}
      <div className="SubscriptionForm-card">
        <div className="SubscriptionForm-header SubscriptionForm-table-header">
          <div>
            <h2>Plans List</h2>
            <p>Manage existing pricing tiers and features in the database.</p>
          </div>
          <button 
            type="button" 
            className="SubscriptionForm-btn-reset" 
            style={{ padding: '8px 16px' }}
            onClick={fetchPlans}
          >
            Refresh List
          </button>
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
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px' }}>
                    <FaSpinner className="fa-spin" style={{ fontSize: '24px', color: '#2563eb' }} />
                    <div style={{ marginTop: '8px', color: '#64748b' }}>Loading plans from database...</div>
                  </td>
                </tr>
              ) : currentPlans.length > 0 ? (
                currentPlans.map((plan, index) => {
                  const planId = plan._id || plan.id;
                  return (
                    <tr key={planId}>
                      <td>{startIndex + index + 1}</td>
                      <td className="SubscriptionForm-name-cell">
                        <span className="SubscriptionForm-plan-title">{plan.name}</span>
                        <span className="SubscriptionForm-plan-audience">{plan.bestFor || '-'}</span>
                        <div 
                          className="SubscriptionForm-plan-desc-preview"
                          dangerouslySetInnerHTML={{ __html: plan.description || plan.subtext || '' }} 
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
                      <td><span className="SubscriptionForm-period-badge">{plan.period || 'Monthly'}</span></td>
                      <td>
                        <ul className="SubscriptionForm-table-features">
                          {plan.features && plan.features.length > 0 ? (
                            plan.features.map((feat, fIdx) => (
                              <li key={fIdx}><FaCheckCircle className="check-icon" /> {feat}</li>
                            ))
                          ) : (
                            <span className="SubscriptionForm-no-data">-</span>
                          )}
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
                          onClick={() => handleDelete(planId)}
                          title="Delete Plan"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  );
                })
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