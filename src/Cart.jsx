import React from 'react';
import { useCart } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Seu carrinho está vazio.</h2>
        <button onClick={() => navigate('/')} className="back-button">
          Voltar para a Loja
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Seu Carrinho ({cart.length} {cart.length === 1 ? 'item' : 'itens'})</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div>
            <h4>{item.title}</h4>
            <p>R$ {item.price.toFixed(2)}</p>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
          </div>
          <button onClick={() => removeFromCart(item.id)} className="remove-button">
            Remover
          </button>
        </div>
      ))}
      <h3>Total: R$ {getTotalPrice().toFixed(2)}</h3>
      
      {/* Container para alinhar os botões de forma simétrica */}
      <div className="cart-buttons-group">
        <button onClick={() => navigate('/')} className="continue-shopping-button">
          Continuar Comprando
        </button>
        <button onClick={handleCheckout} className="checkout-button">
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default Cart;