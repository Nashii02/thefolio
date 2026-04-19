import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import API from '../api/axios';
import '../css/LoginPage.css';

const AuthPage = ({ initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Re-render component when theme changes to apply new CSS variable colors
  useEffect(() => {
  }, [theme]);

  // Login state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: false,
    newsletter: false,
  });

  // Handle login form changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle register form changes
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(loginData.email, loginData.password);
      navigate(user.role === 'admin' ? '/admin' : '/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  // Handle register submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match! Please try again.');
      return;
    }

    if (!registerData.terms) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    try {
      const { data } = await API.post('/auth/register', {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      });
      localStorage.setItem('token', data.token);
      setShowSuccessPopup(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  // Toggle between login and register
  const toggleMode = (newMode) => {
    setMode(newMode);
    setError('');
    setLoginData({ email: '', password: '' });
    setRegisterData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      terms: false,
      newsletter: false,
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <h2>{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>

        {error && <p className="error-msg">{error}</p>}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit" className="auth-button">
              Sign In
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form className="register-form" onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label htmlFor="register-name">Name</label>
              <input
                type="text"
                id="register-name"
                name="name"
                placeholder="John Doe"
                value={registerData.name}
                onChange={handleRegisterChange}
                required
                minLength="2"
                maxLength="50"
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email</label>
              <input
                type="email"
                id="register-email"
                name="email"
                placeholder="john.doe@example.com"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Password</label>
              <input
                type="password"
                id="register-password"
                name="password"
                placeholder="At least 8 characters"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
                minLength="8"
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-confirm-password">Confirm Password</label>
              <input
                type="password"
                id="register-confirm-password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
                minLength="8"
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={registerData.gender === 'male'}
                    onChange={handleRegisterChange}
                    required
                  />
                  <span>Male</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={registerData.gender === 'female'}
                    onChange={handleRegisterChange}
                  />
                  <span>Female</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={registerData.gender === 'other'}
                    onChange={handleRegisterChange}
                  />
                  <span>Other</span>
                </label>
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="terms"
                  checked={registerData.terms}
                  onChange={handleRegisterChange}
                  required
                />
                <span>I agree to Terms of Service and Privacy Policy</span>
              </label>
            </div>

            <button type="submit" className="auth-button">
              Create Account
            </button>
          </form>
        )}

        {/* Toggle Links */}
        <p className="auth-toggle">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => toggleMode('register')}
                className="toggle-link"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => toggleMode('login')}
                className="toggle-link"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <h2>Welcome! 🎉</h2>
            <p>Your account has been created successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;