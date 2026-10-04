import React, { useState } from 'react';

export const SignUp = ({ signupUser, setCurrentPage }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const key = id.replace('signup', '');
    const formattedKey = key.charAt(0).toLowerCase() + key.slice(1);
    setForm((prev) => ({ ...prev, [formattedKey]: value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const success = signupUser(form.name, form.email, form.phone, form.password, form.confirmPassword);
    if (success) {
      alert(`Account created successfully!\nWelcome to BookSpace, ${form.name}!`);
      setCurrentPage('home');
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setCurrentPage('login');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ maxWidth: '500px' }}>
        <h3>Create Account</h3>
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="signupName"
              placeholder="Your full name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="signupEmail"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="signupPhone"
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="signupPassword"
              placeholder="Create password"
              value={form.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="signupConfirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit mb-3">Create Account</button>
          <p className="text-center switch-text mb-0">
            Already have an account?{' '}
            <a href="#" className="switch-link" onClick={handleLoginClick}>Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};
