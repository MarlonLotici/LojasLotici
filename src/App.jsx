import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { useCart } from './components/CartContext';

// Importação das páginas/componentes
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import Sobre from './components/Sobre';
import Contato from './components/Contato';

// Ícones
import { Search, ShoppingCart, User, Menu, X, Star } from 'lucide-react';

// Componente reutilizável de Notificação (Toast)
const Notification = ({ message, type }) => {
    if (!message) return null;
    return <div className={`notification notification-${type}`}>{message}</div>;
};

// Componente do Cabeçalho
const AppHeader = () => {
    const { cart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="app-header">
            <div className="header-content">
                <Link to="/" className="store-logo">
                    Listici
                </Link>
                <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                    <NavLink to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Início</NavLink>
                    <NavLink to="/produtos" className="nav-link" onClick={() => setIsMenuOpen(false)}>Produtos</NavLink>
                    <NavLink to="/sobre" className="nav-link" onClick={() => setIsMenuOpen(false)}>Sobre Nós</NavLink>
                    <NavLink to="/contato" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contato</NavLink>
                </nav>
                <div className="header-actions">
                    <button className="icon-btn"><Search size={22} /></button>
                    <button className="icon-btn"><User size={22} /></button>
                    <Link to="/cart" className="icon-btn cart-btn">
                        <ShoppingCart size={22} />
                        {itemCount > 0 && <span className="cart-item-count">{itemCount}</span>}
                    </Link>
                    <button className="icon-btn mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </header>
    );
};

// Componente do Rodapé
const AppFooter = () => (
    <footer className="app-footer">
        <div className="footer-content">
            <div className="footer-section">
                <h3 className="footer-title">Listici</h3>
                <p>Sua nova loja favorita. Encontre as últimas tendências da moda e os melhores acessórios.</p>
            </div>
            <div className="footer-section">
                <h3 className="footer-title">Links Rápidos</h3>
                <ul className="footer-links">
                    <li><Link to="/sobre">Sobre Nós</Link></li>
                    <li><Link to="/contato">Contato</Link></li>
                    <li><Link to="/produtos">Termos de Uso</Link></li>
                    <li><Link to="/produtos">Política de Privacidade</Link></li>
                </ul>
            </div>
            <div className="footer-section">
                <h3 className="footer-title">Siga-nos</h3>
                <p>Fique por dentro das novidades em nossas redes sociais.</p>
                {/* Aqui iriam os ícones das redes sociais */}
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Listici. Todos os direitos reservados.</p>
        </div>
    </footer>
);

// Componente 404
const NotFound = () => (
    <div className="not-found-page">
        <h2>404 - Página Não Encontrada</h2>
        <p>Oops! A página que você está procurando não existe.</p>
        <Link to="/" className="btn btn-primary">Voltar para a Página Inicial</Link>
    </div>
);


// Componente principal da aplicação
function App() {
    const { notification } = useCart();

    return (
        <Router>
            <div className="App">
                <Notification message={notification.message} type={notification.type} />
                <AppHeader />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/produtos" element={<ProductList />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-success" element={<OrderSuccess />} />
                        <Route path="/sobre" element={<Sobre />} />
                        <Route path="/contato" element={<Contato />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <AppFooter />
            </div>
        </Router>
    );
}

export default App;
