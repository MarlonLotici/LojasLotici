import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Checkout from './Checkout';
import OrderSuccess from './OrderSuccess'; // Importa o novo componente
import Sobre from './Sobre';
import Contato from './Contato';
import { CartProvider } from './CartContext';
import ScrollToTopButton from './ScrollToTopButton';
import './App.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App">
          <header className="App-header">
            <h1>Minha Loja</h1>
            <nav>
              <Link to="/">Loja</Link>
              <Link to="/cart">Ver Carrinho</Link>
              <Link to="/sobre">Sobre Nós</Link>
              <Link to="/contato">Contato</Link>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} /> {/* Nova rota */}
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
            </Routes>
          </main>
          <ScrollToTopButton />
          <footer className="App-footer">
            <p>&copy; 2023 Minha Loja. Todos os direitos reservados.</p>
            <div>
              <a href="/termos">Termos de Uso</a> | <a href="/politica-privacidade">Política de Privacidade</a>
            </div>
          </footer>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;