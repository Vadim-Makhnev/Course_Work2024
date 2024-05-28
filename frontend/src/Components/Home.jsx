import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { CiCircleInfo } from "react-icons/ci";
import axios from 'axios';
  // Предполагается, что стили находятся в этом файле

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const [hoveredProductId, setHoveredProductId] = useState(null); 
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleFilter = () => {
    const filtered = products.filter((product) => {
      const price = parseFloat(product.price);
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Infinity;
      return price >= min && price <= max;
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="home">
      <div className="filter-container">
        <div className='price-container'>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        </div>
        <button onClick={handleFilter} className='filter_btn'>Фильтровать</button>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-item" onClick={() => handleAddToCart(product)}>
            <div className='description' onMouseEnter={() => setHoveredProductId(product._id)} onMouseLeave={() => setHoveredProductId(null)}>
              <CiCircleInfo size={30}/>
              {hoveredProductId === product._id && (
                <div className="info-popup">
                  <p className='des-text'>{product.description}</p>
                </div>
              )}
            </div>
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>Цена: {product.price} руб.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
