import React, { useState, useEffect } from 'react';

export const Login = ({ loginUser, setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Load remembered email on mount
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('bookstore_remembered_email');
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch (e) {
      console.error('Error loading remembered email:', e);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginUser(email, password, rememberMe);
    if (success) {
      alert('Welcome back!\nYou have successfully logged in.');
      setCurrentPage('home');
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    setCurrentPage('signup');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const emailInput = prompt('Enter your registered email address to reset your password:');
    if (!emailInput) return;

    try {
      const users = JSON.parse(localStorage.getItem('bookstore_registered_users') || '[]');
      const userIndex = users.findIndex((u) => u.email.toLowerCase() === emailInput.toLowerCase().trim());
      if (userIndex > -1) {
        const newPassword = prompt('Enter your new password (minimum 6 characters):');
        if (!newPassword) return;
        if (newPassword.length < 6) {
          alert('Password must be at least 6 characters.');
          return;
        }
        users[userIndex].password = newPassword;
        localStorage.setItem('bookstore_registered_users', JSON.stringify(users));
        alert('Password has been reset successfully! You can now log in with your new password.');
      } else {
        alert('No registered account found with that email address.');
      }
    } catch (err) {
      console.error('Error during password reset:', err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h3>Login to BookSpace</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div>
              <input 
                type="checkbox" 
                id="rememberMe" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="ms-1" style={{ fontSize: '0.9rem' }}>Remember Me</label>
            </div>
            <a href="#" className="forgot-link" onClick={handleForgotPassword}>Forgot Password?</a>
          </div>
          <button type="submit" className="btn-submit mb-3">Login</button>
          <p className="text-center switch-text mb-0">
            Don't have an account?{' '}
            <a href="#" className="switch-link" onClick={handleSignUpClick}>Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};
