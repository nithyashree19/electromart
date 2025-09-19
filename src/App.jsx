import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AllProducts from './AllProducts';
import ProductCard from './ProductCard';
import ProductsPage from './ProductsPage';
import ShoppingCart from './ShoppingCart';
import { CartProvider } from './CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/product/:id" element={<ProductCard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
