import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="page-container">
      <div className="content-card order-success-card">
        <h2>🎉 Compra Realizada com Sucesso! 🎉</h2>
        <p>Obrigado por sua compra! Seu pedido foi processado e será enviado em breve.</p>
        <p>Você receberá um e-mail de confirmação com os detalhes do seu pedido.</p>
        <div className="button-group-center">
            <Link to="/" className="success-button">Continuar Comprando</Link>
            <Link to="/contact" className="secondary-success-button">Precisa de Ajuda?</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;