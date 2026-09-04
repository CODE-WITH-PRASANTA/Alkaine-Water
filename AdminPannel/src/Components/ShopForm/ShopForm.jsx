import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import API, { IMG_URL } from '../../api/axios';
import './ShopForm.css';
import { 
  FaRegIdCard, 
  FaCloudUploadAlt, 
  FaRupeeSign, 
  FaChevronDown, 
  FaTag, 
  FaStar, 
  FaUndo, 
  FaPaperPlane, 
  FaSearch, 
  FaPencilAlt, 
  FaTrashAlt, 
  FaTimes,
  FaPercent,
  FaBoxes,
  FaEye,
  FaPlus,
  FaSpinner,
  FaSyncAlt
} from 'react-icons/fa';

const emptyForm = {
  id: null,
  name: '',
  description: '',
  price: '',
  discount: '0',
  finalPrice: '0.00',
  category: '',
  type: '',
  tags: [],
  rating: 5,
};

const resolveImageUrl = (img) => {
  if (!img) return 'https://via.placeholder.com/80/e2e8f0/000000?text=No+Img';
  if (img.startsWith('blob:') || img.startsWith('http://') || img.startsWith('https://')) {
    return img;
  }
  const cleanPath = img.replace(/^\/?uploads\//, '').replace(/^(\.\/|\/)/, '');
  return `${IMG_URL}/uploads/${cleanPath}`;
};

const ShopForm = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [tagInput, setTagInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // File uploads and preview states
  const [imageFiles, setImageFiles] = useState([]); // New File objects to upload
  const [existingImages, setExistingImages] = useState([]); // Existing relative paths from DB
  const [imagePreviews, setImagePreviews] = useState([]); // [{ url, isFile, fileIndex, existingIndex }]

  // Pagination & Filter States
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all shop products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get('/shop/all');
      let list = [];
      if (res.data && res.data.success && Array.isArray(res.data.products)) {
        list = res.data.products;
      } else if (res.data && Array.isArray(res.data.data)) {
        list = res.data.data;
      } else if (Array.isArray(res.data)) {
        list = res.data;
      }
      setProducts(list);
    } catch (err) {
      console.error('Error fetching shop products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-calculation for Price, Discount, and Final Price
  useEffect(() => {
    const originalPrice = parseFloat(formData.price) || 0;
    const discountPct = parseFloat(formData.discount) || 0;

    if (originalPrice >= 0) {
      const calculatedFinal = originalPrice - (originalPrice * (discountPct / 100));
      setFormData(prev => ({
        ...prev,
        finalPrice: calculatedFinal > 0 ? calculatedFinal.toFixed(2) : '0.00'
      }));
    }
  }, [formData.price, formData.discount]);

  // Input Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({ ...prev, description: content }));
  };

  const handleRatingClick = (rate) => {
    setFormData(prev => ({ ...prev, rating: rate }));
  };

  // Add Tag Helper
  const addCurrentTag = () => {
    const clean = tagInput.trim().replace(/^,+|,+$/g, '');
    if (clean && !formData.tags.includes(clean)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, clean] }));
    }
    setTagInput('');
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addCurrentTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Image Upload Handlers
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newFiles = [...imageFiles, ...files];
    setImageFiles(newFiles);

    // Build previews
    const newPreviews = files.map((file, idx) => ({
      url: URL.createObjectURL(file),
      isFile: true,
      fileRef: file
    }));

    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    const itemToRemove = imagePreviews[index];
    if (!itemToRemove) return;

    if (itemToRemove.isFile) {
      setImageFiles(prev => prev.filter(f => f !== itemToRemove.fileRef));
    } else {
      setExistingImages(prev => prev.filter((_, i) => i !== itemToRemove.existingIndex));
    }

    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setFormData(emptyForm);
    setTagInput('');
    setIsEditing(false);
    setImageFiles([]);
    setExistingImages([]);
    setImagePreviews([]);
    setStatusMessage(null);
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill in required fields (Name, Base Price, and Category).');
      return;
    }

    // Capture uncommitted tag if any
    let currentTags = [...formData.tags];
    const cleanTag = tagInput.trim().replace(/^,+|,+$/g, '');
    if (cleanTag && !currentTags.includes(cleanTag)) {
      currentTags.push(cleanTag);
    }

    try {
      setSubmitting(true);
      setStatusMessage({ type: 'info', text: 'Saving product...' });

      const data = new FormData();
      data.append('name', formData.name.trim());
      data.append('category', formData.category.trim());
      data.append('type', formData.type || '');
      data.append('price', formData.price);
      data.append('discount', formData.discount || '0');
      data.append('finalPrice', formData.finalPrice);
      data.append('description', formData.description || '');
      data.append('rating', formData.rating || 5);

      // Append tags
      currentTags.forEach(t => data.append('tags', t));

      // Append existing retained images
      data.append('existingImages', JSON.stringify(existingImages));

      // Append newly uploaded files
      imageFiles.forEach(file => {
        data.append('images', file);
      });

      let res;
      if (isEditing && formData.id) {
        res = await API.put(`/shop/${formData.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await API.post('/shop/create', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (res.data && res.data.success) {
        setStatusMessage({
          type: 'success',
          text: isEditing ? 'Product updated successfully!' : 'Product added successfully!'
        });
        await fetchProducts();
        handleReset();
      } else {
        throw new Error(res.data?.message || 'Failed to save product');
      }
    } catch (err) {
      console.error('Error saving shop product:', err);
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || err.message || 'Error saving product'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setStatusMessage(null);

    const rawImages = Array.isArray(product.images) ? product.images : [];
    setExistingImages(rawImages);
    setImageFiles([]);

    const previews = rawImages.map((imgPath, idx) => ({
      url: resolveImageUrl(imgPath),
      isFile: false,
      existingIndex: idx,
      path: imgPath
    }));
    setImagePreviews(previews);

    setFormData({
      id: product._id || product.id,
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      discount: product.discount !== undefined ? String(product.discount) : '0',
      finalPrice: product.finalPrice !== undefined ? String(product.finalPrice) : '0.00',
      category: product.category || '',
      type: product.type || '',
      tags: Array.isArray(product.tags) ? product.tags : [],
      rating: product.rating || 5
    });

    // Scroll smoothly to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      setLoading(true);
      const res = await API.delete(`/shop/${id}`);
      if (res.data && res.data.success) {
        setProducts(prev => prev.filter(p => (p._id || p.id) !== id));
        if (formData.id === id) handleReset();
      } else {
        alert(res.data?.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert(err.response?.data?.message || err.message || 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  // Search & Pagination Filtering
  const filteredProducts = products.filter(product => {
    const q = searchTerm.toLowerCase();
    const nameMatch = (product.name || '').toLowerCase().includes(q);
    const catMatch = (product.category || '').toLowerCase().includes(q);
    const typeMatch = (product.type || '').toLowerCase().includes(q);
    const tagMatch = Array.isArray(product.tags) && product.tags.some(t => t.toLowerCase().includes(q));
    return nameMatch || catMatch || typeMatch || tagMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="ShopForm-container">
      {/* Form Section */}
      <div className="ShopForm-card">
        <div className="ShopForm-header">
          <div>
            <h2>{isEditing ? 'Update Product' : 'Add New Product'}</h2>
            <p>Fill in the product information and upload high quality images.</p>
          </div>
          {isEditing && (
            <button type="button" className="ShopForm-btn-reset" onClick={handleReset} style={{ margin: 0 }}>
              Cancel Edit
            </button>
          )}
        </div>

        {statusMessage && (
          <div style={{
            padding: '12px 16px',
            margin: '0 30px 20px 30px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            backgroundColor: statusMessage.type === 'success' ? '#dcfce7' : statusMessage.type === 'error' ? '#fee2e2' : '#e0f2fe',
            color: statusMessage.type === 'success' ? '#166534' : statusMessage.type === 'error' ? '#991b1b' : '#075985',
            border: `1px solid ${statusMessage.type === 'success' ? '#bbf7d0' : statusMessage.type === 'error' ? '#fecaca' : '#bae6fd'}`
          }}>
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="ShopForm-body">
          {/* 1. Product Name */}
          <div className="ShopForm-group">
            <label>Product Name *</label>
            <div className="ShopForm-input-wrapper">
              <input 
                type="text" 
                name="name" 
                placeholder="Enter product name" 
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <FaRegIdCard className="ShopForm-icon" />
            </div>
          </div>

          {/* 2. Product Images */}
          <div className="ShopForm-group">
            <label>Product Images (Upload to uploads/shop) *</label>
            <div className="ShopForm-upload-box">
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                id="ShopForm-file-input" 
                onChange={handleFileUpload} 
                style={{ display: 'none' }} 
              />
              <label htmlFor="ShopForm-file-input" className="ShopForm-upload-label">
                <FaCloudUploadAlt className="ShopForm-upload-icon" />
                <span>Drag & drop multiple images here or click to browse</span>
              </label>
            </div>

            {imagePreviews.length > 0 && (
              <div className="ShopForm-image-preview-list">
                {imagePreviews.map((item, index) => (
                  <div key={index} className="ShopForm-image-preview-item">
                    <img src={item.url} alt="Preview" />
                    <button 
                      type="button" 
                      className="ShopForm-image-remove-btn" 
                      onClick={() => handleRemoveImage(index)}
                      title="Remove image"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. TinyMCE Description */}
          <div className="ShopForm-group">
            <label>Description</label>
            <Editor
              tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.2/tinymce.min.js"
              value={formData.description}
              init={{
                height: 220,
                menubar: false,
                plugins: ['advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'table', 'code', 'help', 'wordcount'],
                toolbar: 'undo redo | blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
              onEditorChange={handleEditorChange}
            />
          </div>

          {/* 4. Original Price */}
          <div className="ShopForm-group">
            <label>Price (₹) *</label>
            <div className="ShopForm-input-wrapper">
              <input 
                type="number" 
                name="price" 
                placeholder="Enter base price" 
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="any"
              />
              <FaRupeeSign className="ShopForm-icon" />
            </div>
          </div>

          {/* 5. Discount Percentage */}
          <div className="ShopForm-group">
            <label>Discount (%)</label>
            <div className="ShopForm-input-wrapper">
              <input 
                type="number" 
                name="discount" 
                placeholder="Enter discount percentage" 
                value={formData.discount}
                onChange={handleInputChange}
                min="0"
                max="100"
                step="any"
              />
              <FaPercent className="ShopForm-icon" />
            </div>
          </div>

          {/* 6. Calculated Final Price */}
          <div className="ShopForm-group">
            <label>Final Price (₹) [Auto Calculated]</label>
            <div className="ShopForm-input-wrapper">
              <input 
                type="text" 
                name="finalPrice" 
                value={formData.finalPrice}
                readOnly
                className="read-only-input"
              />
              <FaRupeeSign className="ShopForm-icon" />
            </div>
          </div>

          {/* 7. Category Dropdown */}
          <div className="ShopForm-group">
            <label>Category *</label>
            <div className="ShopForm-input-wrapper">
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange}
                required
              >
                <option value="" disabled hidden>Select category</option>
                <option value="Water Bottle">Water Bottle</option>
                <option value="Accessories">Accessories</option>
                <option value="Dispensers">Dispensers</option>
                <option value="Purifiers">Purifiers</option>
                <option value="Jars">Jars</option>
              </select>
              <FaChevronDown className="ShopForm-icon" />
            </div>
          </div>

          {/* 8. Product Type */}
          <div className="ShopForm-group">
            <label>Product Type</label>
            <div className="ShopForm-input-wrapper">
              <input 
                type="text" 
                name="type" 
                placeholder="e.g. Alkaline, Purified, Insulated" 
                value={formData.type}
                onChange={handleInputChange}
              />
              <FaBoxes className="ShopForm-icon" />
            </div>
          </div>

          {/* 9. Tags System */}
          <div className="ShopForm-group">
            <label>Tags (Type and press Enter, Comma, or click Add)</label>
            <div className="ShopForm-input-wrapper" style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="e.g. New, Bestseller, 20L" 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={addCurrentTag}
              />
              <button 
                type="button" 
                onClick={addCurrentTag}
                style={{
                  background: '#004ea8',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0 16px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <FaPlus /> Add
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="ShopForm-tag-container" style={{ marginTop: '10px' }}>
                {formData.tags.map((tag, idx) => (
                  <span key={idx} className="ShopForm-tag-pill">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)}>
                      <FaTimes />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 10. Rating */}
          <div className="ShopForm-group">
            <label>Rating *</label>
            <div className="ShopForm-rating-wrapper">
              <div className="ShopForm-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar 
                    key={star} 
                    className={`ShopForm-star ${star <= formData.rating ? 'active' : ''}`}
                    onClick={() => handleRatingClick(star)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Form Controls */}
          <div className="ShopForm-actions">
            <button type="button" className="ShopForm-btn-reset" onClick={handleReset} disabled={submitting}>
              <FaUndo /> Reset
            </button>
            <button type="submit" className="ShopForm-btn-submit" disabled={submitting}>
              {submitting ? (
                <>
                  <FaSpinner className="fa-spin" /> {isEditing ? 'Updating...' : 'Saving...'}
                </>
              ) : (
                <>
                  <FaPaperPlane /> {isEditing ? 'Update Product' : 'Submit Product'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Product List Table Section */}
      <div className="ShopForm-card">
        <div className="ShopForm-header ShopForm-table-header">
          <div>
            <h2>Product Catalog</h2>
            <p>Manage inventory details, images, and live pricing.</p>
          </div>
          <button 
            type="button" 
            onClick={fetchProducts} 
            className="ShopForm-btn-reset" 
            style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}
            title="Refresh list"
          >
            <FaSyncAlt className={loading ? 'fa-spin' : ''} /> Refresh
          </button>
        </div>

        <div className="ShopForm-controls">
          <div className="ShopForm-show-entries">
            Show 
            <select 
              value={entriesPerPage} 
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            entries
          </div>

          <div className="ShopForm-search">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="button" className="ShopForm-search-btn">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="ShopForm-table-wrapper">
          <table className="ShopForm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Product Info</th>
                <th>Category / Type</th>
                <th>Tags</th>
                <th>Price Details</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    <FaSpinner className="fa-spin" style={{ fontSize: '24px', marginBottom: '8px' }} />
                    <div>Loading catalog from database...</div>
                  </td>
                </tr>
              ) : currentProducts.length > 0 ? (
                currentProducts.map((product, index) => {
                  const prodId = product._id || product.id;
                  const firstImg = Array.isArray(product.images) && product.images[0]
                    ? resolveImageUrl(product.images[0])
                    : 'https://via.placeholder.com/50/e2e8f0/000000?text=No+Img';

                  return (
                    <tr key={prodId}>
                      <td>{startIndex + index + 1}</td>
                      <td>
                        <img 
                          src={firstImg} 
                          alt={product.name} 
                          className="ShopForm-table-img" 
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50/e2e8f0/000000?text=No+Img';
                          }}
                        />
                      </td>
                      <td className="ShopForm-name-cell">
                        <span className="ShopForm-prod-title">{product.name}</span>
                        {product.images && product.images.length > 1 && (
                          <span style={{ fontSize: '11px', color: '#004ea8', display: 'block', fontWeight: '600' }}>
                            +{product.images.length - 1} more images
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="badge-stack">
                          <span className="ShopForm-badge category-badge">{product.category}</span>
                          {product.type && <span className="ShopForm-badge type-badge">{product.type}</span>}
                        </div>
                      </td>
                      <td>
                        <div className="table-tags-wrapper">
                          {Array.isArray(product.tags) && product.tags.map((t, i) => (
                            <span key={i} className="ShopForm-badge tag-badge">{t}</span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="ShopForm-price-cell">
                          <span className="ShopForm-current-price">₹{product.finalPrice}</span>
                          {product.discount > 0 && (
                            <span className="ShopForm-old-price">
                              <del>₹{product.price}</del> ({product.discount}% OFF)
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="ShopForm-table-stars">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <FaStar key={s} className={s <= (product.rating || 5) ? 'active' : ''} />
                          ))}
                        </div>
                      </td>
                      <td className="ShopForm-actions-cell">
                        <button 
                          type="button" 
                          className="ShopForm-action-view"
                          title="View Details"
                          onClick={() => setViewProduct(product)}
                        >
                          <FaEye />
                        </button>
                        <button 
                          type="button" 
                          className="ShopForm-action-edit"
                          title="Edit Product"
                          onClick={() => handleEdit(product)}
                        >
                          <FaPencilAlt />
                        </button>
                        <button 
                          type="button" 
                          className="ShopForm-action-delete"
                          title="Delete Product"
                          onClick={() => handleDelete(prodId)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="ShopForm-empty-td">No matching products found in database</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="ShopForm-footer">
          <div className="ShopForm-showing-info">
            Showing {filteredProducts.length ? startIndex + 1 : 0} to {Math.min(startIndex + entriesPerPage, filteredProducts.length)} of {filteredProducts.length} entries
          </div>
          <div className="ShopForm-pagination">
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

      {/* Product Details View Modal Overlay */}
      {viewProduct && (
        <div className="ShopForm-modal-backdrop" onClick={() => setViewProduct(null)}>
          <div className="ShopForm-modal" onClick={e => e.stopPropagation()}>
            <div className="ShopForm-modal-header">
              <h3>{viewProduct.name}</h3>
              <button className="close-btn" onClick={() => setViewProduct(null)}><FaTimes /></button>
            </div>
            <div className="ShopForm-modal-body">
              <div className="modal-gallery" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {Array.isArray(viewProduct.images) && viewProduct.images.length > 0 ? (
                  viewProduct.images.map((img, i) => (
                    <img 
                      key={i} 
                      src={resolveImageUrl(img)} 
                      alt="Product" 
                      style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    />
                  ))
                ) : (
                  <p style={{ color: '#64748b' }}>No images available</p>
                )}
              </div>
              <div className="modal-details">
                <p><strong>Category:</strong> {viewProduct.category}</p>
                <p><strong>Type:</strong> {viewProduct.type || 'N/A'}</p>
                <p><strong>Original Price:</strong> ₹{viewProduct.price}</p>
                <p><strong>Discount:</strong> {viewProduct.discount || 0}%</p>
                <p><strong>Final Price:</strong> ₹{viewProduct.finalPrice}</p>
                <p><strong>Rating:</strong> {viewProduct.rating || 5} / 5</p>
                {Array.isArray(viewProduct.tags) && viewProduct.tags.length > 0 && (
                  <p><strong>Tags:</strong> {viewProduct.tags.join(', ')}</p>
                )}
                <div style={{ marginTop: '15px' }}>
                  <strong>Description:</strong>
                  <div 
                    className="desc-preview" 
                    dangerouslySetInnerHTML={{ __html: viewProduct.description || '<em>No description provided</em>' }} 
                    style={{ marginTop: '8px', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopForm;