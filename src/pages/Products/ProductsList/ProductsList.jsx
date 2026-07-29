import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './ProductsList.css';
import useHeader from '../../../hooks/useHeader';
import { useHeaderConfig } from '../../../context/HeaderContext';

function ProductsList() {
  useHeader({ titulo: "Lista de Productos", mostrarBuscador: true, mostrarBotonNuevo: true });
  const [products, setProducts] = useState([]);
  const { searchQuery } = useHeaderConfig();
  const [orden, setOrden] = useState('');

  const getProducts = async() => {
    const resp = await fetch("http://localhost:3000/api/productos/",{
      method : "GET",
      headers: {
      "Content-Type": "application/json",
      }
    });
    const data = await resp.json();
    setProducts(data.data);
  };
  const filteredProducts = useMemo(() => {
  let result = [...products];
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    result = result.filter(p => p.nombre.toLowerCase().includes(q) || (p.categoria && p.categoria.toLowerCase().includes(q)));
  }
  if (orden === 'precio-asc') result.sort((a, b) => a.precio - b.precio);
  if (orden === 'precio-desc') result.sort((a, b) => b.precio - a.precio);
  if (orden === 'nombre') result.sort((a, b) => a.nombre.localeCompare(b.nombre));
  if (orden === 'nombre-desc') result.sort((a, b) => b.nombre.localeCompare(a.nombre))
  return result;
}, [searchQuery, products, orden]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="products-page">
      <div className="products-page__sort">
        <button className="button" onClick={() => setOrden(orden === 'precio-asc' ? '' : 'precio-asc')}>Precio ↑</button>
        <button className="button" onClick={() => setOrden(orden === 'precio-desc' ? '' : 'precio-desc')}>Precio ↓</button>
        <button className="button" onClick={() => setOrden(orden === 'nombre' ? '' : 'nombre')}>Nombre A-Z</button>
        <button className="button" onClick={() => setOrden(orden === 'nombre-desc' ? '' : 'nombre-desc')}>Nombre Z-A</button>
        {orden && <button className="button" onClick={() => setOrden('')}>✕</button>}  
      </div>

      <section className="product-list" aria-label="Listado de productos">
        {filteredProducts.map((p) => (
          <Link className="product-card" to={`/products/${p.id}`} key={p.id}>
            <img src={p.img} alt="" />
            <span className="product-card__info">
              <strong>{p.nombre}</strong>
              <small>Stock: {p.stock} | ${p.precio}</small>
            </span>
            <span className="product-card__arrow" aria-hidden="true">›</span>
          </Link>
        ))}
        {filteredProducts.length === 0 && (
          <p className="product-list__empty">No hay productos disponibles.</p>
        )}
      </section>
    </main>
  );
}

export default ProductsList;