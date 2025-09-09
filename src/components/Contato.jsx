import React, { useState } from 'react';
import { useCart } from './CartContext';
import '../styles/Pages.css';

function Contato() {
  const { showNotification } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulário de contato:", formData);
    showNotification("Sua mensagem foi enviada com sucesso!");
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-container info-page-container">
      <div className="info-page-content">
        <h1>Fale Conosco</h1>
        <p>
          Tem alguma dúvida, sugestão ou quer saber mais sobre um pedido? Preencha o formulário abaixo e nossa equipe entrará em contato em breve.
        </p>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label className="form-label" htmlFor="name">Nome</label>
            <input className="form-control" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">E-mail</label>
            <input className="form-control" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="message">Mensagem</label>
            <textarea className="form-control" id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar Mensagem</button>
        </form>
      </div>
    </div>
  );
}

export default Contato;
