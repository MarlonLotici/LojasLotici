import React from 'react';

const Contato = () => {
  return (
    <div className="page-container">
      <div className="content-card">
        <h2>Fale Conosco</h2>
        <p>Tire suas dúvidas ou deixe seu feedback. Responderemos o mais rápido possível!</p>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Seu Nome</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Seu E-mail</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Sua Mensagem</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="contact-button">Enviar Mensagem</button>
        </form>
      </div>
    </div>
  );
};

export default Contato;