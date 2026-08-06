const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Public
const createProduct = async (req, res) => {
  try {
    const { name, size, cost, dealer, retail, tax, status } = req.body;

    // Validation for required fields
    if (!name || !size || cost === undefined || dealer === undefined || retail === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (name, size, cost, dealer, retail)'
      });
    }

    const newProduct = await Product.create({
      name,
      size,
      cost,
      dealer,
      retail,
      tax: tax || 0,
      status: status || 'Active'
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  getProducts,
  createProduct
};