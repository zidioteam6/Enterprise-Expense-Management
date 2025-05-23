import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, EyeOff, Eye, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    setIsSubmitting(true);
    
    // Create the user data object to send to the backend
    const userData = {
      fullName,
      email,
      password
    };
    
    try {
      // Using direct fetch with specific CORS-friendly settings
      console.log('Sending signup request with data:', userData);
      
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        // Don't use credentials for now as it's causing CORS issues
        credentials: 'omit',
        body: JSON.stringify(userData)
      });
      
      // First check if the response is valid before trying to parse JSON
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Handle non-JSON responses (text)
        const text = await response.text();
        data = { success: false, message: text || 'Unknown error occurred' };
      }
      
      console.log('Response received:', data);
      
      if (response.ok) {
        // If signup was successful
        alert(data.message || 'Account created successfully!');
        // Redirect to login page
        // navigate('/login');
      } else {
        // If server returned an error
        alert(data.message || 'Error creating account. Please try again.');
      }
    } catch (error) {
      // If there was a network error or JSON parsing error
      console.error('Error during signup:', error);
      alert(`Network or parsing error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h2>Create Account</h2>
          <p>Sign up to get started</p>
        </div>
        
        {/* Form */}
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            {/* Full Name input */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-container">
                <span className="icon">
                  <User size={18} />
                </span>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            
            {/* Email input */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <span className="icon">
                  <Mail size={18} />
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
            
            {/* Confirm Password input */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-container">
                <span className="icon">
                  <Lock size={18} />
                </span>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {/* Terms and Conditions */}
            <div className="form-group">
              <label className="remember-me terms-checkbox">
                <input 
                  type="checkbox" 
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                />
                I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>
              </label>
            </div>
            
            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting || !acceptTerms}
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
                  Sign Up
                  <ArrowRight style={{ marginLeft: '8px' }} size={18} />
                </>
              )}
            </button>
          </form>
          
          {/* Sign in link - Updated to use React Router */}
          <div className="signup">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="forgot-password">
                Sign in
              </Link>
            </p>
          </div>
          
          {/* Social login */}
          <div className="social-divider">
            <span>Or sign up with</span>
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