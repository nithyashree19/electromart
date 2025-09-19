import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal,
    getCartItemCount 
  } = useCart();

  const [selectedItems, setSelectedItems] = useState([]);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  // Initialize selected items when cart loads
  useEffect(() => {
    setSelectedItems(cart.map(item => item.id));
  }, [cart]);

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(selectedItems.length === cart.length ? [] : cart.map(item => item.id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate totals for selected items
  const selectedCartItems = cart.filter(item => selectedItems.includes(item.id));
  const subtotal = selectedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = subtotal * 0.15; // 15% discount
  const tax = (subtotal - savings) * 0.18; // 18% tax
  const shipping = subtotal > 2000 ? 0 : 99; // Free shipping over $2000
  const total = subtotal - savings + tax + shipping;

  // Enhanced Invoice Generation
  const generateInvoice = async () => {
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      alert('Please fill in all required fields (Name, Email, Phone)');
      return;
    }

    setIsGenerating(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const invoiceNumber = `ELM-${Date.now().toString().slice(-6)}`;
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Professional Invoice Header
      doc.setFillColor(255, 193, 7); // ElectroMart yellow/orange
      doc.rect(0, 0, pageWidth, 50, 'F');
      
      // Logo area
      doc.setFillColor(255, 255, 255);
      doc.circle(25, 25, 12, 'F');
      doc.setTextColor(255, 193, 7);
      doc.setFontSize(14);
      doc.text('⚡', 20, 30);

      // Company name
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('ElectroMart', 45, 20);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Premium Electronics Store', 45, 28);
      doc.text('Your Gateway to Premium Electronics', 45, 35);
      doc.text('📧 support@electromart.com | 📞 +1-800-ELECTRO', 45, 42);

      // Invoice title
      doc.setTextColor(255, 193, 7);
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text('INVOICE', pageWidth - 60, 25);
      
      // Invoice details box
      doc.setFillColor(255, 248, 220);
      doc.rect(pageWidth - 80, 30, 70, 15, 'F');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Invoice #: ${invoiceNumber}`, pageWidth - 75, 37);
      doc.text(`Date: ${currentDate}`, pageWidth - 75, 42);

      // Customer Information Section
      let yPos = 65;
      doc.setFillColor(255, 193, 7);
      doc.rect(15, yPos, pageWidth - 30, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('CUSTOMER INFORMATION', 20, yPos + 6);
      
      yPos += 15;
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      doc.text(`👤 Name: ${customerDetails.name}`, 20, yPos);
      yPos += 6;
      doc.text(`📧 Email: ${customerDetails.email}`, 20, yPos);
      yPos += 6;
      doc.text(`📞 Phone: ${customerDetails.phone}`, 20, yPos);
      yPos += 6;
      
      if (customerDetails.address) {
        doc.text(`🏠 Address: ${customerDetails.address}`, 20, yPos);
        yPos += 6;
      }

      // Items Table
      yPos += 10;
      doc.setFillColor(255, 193, 7);
      doc.rect(15, yPos, pageWidth - 30, 10, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('ITEM', 20, yPos + 7);
      doc.text('BRAND', 80, yPos + 7);
      doc.text('QTY', 110, yPos + 7);
      doc.text('UNIT PRICE', 130, yPos + 7);
      doc.text('TOTAL', 170, yPos + 7);

      yPos += 10;
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);

      selectedCartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        
        if (index % 2 === 0) {
          doc.setFillColor(255, 248, 220);
          doc.rect(15, yPos - 2, pageWidth - 30, 8, 'F');
        }
        
        const itemName = item.name.length > 20 ? item.name.substring(0, 17) + '...' : item.name;
        doc.text(itemName, 20, yPos + 4);
        doc.text(item.brand, 80, yPos + 4);
        doc.text(item.quantity.toString(), 115, yPos + 4);
        doc.text(`$${item.price.toLocaleString()}`, 130, yPos + 4);
        doc.text(`$${itemTotal.toLocaleString()}`, 170, yPos + 4);
        
        yPos += 8;
      });

      // Summary section
      yPos += 15;
      const summaryX = pageWidth - 70;
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      
      doc.text('Subtotal:', summaryX - 25, yPos);
      doc.text(`$${subtotal.toLocaleString()}`, summaryX, yPos);
      yPos += 7;
      
      doc.setTextColor(34, 197, 94); // Green for savings
      doc.text('Discount (15%):', summaryX - 25, yPos);
      doc.text(`-$${savings.toLocaleString()}`, summaryX, yPos);
      yPos += 7;
      
      doc.setTextColor(0, 0, 0);
      doc.text('Tax (18%):', summaryX - 25, yPos);
      doc.text(`$${tax.toLocaleString()}`, summaryX, yPos);
      yPos += 7;
      
      doc.text('Shipping:', summaryX - 25, yPos);
      if (shipping === 0) {
        doc.setTextColor(34, 197, 94);
        doc.text('FREE', summaryX, yPos);
      } else {
        doc.setTextColor(0, 0, 0);
        doc.text(`$${shipping}`, summaryX, yPos);
      }
      yPos += 12;
      
      // Total
      doc.setDrawColor(255, 193, 7);
      doc.line(summaryX - 25, yPos - 3, summaryX + 20, yPos - 3);
      
      doc.setTextColor(255, 193, 7);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('TOTAL:', summaryX - 25, yPos);
      doc.text(`$${total.toLocaleString()}`, summaryX, yPos);

      // Footer
      yPos += 25;
      doc.setTextColor(255, 193, 7);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Thank you for choosing ElectroMart! ⚡', 20, yPos);
      
      yPos += 15;
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Your Gateway to Premium Electronics', 20, yPos);
      doc.text('Payment Terms: Net 30 days | Returns: 30-day policy', 20, yPos + 6);
      doc.text('Warranty: All products include manufacturer warranty', 20, yPos + 12);

      const fileName = `ElectroMart-Invoice-${invoiceNumber}-${customerDetails.name.replace(/\s+/g, '')}.pdf`;
      doc.save(fileName);

      alert('✅ Professional invoice generated successfully!');
      setCustomerDetails({
        name: '', email: '', phone: '', address: '', city: '', state: '', zipCode: ''
      });
      setShowCustomerForm(false);
      
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('❌ Error generating invoice. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="shopping-cart-page">
        <div className="container">
          <motion.div 
            className="empty-cart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="empty-cart-icon">🛒</div>
            <h1>Your Cart is Empty</h1>
            <p>Discover cutting-edge technology with unbeatable prices</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => navigate('/')}
            >
              <span>⚡</span>
              <span>Continue Shopping</span>
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-cart-page">
      <div className="container">
        {/* Customer Form Modal */}
        <AnimatePresence>
          {showCustomerForm && (
            <motion.div 
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="modal-header">
                  <h3>📄 Generate Invoice</h3>
                  <button 
                    className="close-btn"
                    onClick={() => setShowCustomerForm(false)}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={customerDetails.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name" 
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={customerDetails.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com" 
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={customerDetails.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567" 
                      required
                    />
                  </div>
                  
                  <div className="invoice-summary">
                    <div className="summary-row">
                      <span>Selected Items:</span>
                      <span>{selectedItems.length}</span>
                    </div>
                    <div className="summary-row total-row">
                      <span>Total Amount:</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="modal-actions">
                    <button 
                      className="cancel-btn"
                      onClick={() => setShowCustomerForm(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="generate-btn"
                      onClick={generateInvoice}
                      disabled={isGenerating}
                    >
                      {isGenerating ? 'Generating...' : 'Generate Invoice'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Header */}
        <div className="cart-header">
          <div className="cart-header-content">
            <div className="cart-title-section">
              <h1>🛒 Shopping Cart</h1>
              <p>{cart.length} items • ${getCartTotal().toLocaleString()} total value</p>
            </div>
            
            <div className="cart-header-actions">
              <button className="select-all-btn" onClick={selectAllItems}>
                {selectedItems.length === cart.length ? '❌ Deselect All' : '✅ Select All'}
              </button>
              <button 
                className="clear-cart-btn"
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                  }
                }}
              >
                🗑️ Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Main Cart Layout */}
        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items-section">
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`cart-item-card ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <div className="item-selection">
                    <input
                      type="checkbox"
                      className="item-checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                    />
                  </div>

                  <div className="item-image">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="image-placeholder" style={{display: 'none'}}>
                      <span className="placeholder-icon">
                        {item.category === 'Laptop' ? '💻' : 
                         item.category === 'Smartphone' ? '📱' : 
                         item.category === 'Audio' ? '🎧' : 
                         item.category === 'Wearables' ? '⌚' : '🔌'}
                      </span>
                    </div>
                  </div>

                  <div className="item-details">
                    <div className="item-brand">{item.brand}</div>
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-specs">{item.specs}</div>
                    <div className="item-description">{item.description}</div>
                    
                    <div className="item-features">
                      <span className="feature-tag shipping">🚚 Free Shipping</span>
                      <span className="feature-tag warranty">🛡️ Warranty</span>
                      <span className="feature-tag delivery">⚡ Fast Delivery</span>
                    </div>
                  </div>

                  <div className="item-price">
                    <div className="current-price">${item.price.toLocaleString()}</div>
                  </div>

                  <div className="item-quantity">
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>

                  <div className="item-actions">
                    <button 
                      className="remove-btn"
                      onClick={() => {
                        if (window.confirm('Remove this item from cart?')) {
                          removeFromCart(item.id);
                        }
                      }}
                      title="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="order-summary-card">
            <div className="summary-header">
              <h2>📊 Order Summary</h2>
              <p>Review your selection ({selectedItems.length} of {cart.length} items)</p>
            </div>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row savings-row">
                <span>💰 Mega Savings (15%):</span>
                <span>-${savings.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Tax (18%):</span>
                <span>${tax.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>🚚 Shipping:</span>
                <span className={shipping === 0 ? 'free-text' : ''}>
                  {shipping === 0 ? 'FREE' : `$${shipping}`}
                </span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total-row">
                <span>Total:</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            <div className="summary-actions">
              <button 
                className="checkout-btn-primary"
                disabled={selectedItems.length === 0}
              >
                <span>⚡</span>
                <div>
                  <div>Proceed to Checkout</div>
                  <div className="checkout-price">${total.toLocaleString()}</div>
                </div>
              </button>
              
              <button 
                className="invoice-btn"
                onClick={() => setShowCustomerForm(true)}
                disabled={selectedItems.length === 0}
              >
                📄 Generate Professional Invoice
              </button>

              <button 
                className="continue-shopping-btn"
                onClick={() => navigate('/')}
              >
                🛍️ Continue Shopping
              </button>
            </div>

            <div className="trust-indicators">
              <div className="trust-item">
                <span>🔒</span>
                <span>Secure SSL Encryption</span>
              </div>
              <div className="trust-item">
                <span>📞</span>
                <span>24/7 Customer Support</span>
              </div>
              <div className="trust-item">
                <span>↩️</span>
                <span>30-Day Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
