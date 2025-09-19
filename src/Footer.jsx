import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section company-info">
          <div className="footer-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">ElectroMart</span>
          </div>
          <p className="company-description">
            Your trusted partner for premium electronics and cutting-edge technology. 
            Quality products, competitive prices, exceptional service.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">📘</a>
            <a href="#" className="social-link">📷</a>
            <a href="#" className="social-link">🐦</a>
            <a href="#" className="social-link">💼</a>
          </div>
        </div>

        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">🏠 Home</a></li>
            <li><a href="/products">🛍️ Products</a></li>
            <li><a href="/cart">🛒 Cart</a></li>
            <li><a href="#about">ℹ️ About Us</a></li>
            <li><a href="#contact">📞 Contact</a></li>
          </ul>
        </div>

        <div className="footer-section categories">
          <h3>Categories</h3>
          <ul>
            <li><a href="#smartphones">📱 Smartphones</a></li>
            <li><a href="#laptops">💻 Laptops</a></li>
            <li><a href="#audio">🎧 Audio</a></li>
            <li><a href="#wearables">⌚ Wearables</a></li>
            <li><a href="#gaming">🎮 Gaming</a></li>
          </ul>
        </div>

        <div className="footer-section contact-info">
          <h3>Contact Info</h3>
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <span>info@electromart.com</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <span>+1-800-ELECTRO</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <span>123 Tech Street, Silicon Valley</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🕒</span>
            <span>Mon-Fri: 9AM-8PM</span>
          </div>
        </div>

        <div className="footer-section newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe to get latest deals and tech news!</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">🚀</button>
          </div>
          <div className="payment-methods">
            <span>We Accept:</span>
            <div className="payment-icons">
              <span>💳</span>
              <span>🏧</span>
              <span>📱</span>
              <span>💰</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 ElectroMart. All rights reserved. Made with ❤️ for tech enthusiasts.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#warranty">Warranty</a>
            <a href="#returns">Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
