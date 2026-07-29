import React, { useEffect, useState, useMemo } from 'react';
import './CategoriesList.css';
import useHeader from '../../../hooks/useHeader';
import { Link } from 'react-router-dom';
import { useHeaderConfig } from '../../../context/HeaderContext';

function CategoriesList() {
  const [categorias, setCategorias] = useState([]);
  const { searchQuery } = useHeaderConfig();
  useHeader({ titulo: "Categorias", mostrarBotonNuevo: false, mostrarBotonNuevaCategoria: true });
  

  const getCategorias = async () => {
    const resp = await fetch('http://localhost:3000/api/productos/', {
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await resp.json();
    const cats = [...new Set(data.data.map(p => p.categoria))];
    setCategorias(cats);
  };
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categorias;
    const q = searchQuery.toLowerCase();
    return categorias.filter(cat => cat.toLowerCase().includes(q));
  }, [searchQuery, categorias]);

  useEffect(() => {
    getCategorias();
  }, []);

  return (
    <div className="categories-list">
      <h1>Categorías</h1>
      <div className="product-list">
        {filteredCategories.map((cat) => (
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
