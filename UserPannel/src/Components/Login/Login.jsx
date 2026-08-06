import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaRegSquare,
  FaCheckSquare,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserPlus
} from 'react-icons/fa';
import { TbGridDots } from 'react-icons/tb';
import './Login.css';

import alkaDropsLogo from "../../assets/ALKA DROPS LOGO.png";

const Login = () => {
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerData, setRegisterData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = (mode) => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsRegistering(mode === 'register');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setSubmitting(true);

    try {
      const response = await API.post('/auth/login', {
        email: loginUsername,
        password: loginPassword
      });

      if (response.data?.success) {
        setSuccessMessage(response.data.message || 'Credentials verified! Opening dashboard...');
const { token, role } = response.data;

const storage = rememberMe ? localStorage : sessionStorage;

storage.setItem('authToken', token);
storage.setItem('isAdminAuthenticated', 'true');
storage.setItem('userRole', role || 'user');

console.log("Login Success");
console.log("Token:", storage.getItem("authToken"));

navigate("/wdms/dashboard", { replace: true });

        // Small timeout to ensure token is committed to storage before router checks it
        setTimeout(() => {
          navigate("/wdms/dashboard");
        }, 100);
      } else {
        setErrorMessage(response.data?.message || 'Invalid ID or Password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.response?.data?.message || 'Invalid ID or Password. Check credentials and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    if (registerData.password.length < 5) {
      setErrorMessage('Password must be at least 5 characters long.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await API.post('/auth/register', {
        fullName: registerData.fullName,
        address: registerData.address,
        phone: registerData.phone,
        email: registerData.email,
        password: registerData.password
      });

      if (response.data?.success) {
        setSuccessMessage(response.data.message || 'Account registered successfully! Please login with your details.');

        setTimeout(() => {
          setLoginUsername(registerData.email);
          setLoginPassword('');
          setIsRegistering(false);
          setSuccessMessage('');
        }, 1500);
      } else {
        setErrorMessage(response.data?.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="Login-container">
      <div className="Login-card">
        <div className="Login-left">
          <div className="Login-dots-top"><TbGridDots size={40} /></div>
          <div className="Login-brand-header">
            <div className="Login-logo-container">
              {alkaDropsLogo ? (
                <img src={alkaDropsLogo} alt="Alka Drops Logo" className="Login-logo-img" />
              ) : (
                <span className="Login-logo-fallback">AD</span>
              )}
            </div>
            <div className="Login-brand-text-group">
              <h3 className="Login-brand-title">ALKA DROPS</h3>
              <p className="Login-brand-subtitle">BEST SOFTWARE SOLUTION</p>
            </div>
          </div>
          <div className="Login-left-body">
            <h1 className="Login-hero-text">ALKA <br /> DROPS</h1>
            <div className="Login-divider" />
            <p className="Login-description">
              {isRegistering 
                ? "Join our platform today to manage projects, access client dashboards, and stay synced." 
                : "Welcome to the Alka Drops Admin Dashboard. Manage projects, clients, content and business operations securely."}
            </p>
          </div>
          <div className="Login-secure-badge">
            <div className="Login-badge-icon-wrapper"><FaUserShield className="Login-badge-icon" /></div>
            <div className="Login-badge-text">
              <span className="Login-badge-title">JWT Authenticated</span>
              <span className="Login-badge-desc">Your security is our priority.</span>
            </div>
          </div>
          <div className="Login-dots-bottom"><TbGridDots size={40} /></div>
          <div className="Login-orb-bottom" />
        </div>

        <div className="Login-right">
          <div className="Login-avatar-container">
            <div className="Login-avatar-wrapper">
              {isRegistering ? <FaUserPlus className="Login-avatar-icon" /> : <FaUserShield className="Login-avatar-icon" />}
            </div>
          </div>

          <div className="Login-right-header">
            <h2 className="Login-welcome-title">{isRegistering ? "Create Account" : "Welcome Back"}</h2>
            <p className="Login-welcome-subtitle">
              {isRegistering ? "Fill in your details to create a new user profile" : "Sign in to continue to your dashboard"}
            </p>
          </div>

          {successMessage && (
            <div className="Login-success-toast">
              <span className="Login-success-check">✓</span>
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="Login-error-toast">
              <span className="Login-error-cross">✗</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {!isRegistering ? (
            <>
              <form className="Login-form" onSubmit={handleLoginSubmit}>
                <div className="Login-input-wrapper">
                  <FaUser className="Login-input-icon" />
                  <input
                    type="text"
                    placeholder="Username or Email"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="Login-input"
                    required
                  />
                </div>

                <div className="Login-input-wrapper">
                  <FaLock className="Login-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="Login-input"
                    required
                  />
                  <button
                    type="button"
                    className="Login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="Login-options">
                  <button
                    type="button"
                    className="Login-remember-toggle"
                    onClick={() => setRememberMe(!rememberMe)}
                  >
                    <span className="Login-custom-checkbox">
                      {rememberMe ? <FaCheckSquare /> : <FaRegSquare />}
                    </span>
                    Remember me
                  </button>
                  <a href="#forgot" className="Login-forgot-link">Forgot Password?</a>
                </div>

                <button type="submit" className="Login-submit-btn" disabled={submitting}>
                  {submitting ? 'Signing in...' : 'Login'}
                </button>
              </form>

              <div className="Login-switch-prompt">
                <span>Don't have an account?</span>
                <button type="button" className="Login-switch-btn" onClick={() => toggleMode('register')}>
                  Register Now
                </button>
              </div>
            </>
          ) : (
            <>
              <form className="Login-form Login-register-form" onSubmit={handleRegisterSubmit}>
                <div className="Login-input-wrapper">
                  <FaUser className="Login-input-icon" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={registerData.fullName}
                    onChange={handleRegisterChange}
                    className="Login-input"
                    required
                  />
                </div>

                <div className="Login-input-wrapper">
                  <FaMapMarkerAlt className="Login-input-icon" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Full Address"
                    value={registerData.address}
                    onChange={handleRegisterChange}
                    className="Login-input"
                    required
                  />
                </div>

                <div className="Login-input-wrapper">
                  <FaPhone className="Login-input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    className="Login-input"
                    required
                  />
                </div>

                <div className="Login-input-wrapper">
                  <FaEnvelope className="Login-input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    className="Login-input"
                    required
                  />
                </div>

                <div className="Login-input-wrapper">
                  <FaLock className="Login-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create Password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    className="Login-input"
                    required
                  />
                  <button
                    type="button"
                    className="Login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="Login-input-wrapper">
                  <FaLock className="Login-input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Re-enter Password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    className="Login-input"
                    required
                  />
                  <button
                    type="button"
                    className="Login-password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button type="submit" className="Login-submit-btn" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit & Register'}
                </button>
              </form>

              <div className="Login-switch-prompt">
                <span>Already have an account?</span>
                <button type="button" className="Login-switch-btn" onClick={() => toggleMode('login')}>
                  Sign In
                </button>
              </div>
            </>
          )}

          <p className="Login-footer-text">
            © {new Date().getFullYear()} ALKA DROPS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;