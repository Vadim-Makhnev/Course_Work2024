import React, { useState } from 'react';
import './css/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь вы можете обработать отправку формы, например, отправив данные на сервер
    console.log('Form submitted:', formData);
    // Очистка формы после отправки
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <h1>Свяжитесь с нами</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Сообщение</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-container">
            <button type="submit">Отправить</button>
        </div>
      </form>
      <div className="company-info">
        <h2>Информация о компании</h2>
        <p>Адрес: г. Москва, ул. Пушкина, д. Колотушкина</p>
        <p>Телефон: +7 (495) 123-45-67</p>
        <p>Email: info@company.com</p>
      </div>
    </div>
  );
};

export default Contact;
