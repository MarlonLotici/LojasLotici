import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import '../styles/Pages.css';

function OrderSuccess() {
  return (
    <div className="page-container info-page-container">
      <div className="info-page-content text-center">
        <CheckCircle size={64} color="var(--color-success)" className="info-icon" />
        <h1>Pedido Realizado com Sucesso!</h1>
        <p>
          Obrigado pela sua compra. Enviamos um e-mail de confirmação com os detalhes do seu pedido.
        </p>
        <Link to="/produtos" className="btn btn-primary">
          Continuar Comprando
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
