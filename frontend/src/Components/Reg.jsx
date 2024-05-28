import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './css/Reg.css';

const RegForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();
  
  const alertReg = () => {
    alert("Успешная регистрация!");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User registered successfully:', data);
        alertReg();
        history('/');
 
      } else {
        const errorData = await response.json();
        console.error('Failed to register user:', errorData);
        alert('User with this email already exists');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error: ' + error.message);
    }
  };

  return (
    <section className="login-container">
      <h2>Регистрация</h2>
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

export default RegForm;
