import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductsList.css';
import useHeader from '../../../hooks/useHeader';

function ProductsList() {
  useHeader({ titulo: "Lista de Productos", mostrarBuscador: true, mostrarBotonNuevo: true });
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="products-page">
      <section className="product-list" aria-label="Listado de productos">
        {products.map((p) => (
          <Link className="product-card" to={`/products/${p.id}`} key={p.id}>
            <img src={p.img} alt="" />
            <span className="product-card__info">
              <strong>{p.nombre}</strong>
              <small>Stock: {p.stock} | ${p.precio}</small>
            </span>
            <span className="product-card__arrow" aria-hidden="true">›</span>
          </Link>
        ))}
        {products.length === 0 && (
          <p className="product-list__empty">No hay productos disponibles.</p>
        )}
      </section>
    </main>
  );
}

export default ProductsList;