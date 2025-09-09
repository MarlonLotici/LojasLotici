import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from './CartContext';
import productsData from '../products.json';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import '../styles/Pages.css';

// Componente de Estrelas (reutilizado)
const StarRating = ({ rating, count }) => {
    const fullStars = Math.floor(rating);
    return (
        <div className="star-rating detail-rating">
             <div className="stars">
                {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} size={18} fill="gold" strokeWidth={0} />)}
                {[...Array(5 - fullStars)].map((_, i) => <Star key={`empty-${i}`} size={18} color="#ccc" strokeWidth={1} />)}
            </div>
            {count && <span className="rating-count">({count} avaliações)</span>}
        </div>
    );
};

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
        const foundProduct = productsData.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            setSelectedColor(foundProduct.colors ? foundProduct.colors[0] : null);
            setSelectedSize(foundProduct.sizes ? foundProduct.sizes[0] : null);
            
            const related = productsData.filter(p => p.category === foundProduct.category && p.id !== foundProduct.id).slice(0, 4);
            setRelatedProducts(related);
        } else {
            navigate('/produtos');
        }
    }, [id, navigate]);

    if (!product) return <div>Carregando...</div>;

    const handleAddToCart = () => {
        addToCart({ ...product, selectedColor, selectedSize }, quantity);
    };

    const handleBuyNow = () => {
        addToCart({ ...product, selectedColor, selectedSize }, quantity);
        navigate('/cart');
    };

    return (
        <div className="page-container">
            <div className="product-detail-layout">
                <div className="product-image-gallery">
                    <img src={product.image} alt={product.title} className="main-product-image" />
                </div>
                <div className="product-info">
                    <h1 className="product-main-title">{product.title}</h1>
                    <StarRating rating={product.rating.rate} count={product.rating.count} />
                    <p className="product-main-price">R$ {product.price.toFixed(2)}</p>
                    <p className="product-main-description">{product.description}</p>

                    {product.colors && (
                        <div className="product-variant-group">
                            <label>Cor: <strong>{selectedColor}</strong></label>
                            <div className="variant-options">
                                {product.colors.map(color => (
                                    <button key={color} onClick={() => setSelectedColor(color)} className={`variant-btn color-swatch ${selectedColor === color ? 'active' : ''}`} style={{'--color-swatch': color.toLowerCase()}}></button>
                                ))}
                            </div>
                        </div>
                    )}
                     {product.sizes && (
                        <div className="product-variant-group">
                            <label>Tamanho: <strong>{selectedSize}</strong></label>
                            <div className="variant-options">
                                {product.sizes.map(size => (
                                    <button key={size} onClick={() => setSelectedSize(size)} className={`variant-btn size-btn ${selectedSize === size ? 'active' : ''}`}>{size}</button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="quantity-selector">
                        <label>Quantidade:</label>
                        <div className="quantity-controls">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)}>+</button>
                        </div>
                    </div>
                    
                    <div className="product-actions">
                        <button className="btn btn-primary" onClick={handleAddToCart}><ShoppingCart size={20}/> Adicionar ao Carrinho</button>
                        <button className="btn btn-secondary" onClick={handleBuyNow}>Comprar Agora</button>
                    </div>
                </div>
            </div>
            
            <div className="related-products">
                <h2 className="section-title">Você também pode gostar</h2>
                <div className="featured-grid">
                     {relatedProducts.map(p => (
                         <Link key={p.id} to={`/product/${p.id}`} className="product-card">
                             <div className="product-card-image-wrapper">
                                 <img src={p.image} alt={p.title} className="product-card-image" />
                             </div>
                             <div className="product-card-content">
                                 <h3 className="product-card-title">{p.title}</h3>
                                 <p className="product-card-price">R$ {p.price.toFixed(2)}</p>
                             </div>
                         </Link>
                     ))}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
