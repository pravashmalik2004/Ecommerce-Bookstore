import React, { useState } from 'react';

export const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! We will get back to you soon.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div id="contact" className="container my-5">
      <div className="section-title mb-4">Contact Us</div>
      <div className="row">
        <div className="col-md-5 mb-4">
          <div className="address-card">
            <h5 className="contact-heading"><i className="bi bi-geo-alt me-2"></i>Our Store</h5>
            <p>BookSpace Main Branch<br />
            Plot No. 10, MG Road<br />
            Bhubaneswar, Odisha - 751001<br />India</p>
            <hr />
            <p><i className="bi bi-envelope me-2 text-danger"></i>info@bookspace.com</p>
            <p><i className="bi bi-telephone me-2 text-danger"></i>+91 8658425680</p>
            <p><i className="bi bi-clock me-2 text-danger"></i>Mon–Sat: 9 AM – 10 PM</p>
          </div>
        </div>
        <div className="col-md-7">
          <div className="address-card">
            <h5 className="contact-heading">Send a Message</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-add-address">
                <i className="bi bi-send me-1"></i>Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
