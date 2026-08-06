import React, { useState, useEffect } from 'react';
import './ProductandPrice.css';
import API from '../../api/axios';

const ProductandPrice = () => {
  // Products State (Product & Price table itself)
  const [products, setProducts] = useState([]);

  // Products pulled from Stock Management (/manage) — used to populate the
  // Product dropdown in the Add/Update popup so it reflects real inventory
  // instead of a hardcoded bottle-size list.
  const [stockProducts, setStockProducts] = useState([]);
  const [loadingStockProducts, setLoadingStockProducts] = useState(true);

  // Loading and Error States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // पॉपअप फॉर्म की स्टेट
  const [isModalOpen, setIsModalOpen] = useState(false);

  // फॉर्म इनपुट स्टेट्स
  const [formData, setFormData] = useState({
    productName: '',
    productCode: '',
    size: '20 L',
    costPrice: '',
    dealerPrice: '',
    retailPrice: '',
    tax: 0,
    status: 'Active'
  });

  // Fetch Products from Backend using pre-configured API instance on Component Mount
  useEffect(() => {
    fetchProducts();
    fetchStockProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get('/products');

      // Handle both standard axios response structure ({ data: ... }) or direct result
      const result = response.data;

      if (result.success) {
        setProducts(result.data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      console.error('Error connecting to backend:', err);
      setError('Could not connect to the server. Make sure your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch the real product catalog from Stock Management (same endpoint
  // ManageStock.jsx uses: GET /manage) so the popup's Product dropdown lists
  // actual inventory instead of a fixed set of bottle sizes.
  const fetchStockProducts = async () => {
    try {
      setLoadingStockProducts(true);
      const response = await API.get('/manage');

      let items = [];
      if (response.data?.success && Array.isArray(response.data.data)) {
        items = response.data.data;
      } else if (Array.isArray(response.data)) {
        items = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        items = response.data.data;
      }

      setStockProducts(items);
    } catch (err) {
      console.error('Error fetching products from Stock Management:', err);
      setStockProducts([]);
    } finally {
      setLoadingStockProducts(false);
    }
  };

  // इनपुट चेंज हैंडलर
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Product selection now also carries the product's code/SKU along,
  // since it's coming from the real Stock Management catalog.
  const handleProductSelect = (e) => {
    const selectedId = e.target.value;
    const selectedProduct = stockProducts.find(
      (item) => (item._id || item.id) === selectedId
    );

    setFormData((prev) => ({
      ...prev,
      productName: selectedProduct ? selectedProduct.product : '',
      productCode: selectedProduct ? (selectedProduct.productCode || '') : ''
    }));
  };

  // फॉर्म सबमिट (Save) हैंडलर - Connected to Backend POST API via Axios instance
  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.productName) {
      alert('Please select a product!');
      return;
    }

    // Payload matching backend model expectations
    const newProductPayload = {
      name: formData.productName,
      productCode: formData.productCode,
      size: formData.size,
      cost: parseFloat(formData.costPrice) || 0,
      dealer: parseFloat(formData.dealerPrice) || 0,
      retail: parseFloat(formData.retailPrice) || 0,
      tax: parseInt(formData.tax) || 0,
      status: formData.status
    };

    try {
      const response = await API.post('/products', newProductPayload);
      const result = response.data;

      if (result.success) {
        // Append newly created database product to UI state
        setProducts([result.data, ...products]);
        closeModal();
      } else {
        alert('Error: ' + result.message);
      }
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Failed to save product to backend server.');
    }
  };

  // पॉपअप बंद करने का फंक्शन
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      productName: '',
      productCode: '',
      size: '20 L',
      costPrice: '',
      dealerPrice: '',
      retailPrice: '',
      tax: 0,
      status: 'Active'
    });
  };

  // CSV डाउनलोड करने का वर्किंग फंक्शन
  const handleDownloadCSV = () => {
    const headers = ['Product', 'Size', 'Cost Price (₹)', 'Dealer Price (₹)', 'Retail Price (₹)', 'Tax (%)', 'Status'];

    const csvRows = products.map(prod =>
      [
        `"${prod.name}"`,
        `"${prod.size}"`,
        prod.cost.toFixed(2),
        prod.dealer.toFixed(2),
        prod.retail.toFixed(2),
        `${prod.tax}%`,
        prod.status
      ].join(',')
    );

    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'product_price_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="component-container">
      {/* HEADER WITH DOWNLOAD BUTTON */}
      <div className="card-header-wrapper">
        <div className="card-header">
          <h2>4. PRODUCT & PRICE CONTROL</h2>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="download-csv-btn"
            onClick={handleDownloadCSV}
          >
            <svg className="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CSV
          </button>
        </div>
      </div>

      <div className="card-body">
        {/* Error or Loading state handling */}
        {loading && <p style={{ textAlign: 'center', padding: '20px' }}>Loading products from database...</p>}
        {error && <p style={{ textAlign: 'center', color: 'red', padding: '20px' }}>{error}</p>}

        {/* टेबल कंटेनर - रिस्पॉन्सिव स्क्रॉल के लिए */}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th className="text-right">Cost Price</th>
                  <th className="text-right">Dealer Price</th>
                  <th className="text-right">Retail Price</th>
                  <th className="text-right">Tax (%)</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>No products found. Add one using the button below.</td>
                  </tr>
                ) : (
                  products.map((prod) => (
                    <tr key={prod._id || prod.id}>
                      <td>{prod.name}</td>
                      <td>{prod.size}</td>
                      <td className="text-right">₹{prod.cost.toFixed(2)}</td>
                      <td className="text-right">₹{prod.dealer.toFixed(2)}</td>
                      <td className="text-right">₹{prod.retail.toFixed(2)}</td>
                      <td className="text-right">{prod.tax}%</td>
                      <td className="text-center">
                        <span className={`status-badge ${prod.status.toLowerCase()}`}>
                          {prod.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Add / Update Product बटन */}
        <div className="btn-container">
          <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>
            Add / Update Product
          </button>
        </div>
      </div>

      {/* स्मूथ पॉपअप फॉर्म (Modal) */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={closeModal}>
        <div className={`modal-content ${isModalOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
          <h3>Product & Price Details</h3>
          <hr className="modal-divider" />

          <form onSubmit={handleSave}>
            <div className="form-grid">
              {/* Product Dropdown - Fetched from Stock Management (/manage) */}
              <div className="form-group">
                <label>Product</label>
                <select
                  name="productName"
                  value={
                    stockProducts.find((p) => p.product === formData.productName)?._id ||
                    stockProducts.find((p) => p.product === formData.productName)?.id ||
                    ''
                  }
                  onChange={handleProductSelect}
                  required
                >
                  <option value="" disabled>
                    {loadingStockProducts ? 'Loading products...' : 'Select Product'}
                  </option>
                  {stockProducts.map((item) => {
                    const productId = item._id || item.id;
                    return (
                      <option key={productId} value={productId}>
                        {item.product}{item.productCode ? ` (${item.productCode})` : ''}
                      </option>
                    );
                  })}
                </select>
                {stockProducts.length === 0 && !loadingStockProducts && (
                  <small style={{ color: '#f59e0b', display: 'block', marginTop: '4px' }}>
                    ⚠️ No products found. Add products in Stock Management first.
                  </small>
                )}
              </div>

              {/* Size Dropdown */}
              <div className="form-group">
                <label>Size</label>
                <select name="size" value={formData.size} onChange={handleInputChange}>
                  <option value="20 L">20 L</option>
                  <option value="10 L">10 L</option>
                  <option value="5 L">5 L</option>
                  <option value="1 L">1 L</option>
                  <option value="500 ml">500 ml</option>
                </select>
              </div>

              {/* Cost Price */}
              <div className="form-group">
                <label>Cost Price (₹)</label>
                <input
                  type="number"
                  name="costPrice"
                  placeholder="Enter Cost Price"
                  value={formData.costPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Dealer Price */}
              <div className="form-group">
                <label>Dealer Price (₹)</label>
                <input
                  type="number"
                  name="dealerPrice"
                  placeholder="Enter Dealer Price"
                  value={formData.dealerPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Retailer Price */}
              <div className="form-group">
                <label>Retailer Price (₹)</label>
                <input
                  type="number"
                  name="retailPrice"
                  placeholder="Enter Retail Price"
                  value={formData.retailPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Tax (%) */}
              <div className="form-group">
                <label>Tax (%)</label>
                <input
                  type="number"
                  name="tax"
                  placeholder="Enter Tax percentage"
                  value={formData.tax}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Action (Status Active/Inactive Dropdown) */}
              <div className="form-group full-width">
                <label>Action (Status)</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Save & Cancel Buttons */}
            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductandPrice;