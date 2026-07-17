import React, { useMemo, useState } from 'react';
import './ProductsList.css';
import { Link } from 'react-router-dom';

const products = [
  { id: '8289', name: 'Product 4', image: 'https://placehold.co/96x96/cccccc/444?text=+' },
  { id: '456', name: 'Product 5', image: 'https://placehold.co/96x96/cccccc/444?text=+' },
  { id: '3456', name: 'Product 6', image: 'https://placehold.co/96x96/cccccc/444?text=+' },
  { id: '123', name: 'Product 7', image: 'https://placehold.co/96x96/cccccc/444?text=+' },
  { id: '8', name: 'Product 8', image: 'https://placehold.co/96x96/cccccc/444?text=+' },
  { id: '3456-2', name: 'Product 9', image: 'https://placehold.co/96x96/cccccc/444?text=+' },
  { id: '123-2', name: 'Product 10', image: 'https://placehold.co/96x96/cccccc/444?text=+' },
  { id: '8-2', name: 'Product 11', image: 'https://placehold.co/96x96/cccccc/444?text=+' },
];

function ProductsList() {
  const [query, setQuery] = useState('');
  const filteredProducts = useMemo(() => products.filter(({ name, id }) =>
    `${name} ${id}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <main className="products-page">
      <header className="products-page__header">
        <h1>Productos</h1>
        <div className="products-page__actions">
          <label className="search-field" aria-label="Buscar productos">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar productos" />
            <span aria-hidden="true">⌕</span>
          </label>
          <Link className="button button--primary" to="/products/new">Agregar Producto</Link>
        </div>
      </header>

      <section className="product-list" aria-label="Listado de productos">
        {filteredProducts.map((product) => (
          <Link className="product-card" to={`/products/${product.id}`} key={product.id}>
            <img src={product.image} alt="" />
            <span className="product-card__info">
              <strong>{product.name}</strong>
              <small>#{product.id}</small>
            </span>
            <span className="product-card__arrow" aria-hidden="true">›</span>
          </Link>
        ))}
        {filteredProducts.length === 0 && <p className="product-list__empty">No encontramos productos para esa búsqueda.</p>}
      </section>
    </main>
  );
}

export default ProductsList;
