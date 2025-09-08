import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você enviaria os dados do pedido para o seu backend
    console.log("Dados do pedido:", {
      customer: formData,
      items: cart,
      total: getTotalPrice()
    });
    
    // Após o "sucesso" do pedido, limpa o carrinho e redireciona
    clearCart();
    navigate('/order-success');
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Seu carrinho está vazio.</h2>
        <button onClick={() => navigate('/')} className="back-button">
            Voltar para a Loja
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Finalizar Pedido</h2>
      
      <div className="order-summary">
        <h3>Resumo do Pedido</h3>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.title} ({item.quantity}x) - R$ {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Total: R$ {getTotalPrice().toFixed(2)}</p>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <h3>Informações de Envio</h3>
        <label htmlFor="name">Nome Completo</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="address">Endereço</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />

        <label htmlFor="city">Cidade</label>
        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />

        <label htmlFor="zip">CEP</label>
        <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} required />

        <button type="submit">Confirmar Pedido</button>
      </form>
    </div>
  );
};

export default Checkout;