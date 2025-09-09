import React from 'react';
import { useCart } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import '../styles/Pages.css';

function Cart() {
    const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="page-container empty-cart">
                <h2>Seu carrinho está vazio</h2>
                <p>Adicione produtos para vê-los aqui.</p>
                <Link to="/produtos" className="btn btn-primary">Ver produtos</Link>
            </div>
        );
    }

    return (
        <div className="page-container cart-page">
            <div className="cart-layout">
                <div className="cart-items-list">
                    <h1>Meu Carrinho</h1>
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.title}</h3>
                                <p>Preço: R$ {item.price.toFixed(2)}</p>
                                <div className="cart-item-quantity">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={16} /></button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button>
                                </div>
                            </div>
                            <div className="cart-item-actions">
                                <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item.id)} className="remove-btn"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>

                <aside className="order-summary">
                    <h2>Resumo do Pedido</h2>
                    <div className="summary-row">
                        <span>Subtotal ({cart.length} itens)</span>
                        <span>R$ {getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Frete</span>
                        <span>Grátis</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>R$ {getTotalPrice().toFixed(2)}</span>
                    </div>
                    <button className="btn btn-primary btn-block" onClick={() => navigate('/checkout')}>
                        Finalizar Compra
                    </button>
                    <Link to="/produtos" className="keep-shopping-link">Continuar comprando</Link>
                </aside>
            </div>
        </div>
    );
}

export default Cart;
