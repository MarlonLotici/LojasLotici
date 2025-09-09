import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ListFilter, Search } from 'lucide-react';
import productsData from '../products.json';
import '../styles/Pages.css'; // Estilos para as páginas

// Componente de Estrelas (reutilizado)
const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} size={16} fill="gold" strokeWidth={0} />)}
            {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} size={16} color="#ccc" strokeWidth={1} />)}
        </div>
    );
};

// Card de Produto (reutilizado)
const ProductCard = ({ product }) => (
    <Link to={`/product/${product.id}`} className="product-card">
        <div className="product-card-image-wrapper">
            <img src={product.image} alt={product.title} className="product-card-image" />
        </div>
        <div className="product-card-content">
            <h3 className="product-card-title">{product.title}</h3>
            <StarRating rating={product.rating.rate} />
            <p className="product-card-price">R$ {product.price.toFixed(2)}</p>
        </div>
    </Link>
);


function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setProducts(productsData);
        const uniqueCategories = ['All', ...new Set(productsData.map(p => p.category))];
        setCategories(uniqueCategories);
    }, []);
    
    useEffect(() => {
        let result = products;
        if (searchTerm) {
            result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }
        setFilteredProducts(result);
    }, [searchTerm, selectedCategory, products]);

    return (
        <div className="page-container product-list-page">
            <aside className="filters-sidebar">
                <h3 className="filter-title"><ListFilter size={20} /> Filtros</h3>
                <div className="filter-group">
                    <h4>Categoria</h4>
                    <ul>
                        {categories.map(cat => (
                            <li key={cat}
                                className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}>
                                {cat}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            <main className="product-list-content">
                <div className="search-bar">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar por nome do produto..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="product-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>Nenhum produto encontrado.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default ProductList;
