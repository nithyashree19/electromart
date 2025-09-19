import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from './CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    addToCart(product);
    const event = new CustomEvent('productAdded', { detail: product.name });
    window.dispatchEvent(event);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Calculate discount percentage (mock data)
  const originalPrice = Math.round(product.price * 1.2);
  const discountPercentage = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -12 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="product-card-inner">
        {/* Product Badge */}
        <div className="product-badges">
          {discountPercentage > 0 && (
            <span className="discount-badge">-{discountPercentage}%</span>
          )}
          <span className="category-badge">{product.category}</span>
        </div>

        {/* Wishlist Button */}
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={toggleWishlist}
          aria-label="Add to wishlist"
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>

        {/* Product Image */}
        <div className="product-image-container">
          {!imageLoaded && <div className="image-placeholder">Loading...</div>}
          <img 
            src={product.image} 
            alt={product.name} 
            className={`product-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
          />
          <div className="image-overlay">
            <span className="quick-view">👁️ Quick View</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-brand">{product.brand}</div>
          <h3 className="product-title">{product.name}</h3>
          <p className="product-specs">{product.specs}</p>
          
          {/* Rating */}
          <div className="product-rating">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <span className="rating-count">(4.9) • 2.3k reviews</span>
          </div>

          {/* Price Section */}
          <div className="price-section">
            <div className="current-price">${product.price}</div>
            {discountPercentage > 0 && (
              <div className="original-price">${originalPrice}</div>
            )}
          </div>

          {/* Features */}
          <div className="product-features">
            <span className="feature-tag">🚚 Free Shipping</span>
            <span className="feature-tag">🛡️ Warranty</span>
            <span className="feature-tag">⚡ Fast Delivery</span>
          </div>

          {/* Single Action Button */}
          <div className="product-actions">
            <button className="add-to-cart-btn">
              <span className="btn-icon">🛒</span>
              <span className="btn-text">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
