import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet} from 'react-router-dom';
import About from './Components/About';
import axios from 'axios';
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Components/Home';
import LoginForm from './Components/Login';
import RegForm from './Components/Reg';
import Cart from './Components/Cart';
import { CartProvider } from './Components/CartContext';
import NotFound from './Components/NotFound';
import Contact from './Components/Contact';
import './App.css'

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
  <CartProvider>
    <Router>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  </CartProvider>
  );
}
export default App
