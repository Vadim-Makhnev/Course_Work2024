import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 House Staff. All rights reserved</p>
        <div className="footer-links">
          <Link to="/">Домой</Link>
          <Link to="/about">О нас</Link>
          <Link to="/contact">Контакты</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer