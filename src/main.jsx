import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './CartContext.jsx'; // <--- Importe o provedor

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* <--- Envolva o App com o provedor */}
      <App />
    </CartProvider>
  </React.StrictMode>,
);