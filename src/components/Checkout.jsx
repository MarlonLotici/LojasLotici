import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Pages.css';

function Checkout() {
    const { cart, getTotalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', email: '', address: '', city: '', state: '', zip: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (cart.length === 0) {
            alert("Seu carrinho está vazio.");
            return;
        }
        console.log('Pedido Finalizado:', { formData, cart });
        clearCart();
        navigate('/order-success');
    };

    return (
        <div className="page-container checkout-page">
            <h1>Finalizar Compra</h1>
            <div className="checkout-layout">
                <div className="checkout-form">
                    <h2>Informações de Contato e Envio</h2>
                    <form onSubmit={handleSubmit}>
                         <div className="form-group">
                            <label className="form-label" htmlFor="name">Nome Completo</label>
                            <input className="form-control" type="text" id="name" name="name" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">E-mail</label>
                            <input className="form-control" type="email" id="email" name="email" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="address">Endereço</label>
                            <input className="form-control" type="text" id="address" name="address" onChange={handleChange} required />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="city">Cidade</label>
                                <input className="form-control" type="text" id="city" name="city" onChange={handleChange} required />
                            </div>
                             <div className="form-group">
                                <label className="form-label" htmlFor="state">Estado</label>
                                <input className="form-control" type="text" id="state" name="state" onChange={handleChange} required />
                            </div>
                        </div>
                         <div className="form-group">
                            <label className="form-label" htmlFor="zip">CEP</label>
                            <input className="form-control" type="text" id="zip" name="zip" onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Finalizar e Pagar</button>
                    </form>
                </div>

                <aside className="order-summary checkout-summary">
                    <h2>Resumo do Pedido</h2>
                    {cart.map(item => (
                        <div key={item.id} className="summary-item">
                           <img src={item.image} alt={item.title} />
                           <div>
                                <span>{item.title} (x{item.quantity})</span>
                                <strong>R$ {(item.price * item.quantity).toFixed(2)}</strong>
                           </div>
                        </div>
                    ))}
                    <div className="summary-total">
                        <span>Total</span>
                        <span>R$ {getTotalPrice().toFixed(2)}</span>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Checkout;
