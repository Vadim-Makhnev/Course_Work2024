import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './css/Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const alertLogin = () => {
    alert("Успешный вход");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
        
        if (response.ok) {
          console.log('User authenticated:', data);
          alertLogin();
          history('/'); // Перенаправить на главную страницу
        } else {
          console.error('Failed to authenticate user:', data);
          alert('Authentication failed. Please check your email and password.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  return (
    <section className="login-container">
      <h2>Вход </h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            title='Email'
          />
        </div>
        <div className="input-group">
          <label className="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            title='Password'
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginForm;
