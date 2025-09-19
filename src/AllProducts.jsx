import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import products from './products';
import './AllProducts.css';

const AllProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [sortBy, setSortBy] = useState('name');
  const [notification, setNotification] = useState('');

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const brands = ['All', ...new Set(products.map(p => p.brand))];

  useEffect(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Filter by brand
    if (selectedBrand !== 'All') {
      filtered = filtered.filter(p => p.brand === selectedBrand);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'brand':
          return a.brand.localeCompare(b.brand);
        default:
          return 0;
      }
    });
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, sortBy]);

  useEffect(() => {
    const handleProductAdded = (e) => {
      setNotification(`${e.detail} added to cart!`);
      setTimeout(() => setNotification(''), 3000);
    };

    window.addEventListener('productAdded', handleProductAdded);
    return () => window.removeEventListener('productAdded', handleProductAdded);
  }, []);

  return (
    <div className="all-products-page">
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

      {/* Page Header */}
      <div className="page-header">
        <h1>🔧 All Electronics</h1>
        <p>Browse our complete collection of premium electronics</p>
        <div className="results-info">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-row">
          {/* Search */}
          <div className="filter-group search-group">
            <input
              type="text"
              placeholder="🔍 Search products, brands, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <label>📱 Category</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div className="filter-group">
            <label>🏷️ Brand</label>
            <select 
              value={selectedBrand} 
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="filter-select"
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="filter-group">
            <label>🔄 Sort By</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="brand">Brand (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="price-range-section">
          <label>💰 Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
          <div className="price-range-inputs">
            <input
              type="range"
              min="0"
              max="6000"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="price-slider"
            />
            <input
              type="range"
              min="0"
              max="6000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="price-slider"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <motion.div 
        className="products-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <AnimatePresence>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <div className="no-products-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button 
            className="reset-filters-btn"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedBrand('All');
              setPriceRange([0, 6000]);
              setSortBy('name');
            }}
          >
            🔄 Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
