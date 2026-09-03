import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
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
  FaEye
} from 'react-icons/fa';

const initialProducts = [
  {
    id: 1,
    name: 'Reverse Osmosis Pro',
    description: '<p>Pure, family-sized alkaline water enriched with vital minerals...</p>',
    category: 'Water Bottle',
    tags: ['New', 'Bestseller'],
    type: 'Alkaline',
    price: '500',
    discount: '10',
    finalPrice: '450.00',
    rating: 5,
    images: ['https://via.placeholder.com/80/e2e8f0/000000?text=Bottle1']
  },
  {
    id: 2,
    name: 'Whisper Spring 0.75L',
    description: '<p>Pure spring hydration for everyday use.</p>',
    category: 'Water Bottle',
    tags: ['Sale'],
    type: 'Spring Water',
    price: '300',
    discount: '15',
    finalPrice: '255.00',
    rating: 4,
    images: ['https://via.placeholder.com/80/e2e8f0/000000?text=Bottle2']
  }
];

const emptyForm = {
  id: null,
  name: '',
  images: [],
  description: '',
  price: '',
  discount: '',
  finalPrice: '',
  category: '',
  type: '',
  tags: [],
  rating: 0
};

const ShopForm = () => {
  const [products, setProducts] = useState(initialProducts);
  const [formData, setFormData] = useState(emptyForm);
  const [tagInput, setTagInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);

  // Pagination & Filter States
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Multiple Tags Logic
  const handleTagKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^,/, '');
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
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
    setTagInput('');
    setIsEditing(false);
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) return;

    if (isEditing) {
      setProducts(products.map(p => p.id === formData.id ? { ...formData } : p));
    } else {
      const newProduct = {
        ...formData,
        id: Date.now(),
        images: formData.images.length > 0 ? formData.images : ['https://via.placeholder.com/80/e2e8f0/000000?text=No+Img']
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
      images: product.images || [],
      description: product.description || '',
      price: product.price || '',
      discount: product.discount || '',
      finalPrice: product.finalPrice || '',
      category: product.category || '',
      type: product.type || '',
      tags: product.tags || [],
      rating: product.rating || 0
    });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    if (formData.id === id) handleReset();
  };

  // Search & Pagination Filtering
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.type && product.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredProducts.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="ShopForm-container">
      {/* Form Section */}
      <div className="ShopForm-card">
        <div className="ShopForm-header">
          <h2>{isEditing ? 'Update Product' : 'Add New Product'}</h2>
          <p>Fill in the product information line-by-line.</p>
        </div>

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
              </label>
            </div>

            {formData.images.length > 0 && (
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
              </div>
            )}
          </div>

          {/* 3. TinyMCE Description */}
          <div className="ShopForm-group">
            <label>Description *</label>
            <Editor
              tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.2/tinymce.min.js"
              value={formData.description}
              init={{
                height: 200,
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
            <label>Tags (Press Enter or comma to add)</label>
            <div className="ShopForm-input-wrapper">
              <input 
                type="text" 
                placeholder="Type tag and press Enter" 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
              />
              <FaTag className="ShopForm-icon" />
            </div>
            {formData.tags.length > 0 && (
              <div className="ShopForm-tag-container">
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
            <button type="button" className="ShopForm-btn-reset" onClick={handleReset}>
              <FaUndo /> Reset
            </button>
            <button type="submit" className="ShopForm-btn-submit">
              <FaPaperPlane /> {isEditing ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      {/* Product List Table Section */}
      <div className="ShopForm-card">
        <div className="ShopForm-header ShopForm-table-header">
          <div>
            <h2>Product Catalog</h2>
            <p>Manage inventory details and pricing.</p>
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
                <th>Product Info</th>
                <th>Category / Type</th>
                <th>Tags</th>
                <th>Price Details</th>
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
                        src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/50'} 
                        alt={product.name} 
                        className="ShopForm-table-img" 
                      />
                    </td>
                    <td className="ShopForm-name-cell">
                      <span className="ShopForm-prod-title">{product.name}</span>
                    </td>
                    <td>
                      <div className="badge-stack">
                        <span className="ShopForm-badge category-badge">{product.category}</span>
                        {product.type && <span className="ShopForm-badge type-badge">{product.type}</span>}
                      </div>
                    </td>
                    <td>
                      <div className="table-tags-wrapper">
                        {product.tags && product.tags.map((t, i) => (
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
                          <FaStar key={s} className={s <= product.rating ? 'active' : ''} />
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
                        onClick={() => handleDelete(product.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="ShopForm-empty-td">No matching products found</td>
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
              <div className="modal-gallery">
                {viewProduct.images.map((img, i) => (
                  <img key={i} src={img} alt="Product" />
                ))}
              </div>
              <div className="modal-details">
                <p><strong>Category:</strong> {viewProduct.category}</p>
                <p><strong>Type:</strong> {viewProduct.type || 'N/A'}</p>
                <p><strong>Original Price:</strong> ₹{viewProduct.price}</p>
                <p><strong>Discount:</strong> {viewProduct.discount}%</p>
                <p><strong>Final Price:</strong> ₹{viewProduct.finalPrice}</p>
                <div>
                  <strong>Description:</strong>
                  <div className="desc-preview" dangerouslySetInnerHTML={{ __html: viewProduct.description }} />
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