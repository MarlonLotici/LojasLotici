import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

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

const SkeletonDetail = () => (
  <div className="skeleton-detail">
    <div className="skeleton-image-lg"></div>
    <div className="skeleton-info">
        <div className="skeleton-text-lg"></div>
        <div className="skeleton-text-lg short"></div>
        <div className="skeleton-text-lg"></div>
        <div className="skeleton-text-lg"></div>
    </div>
  </div>
);

const PLACEHOLDER_IMAGE = '/no-image.png';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, showNotification, clearCart } = useCart(); // Adicionado clearCart
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(json => {
        setProduct(json);
        setLoading(false);
        fetch(`https://fakestoreapi.com/products/category/${json.category}`)
          .then(res => res.json())
          .then(relatedJson => {
            const filteredRelated = relatedJson.filter(p => p.id !== json.id);
            setRelatedProducts(filteredRelated.slice(0, 4));
          });
      })
      .catch(err => {
        console.error("Erro ao buscar o produto:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <SkeletonDetail />;
  }

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    showNotification();
  };

  const handleBuyNow = () => {
    clearCart(); // Limpa o carrinho para que apenas este item esteja nele
    addToCart(product); // Adiciona o produto atual
    navigate('/checkout'); // Redireciona para o checkout
  };

  return (
    <div>
      <div className="product-detail">
        <div className="product-image-section">
          <img src={product.image} alt={product.title} className="product-main-image" />
        </div>
        <div className="product-info-section">
          <h2>{product.title}</h2>
          <StarRating rate={product.rating.rate} />
          <p className="product-price">R$ {product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          <div className="button-group">
            <button onClick={handleAddToCart} className="add-to-cart-button">
              Adicionar ao Carrinho
            </button>
            <button onClick={handleBuyNow} className="buy-now-button"> {/* Novo botão */}
              Comprar Agora
            </button>
            <button onClick={() => navigate('/')} className="continue-shopping-button">
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h3>Produtos Relacionados</h3>
          <div className="related-products-grid">
            {relatedProducts.map(related => (
              <Link to={`/product/${related.id}`} key={related.id} className="related-product-card">
                <img 
                  src={related.image} 
                  alt={related.title} 
                  onError={(e) => { e.target.onerror = null; e.target.src=PLACEHOLDER_IMAGE }} 
                />
                <h4>{related.title}</h4>
                <p>R$ {related.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;