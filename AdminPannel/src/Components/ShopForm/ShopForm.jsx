import React, { useState } from 'react';
import './ShopForm.css';
import { 
  FaRegIdCard, 
  FaCloudUploadAlt, 
  FaPlus, 
  FaDollarSign, 
  FaChevronDown, 
  FaTag, 
  FaStar, 
  FaUndo, 
  FaPaperPlane, 
  FaSearch, 
  FaPencilAlt, 
  FaTrashAlt, 
  FaTimes 
} from 'react-icons/fa';

const initialProducts = [
  {
    id: 1,
    name: 'Reverse Osmosis Pro',
    description: 'Pure, family-sized alkaline water enriched with vital minerals...',
    category: 'Water',
    tag: 'New',
    price: '6.49',
    oldPrice: '7.00',
    rating: 5,
    images: ['https://via.placeholder.com/50/e2e8f0/000000?text=Bottle1']
  },
  {
    id: 2,
    name: 'Whisper Spring 0.75L',
    description: 'Pure, family-sized alkaline water enriched with vital minerals...',
    category: 'Water',
    tag: 'Sale',
    price: '3.99',
    oldPrice: '',
    rating: 5,
    images: ['https://via.placeholder.com/50/e2e8f0/000000?text=Bottle2']
  },
  {
    id: 3,
    name: 'Additional Cartridges Pro',
    description: 'Pure, family-sized alkaline water enriched with vital minerals...',
    category: 'Accessories',
    tag: 'Featured',
    price: '5.49',
    oldPrice: '',
    rating: 5,
    images: ['https://via.placeholder.com/50/e2e8f0/000000?text=Bottle3']
  },
  {
    id: 4,
    name: 'Mineral Boost 1L',
    description: 'Daily hydration with essential minerals for energy.',
    category: 'Water',
    tag: 'New',
    price: '4.29',
    oldPrice: '',
    rating: 5,
    images: ['https://via.placeholder.com/50/e2e8f0/000000?text=Bottle4']
  },
  {
    id: 5,
    name: 'Alkaline Pure 2L',
    description: 'High pH alkaline water for better hydration and wellness.',
    category: 'Water',
    tag: 'Sale',
    price: '7.99',
    oldPrice: '9.50',
    rating: 5,
    images: ['https://via.placeholder.com/50/e2e8f0/000000?text=Bottle5']
  }
];

const emptyForm = {
  id: null,
  name: '',
  images: [
    'https://via.placeholder.com/50/e2e8f0/000000?text=B1',
    'https://via.placeholder.com/50/e2e8f0/000000?text=B2',
    'https://via.placeholder.com/50/e2e8f0/000000?text=B3'
  ],
  description: '',
  price: '',
  category: '',
  tag: '',
  rating: 0
};

const ShopForm = () => {
  const [products, setProducts] = useState(initialProducts);
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  // Pagination & Filter States
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Input Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rate) => {
    setFormData(prev => ({ ...prev, rating: rate }));
  };

  const handleRemoveTag = () => {
    setFormData(prev => ({ ...prev, tag: '' }));
  };

  // Image Upload Handlers
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImageUrls = files.map(file => URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImageUrls] }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleReset = () => {
    setFormData(emptyForm);
    setIsEditing(false);
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    if (isEditing) {
      setProducts(products.map(p => p.id === formData.id ? { ...formData } : p));
    } else {
      const newProduct = {
        ...formData,
        id: Date.now(),
        images: formData.images.length > 0 ? formData.images : ['https://via.placeholder.com/50/e2e8f0/000000?text=Item']
      };
      setProducts([...products, newProduct]);
    }

    handleReset();
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setFormData({
      id: product.id,
      name: product.name || '',
      images: product.images && product.images.length ? product.images : [],
      description: product.description || '',
      price: product.price || '',
      category: product.category || '',
      tag: product.tag || '',
      rating: product.rating || 0
    });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    if (formData.id === id) handleReset();
  };

  // Search & Pagination Logic
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="ShopForm-container">
      {/* Left Card: Form */}
      <div className="ShopForm-card">
        <div className="ShopForm-header">
          <h2>Add / Update Product</h2>
          <p>Fill in the details to add a new product.</p>
        </div>

        <form onSubmit={handleSubmit} className="ShopForm-body">
          {/* Product Name */}
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

          {/* Product Images */}
          <div className="ShopForm-group">
            <label>Product Images *</label>
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
                <span>Drag & drop images here or click to browse</span>
                <small>You can upload multiple images (JPG, PNG, WEBP)</small>
              </label>
            </div>

            {/* Images List Preview */}
            <div className="ShopForm-image-preview-list">
              {formData.images.map((imgSrc, index) => (
                <div key={index} className="ShopForm-image-preview-item">
                  <img src={imgSrc} alt="Preview" />
                  <button 
                    type="button" 
                    className="ShopForm-image-remove-btn" 
                    onClick={() => handleRemoveImage(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              <label htmlFor="ShopForm-file-input" className="ShopForm-add-more-box">
                <FaPlus className="ShopForm-add-more-icon" />
                <span>Add More</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="ShopForm-group">
            <label>Description *</label>
            <div className="ShopForm-textarea-wrapper">
              <textarea 
                name="description" 
                placeholder="Enter product description" 
                value={formData.description}
                onChange={handleInputChange}
                maxLength={500}
                rows={3}
                required
              />
              <span className="ShopForm-char-count">{formData.description.length} / 500</span>
            </div>
          </div>

          {/* Price & Category Grid */}
          <div className="ShopForm-row">
            <div className="ShopForm-group ShopForm-col">
              <label>Price ($) *</label>
              <div className="ShopForm-input-wrapper">
                <input 
                  type="text" 
                  name="price" 
                  placeholder="Enter price" 
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
                <FaDollarSign className="ShopForm-icon" />
              </div>
            </div>

            <div className="ShopForm-group ShopForm-col">
              <label>Category *</label>
              <div className="ShopForm-input-wrapper">
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled hidden>Select category</option>
                  <option value="Water">Water</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Dispensers">Dispensers</option>
                </select>
                <FaChevronDown className="ShopForm-icon" />
              </div>
            </div>
          </div>

          {/* Tag & Rating Grid */}
          <div className="ShopForm-row">
            <div className="ShopForm-group ShopForm-col">
              <label>Tag / Badge</label>
              <div className="ShopForm-input-wrapper">
                <input 
                  type="text" 
                  name="tag" 
                  placeholder="e.g. New, Sale, Featured" 
                  value={formData.tag}
                  onChange={handleInputChange}
                />
                {formData.tag ? (
                  <button 
                    type="button" 
                    className="ShopForm-tag-clear-btn" 
                    onClick={handleRemoveTag}
                  >
                    <FaTimes />
                  </button>
                ) : (
                  <FaTag className="ShopForm-icon" />
                )}
              </div>
            </div>

            <div className="ShopForm-group ShopForm-col">
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
                <span className="ShopForm-rating-text">(Select rating)</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="ShopForm-actions">
            <button type="button" className="ShopForm-btn-reset" onClick={handleReset}>
              <FaUndo /> Reset
            </button>
            <button type="submit" className="ShopForm-btn-submit">
              <FaPaperPlane /> {isEditing ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      {/* Right Card: Table */}
      <div className="ShopForm-card">
        <div className="ShopForm-header ShopForm-table-header">
          <div>
            <h2>Product List</h2>
            <p>View and manage all products.</p>
          </div>
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
                <th>Product Name</th>
                <th>Category</th>
                <th>Tag</th>
                <th>Price ($)</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>
                      <img 
                        src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/40'} 
                        alt={product.name} 
                        className="ShopForm-table-img" 
                      />
                    </td>
                    <td className="ShopForm-name-cell">
                      <span className="ShopForm-prod-title">{product.name}</span>
                      <span className="ShopForm-prod-desc">{product.description}</span>
                    </td>
                    <td>
                      <span className={`ShopForm-badge category-${product.category.toLowerCase()}`}>
                        {product.category}
                      </span>
                    </td>
                    <td>
                      {product.tag && (
                        <span className={`ShopForm-badge tag-${product.tag.toLowerCase()}`}>
                          {product.tag}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="ShopForm-price-cell">
                        <span className="ShopForm-current-price">${product.price}</span>
                        {product.oldPrice && <span className="ShopForm-old-price">${product.oldPrice}</span>}
                      </div>
                    </td>
                    <td>
                      <div className="ShopForm-table-stars">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <FaStar key={s} className={s <= product.rating ? 'active' : ''} />
                        ))}
                      </div>
                    </td>
                    <td className="ShopForm-actions-cell">
                      <button 
                        type="button" 
                        className="ShopForm-action-edit"
                        onClick={() => handleEdit(product)}
                      >
                        <FaPencilAlt />
                      </button>
                      <button 
                        type="button" 
                        className="ShopForm-action-delete"
                        onClick={() => handleDelete(product.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="ShopForm-empty-td">No products found</td>
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
    </div>
  );
};

export default ShopForm;