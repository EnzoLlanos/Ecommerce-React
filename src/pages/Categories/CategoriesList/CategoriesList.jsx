import React, { useEffect, useState, useMemo } from 'react';
import './CategoriesList.css';
import useHeader from '../../../hooks/useHeader';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useHeaderConfig } from '../../../context/HeaderContext';


function CategoriesList() {
  const location = useLocation();
  const [categorias, setCategorias] = useState([]);
  const { searchQuery } = useHeaderConfig();
  useHeader({ titulo: "Categorias", mostrarBotonNuevo: false, mostrarBotonNuevaCategoria: true });
  const navigate = useNavigate();
  

  const getCategorias = async () => {
  const resp = await fetch('http://localhost:3000/api/categorias/');
  const data = await resp.json();
  
  setCategorias(data.data);
};
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categorias;
    const q = searchQuery.toLowerCase();
    return categorias.filter(cat => cat.nombre.toLowerCase().includes(q));
  }, [searchQuery, categorias]);

  useEffect(() => {
  getCategorias();
}, [location]);
const eliminarCategoria = async (id) => {
  const resp = await fetch(`http://localhost:3000/api/categorias/${id}`, { method: 'DELETE' });
  const data = await resp.json();
  if (data.success) getCategorias();
};

const editarCategoria = (cat) => {
  navigate(`/categories/edit/${cat.id}`, { state: cat });
};
  return (
    <div className="categories-list">
      <h1>Categorías</h1>
      <div className="product-list">
        {filteredCategories.map((cat) => (
        <div className="product-card" key={cat.id}>
          <Link className="product-card__link" to={`/categories/${cat.nombre}`}>
            <span className="product-card__info">
              <strong>{cat.nombre}</strong>
            </span>
          </Link>
          <div className="product-card__actions">
            <button className="button category-action-button" onClick={() => editarCategoria(cat)}>Editar</button>
            <button className="button button--danger category-action-button" onClick={() => eliminarCategoria(cat.id)}>Eliminar</button>
          </div>
          <span className="product-card__arrow">›</span>
        </div>
      ))}
      </div>
    </div>
  );
}

export default CategoriesList;
