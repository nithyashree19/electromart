import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import products from './products.jsx';
import './ProductsPage.css';
// Use public folder path for hero image
import heroBackgroundImage from '/src/assets/landPage.jpg';

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [notification, setNotification] = useState('');

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const popularProducts = products.slice(0, 3);
  const featuredProducts = products.slice(3, 6);

  // Enhanced customer reviews
  const customerReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely phenomenal service! My new smartphone arrived next day and works flawlessly. The customer support team was incredibly helpful throughout.",
      product: "Galaxy Note 23 Ultra",
      avatar: "👩‍💼",
      verified: true,
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 5,
      comment: "Best electronics store I've ever used! The laptop quality is outstanding and the prices are unbeatable. Will definitely be a repeat customer.",
      product: "Dell XPS 15 OLED",
      avatar: "👨‍💻",
      verified: true,
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Emily Davis",
      rating: 4,
      comment: "Great selection and fast shipping! The product arrived well-packaged and exactly as described. Minor shipping delay but worth the wait.",
      product: "Bose QuietComfort Ultra",
      avatar: "👩‍🎓",
      verified: true,
      date: "3 days ago"
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      rating: 5,
      comment: "ElectroMart exceeded my expectations! The gaming setup I bought performs amazingly and their tech support answered all my questions promptly.",
      product: "Nintendo Switch OLED",
      avatar: "👨‍🎮",
      verified: true,
      date: "5 days ago"
    }
  ];

  const stats = [
    { number: "15K+", label: "Happy Customers", icon: "😊" },
    { number: "500+", label: "Premium Products", icon: "🛍️" },
    { number: "4.9★", label: "Average Rating", icon: "⭐" },
    { number: "24/7", label: "Customer Support", icon: "🎧" }
  ];

  const features = [
    { icon: "🚚", title: "Free Fast Shipping", desc: "Free delivery on orders over $99" },
    { icon: "🔒", title: "Secure Payments", desc: "100% secure checkout process" },
    { icon: "↩️", title: "Easy Returns", desc: "30-day hassle-free returns" },
    { icon: "🛡️", title: "Warranty Coverage", desc: "Extended warranty on all products" }
  ];

  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    const handleProductAdded = (e) => {
      setNotification(`${e.detail} added to cart!`);
      setTimeout(() => setNotification(''), 3000);
    };

    window.addEventListener('productAdded', handleProductAdded);
    return () => window.removeEventListener('productAdded', handleProductAdded);
  }, []);

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="landing-page">
      <AnimatePresence>
        {notification && (
          <motion.div 
            className="notification"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            ✅ {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="hero-section" style={{ backgroundImage: `url(${heroBackgroundImage})` }}>
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>⚡ Welcome to ElectroMart</h1>
          <h2>Your Gateway to Premium Electronics</h2>
          <p>Discover cutting-edge technology with unbeatable prices, premium quality, and exceptional service that tech enthusiasts trust worldwide.</p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button 
              className="cta-primary" 
              onClick={() => document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🛍️ Shop Now
            </button>
            <button 
              className="cta-secondary" 
              onClick={() => window.location.href = '#featured-products'}
            >
              📱 View Products
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div 
        className="features-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2>Why Choose ElectroMart?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Popular Products */}
      <motion.div 
        className="popular-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="section-header">
          <h2>🔥 Trending Now</h2>
          <p>Most loved products by our customers</p>
        </div>
        <div className="popular-grid">
          {popularProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="trending-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 + index * 0.2 }}
            >
              <div className="trending-badge">🏆 Best Seller</div>
              <img 
                src={product.image} 
                alt={product.name}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="image-placeholder" style={{display: 'none'}}>
                <span>📱</span>
              </div>
              <div className="trending-info">
                <h4>{product.name}</h4>
                <p className="trending-brand">{product.brand}</p>
                <div className="trending-price">${product.price}</div>
                <div className="trending-rating">⭐⭐⭐⭐⭐ (4.9)</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Customer Reviews */}
      <motion.div 
        className="reviews-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className="section-header">
          <h2>💬 What Our Customers Say</h2>
          <p>Real reviews from verified purchases</p>
          <div className="review-stats">
            <span className="review-score">4.9/5.0</span>
            <span className="review-count">Based on 2,847+ reviews</span>
          </div>
        </div>
        
        <div className="reviews-carousel">
          {customerReviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
            >
              <div className="review-header">
                <div className="reviewer-avatar">
                  <span className="avatar-icon">{review.avatar}</span>
                  <div className="avatar-info">
                    <h4>{review.name}</h4>
                    <div className="reviewer-meta">
                      {review.verified && <span className="verified">✓ Verified Purchase</span>}
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                </div>
                <div className="review-rating">
                  <div className="stars">{renderStars(review.rating)}</div>
                </div>
              </div>
              
              <p className="review-text">"{review.comment}"</p>
              
              <div className="review-footer">
                <span className="product-bought">📦 {review.product}</span>
                <div className="review-helpful">
                  <button className="helpful-btn">👍 Helpful ({Math.floor(Math.random() * 20) + 5})</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Products */}
      <motion.div 
        id="featured-products"
        className="featured-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="section-header">
          <h2>✨ Featured Electronics</h2>
          <p>Handpicked premium products just for you</p>
        </div>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.div>

      {/* Newsletter Signup */}
      <motion.div 
        className="newsletter-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div className="newsletter-content">
          <h2>🚀 Stay Ahead of Tech Trends</h2>
          <p>Subscribe to get exclusive deals, new product launches, and tech insights delivered to your inbox!</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button type="submit">Subscribe Now</button>
          </div>
          <div className="newsletter-perks">
            <span>✨ Exclusive early access to sales</span>
            <span>📱 Latest product updates</span>
            <span>🎁 Special member discounts</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductsPage;
