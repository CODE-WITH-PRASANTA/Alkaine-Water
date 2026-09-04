import React, { useState } from 'react';
import './Login.css';
import { 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiUser, 
  FiGlobe, 
  FiUserPlus, 
  FiLogIn, 
  FiChevronDown 
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

import logo from '../../assets/ALKA DROPS LOGO.png';
import waterBottleImg from '../../assets/water-1.png'; // Your 3D water bottle image

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log('Register Data:', formData);
    } else {
      console.log('Login Data:', { 
        email: formData.email, 
        password: formData.password, 
        rememberMe: formData.rememberMe 
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Left Water Branding Hero Section */}
        <div className="login-left-banner">
          
          {/* Ambient Lighting & Bubble Overlay Effects */}
          <div className="login-glow-effect"></div>
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
          <div className="bubble bubble-4"></div>

          {/* Top Brand Header */}
          <div className="login-brand-header">
            <div className="login-brand-logo-wrapper">
              <img src={logo} alt="AlkaDrops" className="login-brand-logo" />
              <div className="login-brand-text">
                <span className="login-brand-name">AlkaDrops</span>
                <span className="login-brand-tagline">PURE ALKALINE GOODNESS</span>
              </div>
            </div>
          </div>

          {/* Center Text Content */}
          <div className="login-banner-content">
            {!isSignUp ? (
              <>
                <span className="login-badge">AlkaDrops Portal</span>
                <h1 className="login-banner-title">Welcome Back</h1>
                <p className="login-banner-subtitle">
                  Login to manage your account, track orders and enjoy pure alkaline goodness.
                </p>
              </>
            ) : (
              <>
                <span className="login-badge">Join AlkaDrops</span>
                <h1 className="login-banner-title">Create Account</h1>
                <p className="login-banner-subtitle">
                  Join AlkaDrops today to enjoy pure alkaline hydration and easy order management.
                </p>
              </>
            )}
          </div>

          {/* Bottom Graphics Area */}
          <div className="login-water-graphics">
            <img
              src={waterBottleImg}
              alt="AlkaDrops Water Bottle Display"
              className="login-bottle-img"
            />
            
            {!isSignUp && (
              <button
                type="button"
                className="login-left-toggle-btn"
                onClick={handleToggleMode}
              >
                <FiUserPlus className="login-btn-icon" /> Create Account
              </button>
            )}
          </div>
        </div>

        {/* Right Form Section */}
        <div className="login-right-form">
          <div className="login-form-header">
            <h2 className="login-form-title">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </h2>
            <p className="login-form-subtitle">
              {isSignUp
                ? 'Create your account to get started.'
                : 'Welcome back! Please sign in to your account.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form-body">
            {isSignUp && (
              <div className="login-row">
                <div className="login-field-group">
                  <label className="login-label">First Name</label>
                  <div className="login-input-wrapper">
                    <FiUser className="login-input-icon" />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="login-input"
                      required
                    />
                  </div>
                </div>

                <div className="login-field-group">
                  <label className="login-label">Last Name</label>
                  <div className="login-input-wrapper">
                    <FiUser className="login-input-icon" />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="login-input"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="login-field-group">
              <label className="login-label">Email Address</label>
              <div className="login-input-wrapper">
                <FiMail className="login-input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="login-input"
                  required
                />
              </div>
            </div>

            {isSignUp && (
              <div className="login-field-group">
                <label className="login-label">Country</label>
                <div className="login-input-wrapper">
                  <FiGlobe className="login-input-icon" />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="login-input login-select"
                    required
                  >
                    <option value="" disabled hidden>
                      Select your country
                    </option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                  </select>
                  <FiChevronDown className="login-select-arrow" />
                </div>
              </div>
            )}

            <div className="login-field-group">
              <label className="login-label">Password</label>
              <div className="login-input-wrapper">
                <FiLock className="login-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder={isSignUp ? 'Create a password' : '••••••••'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="login-input"
                  required
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="login-options-row">
                <label className="login-remember-me">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <span>Remember Me</span>
                </label>
                <a href="#forgot" className="login-forgot-link">
                  Forgot Password?
                </a>
              </div>
            )}

            <button type="submit" className="login-submit-btn">
              {isSignUp ? (
                <>
                  <FiUserPlus className="login-btn-icon" /> Register
                </>
              ) : (
                <>
                  <FiLogIn className="login-btn-icon" /> Sign In
                </>
              )}
            </button>

            {!isSignUp && (
              <>
                <div className="login-divider">
                  <span>or</span>
                </div>

                <div className="login-social-group">
                  <button type="button" className="login-social-btn">
                    <FcGoogle className="login-social-icon" /> Sign in with Google
                  </button>
                  <button type="button" className="login-social-btn">
                    <FaFacebook className="login-social-icon fb" /> Sign in with Facebook
                  </button>
                </div>

                <p className="login-footer-text">
                  Don't have an account?{' '}
                  <span onClick={handleToggleMode} className="login-toggle-link">
                    Create Account
                  </span>
                </p>
              </>
            )}

            {isSignUp && (
              <p className="login-footer-text">
                Already have an account?{' '}
                <span onClick={handleToggleMode} className="login-toggle-link">
                  Sign In
                </span>
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;