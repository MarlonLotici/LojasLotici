import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('shoppingCart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Falha ao carregar o carrinho do localStorage", error);
      return [];
    }
  });

  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    try {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    } catch (error) {
      console.error("Falha ao salvar o carrinho no localStorage", error);
    }
  }, [cart]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 4000); // A notificação some após 4 segundos
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showNotification(`${product.title} foi adicionado ao carrinho!`);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    showNotification('Item removido do carrinho.', 'error');
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    notification,
    showNotification
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
