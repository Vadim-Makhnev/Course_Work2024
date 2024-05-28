import React, {useContext} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from './CartContext';



export default function Header() {

  const { cartCount } = useContext(CartContext);

  return (
    <header>
        <div>
            <span className='logo' id='logo'>Furniture Haven</span>
            <ul className="nav">
                <li><Link to='/about'>О нас</Link></li>
                <li><Link to='/contact'>Контакты</Link></li>
                <li><Link to='/login'>Вход</Link></li>
                <li><Link to='/register'>Регистрация</Link></li>
                <li><Link to="/cart" className='shop_cart'>{cartCount > 0 && <span className="cart-count">{cartCount}</span>}<FaShoppingCart size={25}/></Link></li>
            </ul>
        </div>
        <div className='presentation'></div>
    </header>
  )
};

