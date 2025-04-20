import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  
  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  // Get the intended destination if redirected from a protected route
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginStatus(null);
    
    // Create login credentials object
    const loginData = {
      email,
      password
    };
    
    try {
      // Call the backend API for authentication
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'omit',
        body: JSON.stringify(loginData)
      });
      
      // Parse the response
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { success: false, message: text || 'Unknown error occurred' };
      }
      
      console.log('Login response:', data);
      
      if (response.ok) {
        // Login successful
        setLoginStatus({ type: 'success', message: data.message || 'User verified successfully!' });
        
        // Store user information in auth context
        login({
          email,
          // Add any other user data you want to store
          ...data
        });
        
        // Navigate to dashboard after brief delay
        setTimeout(() => {
          navigate(from);
        }, 1500);
      } else {
        // Login failed
        setLoginStatus({ type: 'error', message: data.message || 'Invalid credentials. Please try again.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginStatus({ type: 'error', message: `Network error: ${error.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue</p>
        </div>
        
        {/* Form */}
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            {/* Email input */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <span className="icon">
                  <User size={18} />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            
            {/* Password input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <span className="icon">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {/* Forgot password & Remember me */}
            <div className="form-footer">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>
            
            {/* Login Status Message */}
            {loginStatus && (
              <div 
                className={`login-status ${loginStatus.type === 'success' ? 'success' : 'error'}`}
                style={{
                  padding: '10px',
                  marginBottom: '15px',
                  borderRadius: '4px',
                  backgroundColor: loginStatus.type === 'success' ? '#d1fae5' : '#fee2e2',
                  color: loginStatus.type === 'success' ? '#047857' : '#b91c1c',
                  textAlign: 'center'
                }}
              >
                {loginStatus.message}
              </div>
            )}
            
            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="login-button"
            >
              {isSubmitting ? (
                <>
                  <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight style={{ marginLeft: '8px' }} size={18} />
                </>
              )}
            </button>
          </form>
          
          {/* Sign up link - Updated to use React Router */}
          <div className="signup">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="forgot-password">
                Sign up
              </Link>
            </p>
          </div>
          
          {/* Social login */}
          <div className="social-divider">
            <span>Or continue with</span>
          </div>
          
          <div className="social-buttons">
            {['Google', 'Twitter', 'GitHub'].map((provider) => (
              <button
                key={provider}
                type="button"
                className="social-button"
              >
                {provider}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}