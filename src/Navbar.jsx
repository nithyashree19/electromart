import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartItemCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Check if current path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="logo-icon">⚡</span>
          <div className="logo-text">
            <span className="logo-name">ElectroMart</span>
            <span className="logo-tagline">PREMIUM ELECTRONICS</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-menu">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </Link>

          <Link 
            to="/products" 
            className={`nav-link ${isActive('/products') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <span className="nav-icon">📱</span>
            <span>Products</span>
          </Link>

          <Link 
            to="/cart" 
            className={`nav-link cart-link ${isActive('/cart') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <span className="nav-icon cart-icon">
              🛒
              {getCartItemCount() > 0 && (
                <span className="cart-badge">{getCartItemCount()}</span>
              )}
            </span>
            <span>Cart</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-overlay" onClick={closeMenu}></div>
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <span className="mobile-logo">⚡ ElectroMart</span>
              <button className="mobile-close-btn" onClick={closeMenu}>✕</button>
            </div>

            <div className="mobile-nav-links">
              <Link 
                to="/" 
                className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="mobile-nav-icon">🏠</span>
                <span>Home</span>
              </Link>

              <Link 
                to="/products" 
                className={`mobile-nav-link ${isActive('/products') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="mobile-nav-icon">📱</span>
                <span>Products</span>
              </Link>

              <Link 
                to="/cart" 
                className={`mobile-nav-link ${isActive('/cart') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="mobile-nav-icon">
                  🛒
                  {getCartItemCount() > 0 && (
                    <span className="mobile-cart-badge">{getCartItemCount()}</span>
                  )}
                </span>
                <span>Shopping Cart</span>
              </Link>
            </div>

            {/* Mobile Menu Footer */}
            <div className="mobile-menu-footer">
              <p>Discover cutting-edge technology with unbeatable prices</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
