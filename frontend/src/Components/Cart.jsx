import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Импортируем функцию для создания уникальных идентификаторов
import { CartContext } from './CartContext';
import './css/Cart.css';

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const totalPrice = cartItems.reduce((total, product) => total + product.price, 0);

  const fakePaymentUrl = 'http://example.com/buy';

  const handleBuyClick = () => {
    window.location.href = fakePaymentUrl;
  };

  return (
    <div className="cart-container">
      <h2>Корзина</h2>
      {cartItems.length === 0 && <h3 className='cartNone'>Корзина пустая</h3>}
      <ul className="cart-items">
        {cartItems.map((product) => (
          <li key={uuidv4()} className="cart-item"> {/* Используем uuidv4() для создания уникального ключа */}
            <img src={product.image} alt={product.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{product.name}</h3>
              <p>{product.price} руб.</p>
            </div>
          </li>
        ))}
      </ul>
      {cartItems.length > 0 && <div className='total_price'><span className='text_price'>Стоимость всего содержимого: </span>{totalPrice} руб.</div>}
      {cartItems.length > 0 && <button className='buyBtn' onClick={handleBuyClick}>Купить</button>}
    </div>
  );
};

export default Cart;
