import React from 'react';
import aboutUs from '../assets/about_us.png';

export const About = () => {
  return (
    <div id="about" className="container my-5">
      <div className="section-title mb-4">About Us</div>
      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          <img src={aboutUs} alt="About BookSpace" className="img-fluid rounded shadow-sm w-100" style={{ height: '280px', objectFit: 'cover' }} />
        </div>
        <div className="col-md-6">
          <h3 className="about-heading">Welcome to BookSpace</h3>
          <p>BookSpace is your one-stop destination for books of all genres. We are passionate about connecting readers with the books they love.</p>
          <p>Founded in 2026, we have grown to offer thousands of titles across Fiction, Science, History, Self Help, Programming, and Children's books.</p>
          <p>Our mission is to make reading accessible, affordable, and enjoyable for everyone — from students to professionals.</p>
          <div className="row mt-4">
            <div className="col-4 text-center">
              <h3 className="stat-number">10K+</h3>
              <small>Books Available</small>
            </div>
            <div className="col-4 text-center">
              <h3 className="stat-number">50K+</h3>
              <small>Happy Customers</small>
            </div>
            <div className="col-4 text-center">
              <h3 className="stat-number">100+</h3>
              <small>Authors</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
