import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StarRating = ({ rate }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= Math.floor(rate) ? 'star-filled' : 'star-empty'}>
        ★
      </span>
    );
  }
  return <div className="product-rating">{stars}</div>;
};

// Componente para a animação de carregamento (skeleton)
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-text"></div>
    <div className="skeleton-text short"></div>
    <div className="skeleton-text"></div>
  </div>
);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        setFilteredProducts(json);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (category) {
      result = result.filter(product => product.category === category);
    }

    setFilteredProducts(result);
  }, [searchTerm, category, products]);

  const allCategories = [...new Set(products.map(product => product.category))];

  const handleClear = () => {
    setSearchTerm('');
    setCategory('');
  };

  return (
    <div>
      <h2>Todos os Produtos</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select value={category} onChange={e => setCategory(e.target.value)} className="category-select">
          <option value="">Todas as Categorias</option>
          {allCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={handleClear} className="clear-button">Limpar</button>
      </div>

      <div className="product-grid">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
        ) : (
          filteredProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <StarRating rate={product.rating.rate} />
              <p>R$ {product.price.toFixed(2)}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;