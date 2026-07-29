import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CategorieView.css';
import useHeader from '../../../hooks/useHeader';

function CategorieView() {
  const { nombre } = useParams();
  useHeader({ titulo: nombre, mostrarBuscador: false, backLink: '/categories' });
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const resp = await fetch('http://localhost:3000/api/productos/')
    const data = await resp.json();
    setProducts(data.data.filter(p => p.categoria === nombre));
  };

  useEffect(() => { getProducts(); }, [nombre])


  return (
  <main className="product-view">
    <section className="product-list">
      {products.map(p => (
        <Link className="product-card" to={`/products/${p.id}`} key={p.id}>
          <img src={p.img} alt="" />
          <span className="product-card__info">
            <strong>{p.nombre}</strong>
            <small>Stock: {p.stock} | ${p.precio}</small>
          </span>
          <span className="product-card__arrow">›</span>
        </Link>
      ))}
    </section>
  </main>
);
}

export default CategorieView;
