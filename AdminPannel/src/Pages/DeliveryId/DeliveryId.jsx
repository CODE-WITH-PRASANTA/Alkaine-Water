import React, { useState, useEffect, useRef } from 'react';
import './DeliveryId.css';
import API from '../../api/axios';

// Inline SVG fallback avatar
const DEFAULT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="%23ccc"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-3.8-1.04-4.81-2.62.03-1.59 3.21-2.47 4.81-2.47s4.78.88 4.81 2.47C15.8 18.96 14.03 20 12 20z"/></svg>`;

const DeliveryId = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    aadharNo: '',
    address: '',
    email: '',
    salary: '',
    password: '',
    newPassword: '',
    profileImage: null,
    offerLetter: null,
    profileImagePreview: ''
  });

  const [deliveryList, setDeliveryList] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Password visibility states (default: false / hidden)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const profileImageInputRef = useRef(null);
  const offerLetterInputRef = useRef(null);

  const UPLOADS_BASE_URL = API.defaults.baseURL
    ? API.defaults.baseURL.replace(/\/api\/?$/, '') + '/uploads/'
    : 'http://localhost:5000/uploads/';

  // Fetch all delivery partners
  const fetchDeliveryPartners = async () => {
    try {
      const response = await API.get('/delivery');
      if (response.data?.success) {
        setDeliveryList(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching delivery partners:', error);
    }
  };

  useEffect(() => {
    fetchDeliveryPartners();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.delivery-id__dropdown-container')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      if (name === 'profileImage') {
        setFormData((prev) => ({
          ...prev,
          profileImage: file,
          profileImagePreview: URL.createObjectURL(file)
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: file }));
      }
    }
  };

  // Reset form to default state
  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      aadharNo: '',
      address: '',
      email: '',
      salary: '',
      password: '',
      newPassword: '',
      profileImage: null,
      offerLetter: null,
      profileImagePreview: ''
    });
    setEditId(null);
    setShowPassword(false);
    setShowConfirmPassword(false);

    if (profileImageInputRef.current) profileImageInputRef.current.value = '';
    if (offerLetterInputRef.current) offerLetterInputRef.current.value = '';
  };

  // Submit handler for Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editId) {
      if (!formData.profileImage) {
        alert('Please select a profile image before submitting.');
        return;
      }
      if (formData.password !== formData.newPassword) {
        alert('Password and Confirm Password do not match!');
        return;
      }
    } else {
      if (formData.password && formData.password !== formData.newPassword) {
        alert('Password and Confirm Password do not match!');
        return;
      }
    }

    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('aadharNo', formData.aadharNo);
    data.append('email', formData.email);
    data.append('address', formData.address);
    data.append('salary', formData.salary);

    if (formData.password && formData.password.trim() !== '') {
      data.append('password', formData.password);
    }

    if (formData.profileImage) {
      data.append('profileImage', formData.profileImage);
    }

    if (formData.offerLetter) {
      data.append('offerLetter', formData.offerLetter);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      if (editId) {
        const response = await API.put(`/delivery/${editId}`, data, config);
        if (response.data?.success) {
          alert('Delivery Partner Updated Successfully!');
        }
      } else {
        const response = await API.post('/delivery', data, config);
        if (response.data?.success) {
          alert(`Delivery Partner Registered Successfully! Assigned Login ID: ${response.data.data?.loginId || ''}`);
        }
      }

      resetForm();
      fetchDeliveryPartners();
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error);
      const serverMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Failed to complete request';
      alert(`Error: ${serverMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      name: item.name || '',
      phone: item.phone || '',
      aadharNo: item.aadharNo || '',
      address: item.address || '',
      email: item.email || '',
      salary: item.salary || '',
      password: '',
      newPassword: '',
      profileImage: null,
      offerLetter: null,
      profileImagePreview: item.profileImage ? `${UPLOADS_BASE_URL}${item.profileImage}` : ''
    });

    if (profileImageInputRef.current) profileImageInputRef.current.value = '';
    if (offerLetterInputRef.current) offerLetterInputRef.current.value = '';

    setOpenDropdownId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this delivery partner?')) return;

    try {
      const response = await API.delete(`/delivery/${id}`);
      if (response.data?.success) {
        alert('Partner Deleted Successfully!');
        fetchDeliveryPartners();
      }
    } catch (error) {
      console.error('Error deleting partner:', error);
      alert(error.response?.data?.message || 'Failed to delete partner');
    } finally {
      setOpenDropdownId(null);
    }
  };

  return (
    <div className="delivery-id">
      <h2 className="delivery-id__main-title">Delivery Partner Management</h2>

      <div className="delivery-id__container">
        {/* Form Section */}
        <section className="delivery-id__form-section">
          <h3 className="delivery-id__subtitle">
            {editId ? 'Edit Partner Details' : 'Add Partner Details'}
          </h3>
          <form className="delivery-id__form" onSubmit={handleSubmit}>
            <div className="delivery-id__form-group">
              <label className="delivery-id__label">Full Name</label>
              <input
                type="text"
                name="name"
                autoComplete="name"
                className="delivery-id__input"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="delivery-id__form-row">
              <div className="delivery-id__form-group">
                <label className="delivery-id__label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  className="delivery-id__input"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="delivery-id__form-group">
                <label className="delivery-id__label">Aadhaar Number</label>
                <input
                  type="text"
                  name="aadharNo"
                  autoComplete="off"
                  className="delivery-id__input"
                  placeholder="Enter Aadhaar number"
                  value={formData.aadharNo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="delivery-id__form-group">
              <label className="delivery-id__label">Email ID</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="delivery-id__input"
                placeholder="Enter mail ID"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="delivery-id__form-group">
              <label className="delivery-id__label">Address</label>
              <textarea
                name="address"
                autoComplete="street-address"
                className="delivery-id__textarea"
                rows="2"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="delivery-id__form-row">
              <div className="delivery-id__form-group">
                <label className="delivery-id__label">
                  Upload Profile Image {editId && '(Optional on Edit)'}
                </label>
                <input
                  ref={profileImageInputRef}
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  className="delivery-id__file-input"
                  onChange={handleFileChange}
                  required={!editId}
                />
              </div>

              <div className="delivery-id__form-group">
                <label className="delivery-id__label">Offer Letter (Optional)</label>
                <input
                  ref={offerLetterInputRef}
                  type="file"
                  name="offerLetter"
                  accept=".pdf,.doc,.docx"
                  className="delivery-id__file-input"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="delivery-id__form-group">
              <label className="delivery-id__label">Salary Per Day ($)</label>
              <input
                type="number"
                name="salary"
                autoComplete="off"
                className="delivery-id__input"
                placeholder="Enter salary per day"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Fields with Toggle */}
            <div className="delivery-id__form-row">
              <div className="delivery-id__form-group">
                <label className="delivery-id__label">
                  Password {editId && '(Leave blank to keep unchanged)'}
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="new-password"
                    className="delivery-id__input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!editId}
                    style={{ paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      color: '#666'
                    }}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? '👁️' : '🙈'}
                  </button>
                </div>
              </div>

              <div className="delivery-id__form-group">
                <label className="delivery-id__label">
                  Confirm Password {editId && '(Confirm only if updating password)'}
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="newPassword"
                    autoComplete="new-password"
                    className="delivery-id__input"
                    placeholder="Confirm password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required={!editId}
                    style={{ paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      color: '#666'
                    }}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? '👁️' : '🙈'}
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                className="delivery-id__submit-btn"
                disabled={loading}
              >
                {loading ? 'Processing...' : editId ? 'Update Partner Details' : 'Submit Details'}
              </button>

              {editId && (
                <button
                  type="button"
                  className="delivery-id__submit-btn"
                  style={{ backgroundColor: '#6c757d' }}
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Table Section */}
        <section className="delivery-id__table-section">
          <h3 className="delivery-id__subtitle">Registered Partners</h3>

          <div className="delivery-id__table-wrapper">
            <table className="delivery-id__table">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Login ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Aadhaar No</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Salary/Day</th>
                  <th>Offer Letter</th>
                  <th className="delivery-id__th-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveryList.length > 0 ? (
                  deliveryList.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={
                            item.profileImage
                              ? `${UPLOADS_BASE_URL}${item.profileImage}`
                              : DEFAULT_AVATAR
                          }
                          alt="Profile"
                          className="delivery-id__avatar"
                          onError={(e) => {
                            e.target.src = DEFAULT_AVATAR;
                          }}
                        />
                      </td>
                      <td><strong>{item.loginId || 'N/A'}</strong></td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.aadharNo}</td>
                      <td>{item.email}</td>
                      <td className="delivery-id__cell-truncate">{item.address}</td>
                      <td>${item.salary}</td>
                      <td>
                        {item.offerLetter ? (
                          <a
                            href={`${UPLOADS_BASE_URL}${item.offerLetter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td className="delivery-id__action-cell">
                        <div className="delivery-id__dropdown-container">
                          <button
                            type="button"
                            className={`delivery-id__action-btn ${
                              openDropdownId === item._id ? 'delivery-id__action-btn--active' : ''
                            }`}
                            onClick={(e) => toggleDropdown(item._id, e)}
                            aria-label="Actions menu"
                          >
                            &#8942;
                          </button>

                          {openDropdownId === item._id && (
                            <div className="delivery-id__dropdown-menu">
                              <button
                                type="button"
                                className="delivery-id__dropdown-item"
                                onClick={() => handleEdit(item)}
                              >
                                <span className="delivery-id__dropdown-icon">&#9998;</span> Edit
                              </button>
                              <button
                                type="button"
                                className="delivery-id__dropdown-item delivery-id__dropdown-item--danger"
                                onClick={() => handleDelete(item._id)}
                              >
                                <span className="delivery-id__dropdown-icon">&#128465;</span> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="delivery-id__no-data">
                      No records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DeliveryId;