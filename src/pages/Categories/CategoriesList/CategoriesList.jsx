import React, { useEffect, useState } from 'react';
import './CategoriesList.css';
import useHeader from '../../../hooks/useHeader';
import { Link } from 'react-router-dom';

function CategoriesList() {
  const [categorias, setCategorias] = useState([]);
  useHeader({ titulo: "Categorias", mostrarBotonNuevo: false, mostrarBotonNuevaCategoria: true });

  const getCategorias = async () => {
    const resp = await fetch('http://localhost:3000/api/productos/', {
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await resp.json();
    const cats = [...new Set(data.data.map(p => p.categoria))];
    setCategorias(cats);
  };

  useEffect(() => {
    getCategorias();
  }, []);

  return (
    <div className="categories-list">
      <h1>Categorías</h1>
      <div className="product-list">
        {categorias.map((cat) => (
          <Link className="product-card" to={`/categories/${cat}`} key={cat}>
            <span className="product-card__info">
              <strong>{cat}</strong>
            </span>
            <span className="product-card__arrow" aria-hidden="true">›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoriesList;
