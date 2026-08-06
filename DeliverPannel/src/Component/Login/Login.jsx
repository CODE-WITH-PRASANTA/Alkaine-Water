import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';
import API from "../../api/axios"; 

import alkaDropsLogo from '../../assets/ALKA DROPS LOGO.png';
import rightSideGraphic from '../../assets/gemini-svg (1).svg';

const Login = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Clear previous session on load & retrieve remembered credentials
  useEffect(() => {
    sessionStorage.removeItem('isAdminAuthenticated');
    sessionStorage.removeItem('deliveryPartner');

    const savedLoginId = localStorage.getItem('deliveryLoginId');
    if (savedLoginId) {
      setLoginId(savedLoginId);
      setRememberMe(true);
    }
  }, []);

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await API.post('/delivery/login', {
        loginId: loginId.trim(),
        password: password,
      });

      const data = response.data;

      if (data.success) {
        setLoginSuccess(true);
        
        // Store session authentication state
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        sessionStorage.setItem('deliveryPartner', JSON.stringify(data.data));

        if (rememberMe) {
          localStorage.setItem('deliveryLoginId', loginId.trim());
        } else {
          localStorage.removeItem('deliveryLoginId');
        }

        setTimeout(() => {
          navigate('/wdms/dashboard', { replace: true });
        }, 1000);
      }
    } catch (error) {
      console.error('Login Error:', error);
      setIsSubmitting(false);
      setLoginSuccess(false);

      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Server connection error. Please ensure the backend is running.');
      }
    }
  };

  return (
    <div className="Login-container">
      <div className="Login-card">
        {/* Left Side: Form Section */}
        <div className="Login-left">
          <div className="Login-brand-header">
            {alkaDropsLogo ? (
              <img
                src={alkaDropsLogo}
                alt="Alka Drops Logo"
                className="Login-logo-img"
              />
            ) : (
              <div className="Login-logo-fallback">AD</div>
            )}
            <div className="Login-brand-text">
              <span className="Login-brand-title">ALKA DROPS</span>
              <span className="Login-brand-subtitle">BEST SOFTWARE SOLUTION</span>
            </div>
          </div>

          <div className="Login-header">
            <h1 className="Login-title">Delivery Partner Login</h1>
            <p className="Login-subtitle">Enter your auto-generated Login ID and Password.</p>
          </div>

          {loginSuccess && (
            <div className="Login-toast Login-toast-success">
              <span>✓ Login Successful! Redirecting to dashboard...</span>
            </div>
          )}

          {errorMessage && (
            <div className="Login-toast Login-toast-error">
              <span>✗ {errorMessage}</span>
            </div>
          )}

          <form className="Login-form" onSubmit={handleSubmit}>
            <div className="Login-input-group">
              <label className="Login-label">Login ID (e.g. DB1001)</label>
              <input
                type="text"
                placeholder="Enter Login ID (e.g., DB1001)"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="Login-input"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="Login-input-group">
              <label className="Login-label">Password</label>
              <div className="Login-password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="Login-input"
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="button"
                  className="Login-password-toggle"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="Login-options">
              <label className="Login-remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="Login-checkbox"
                />
                Remember Me
              </label>
              <a href="#forgot" className="Login-forgot-link">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="Login-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          <p className="Login-footer-text">
            © {new Date().getFullYear()} ALKA DROPS. All rights reserved.
          </p>
        </div>

        {/* Right Side Graphic */}
        <div className="Login-right">
          <div className="Login-image-wrapper">
            <img
              src={rightSideGraphic}
              alt="Alka Drops Graphic"
              className="Login-right-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;