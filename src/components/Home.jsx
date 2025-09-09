import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import '../styles/Home.css';
import productsData from '../products.json';

// Componente para renderizar estrelas de avaliação
const StarRating = ({ rating, count }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="star-rating">
            <div className="stars">
                {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} size={16} fill="gold" strokeWidth={0} />)}
                {halfStar && <Star size={16} fill="gold" strokeWidth={0} style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />}
                {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} size={16} color="#ccc" strokeWidth={1} />)}
            </div>
            {count && <span className="rating-count">({count})</span>}
        </div>
    );
};

// Componente de Card de Produto
const ProductCard = ({ product }) => (
    <Link to={`/product/${product.id}`} className="product-card">
        <div className="product-card-image-wrapper">
            <img src={product.image} alt={product.title} className="product-card-image" />
        </div>
        <div className="product-card-content">
            <h3 className="product-card-title">{product.title}</h3>
            <StarRating rating={product.rating.rate} count={product.rating.count} />
            <p className="product-card-price">R$ {product.price.toFixed(2)}</p>
        </div>
    </Link>
);


function Home() {
    const featuredProducts = productsData.slice(0, 4);

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Estilo que Inspira</h1>
                    <p className="hero-subtitle">Descubra as coleções que vão transformar o seu guarda-roupa.</p>
                    <Link to="/produtos" className="btn btn-primary hero-cta">
                        Explorar Coleção <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            <section className="featured-section">
                <h2 className="section-title">Produtos em Destaque</h2>
                <div className="featured-grid">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
