const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { fullName, address, phone, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists.' });
    }

    // Create new user profile (In production, hash password using bcrypt here)
    const newUser = new User({
      fullName,
      address,
      phone,
      email,
      password // Plain text for demo mapping; use bcrypt.hash in production
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Account registered successfully! Please login with your details.'
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for hardcoded master admin credentials
    if (email === 'alkadrops' && password === '12345') {
      const mockJWTToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo2NjYiLCJyb2xlIjoiYWRtaW4ifQ";
      return res.status(200).json({
        success: true,
        message: 'Credentials verified! Opening dashboard...',
        token: mockJWTToken,
        role: 'admin'
      });
    }

    // Check in Database for registered users
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid ID or Password.' });
    }

    const mockJWTToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY3VzdG9tZXIiLCJyb2xlIjoidXNlciJ9";
    
    res.status(200).json({
      success: true,
      message: 'Credentials verified! Opening dashboard...',
      token: mockJWTToken,
      role: 'user'
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

module.exports = {
  registerUser,
  loginUser
};