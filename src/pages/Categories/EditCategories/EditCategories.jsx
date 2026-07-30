// src/pages/Categories/EditCategories/EditCategories.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../Products/ProductView/ProductView.css';
import useHeader from '../../../hooks/useHeader';

function EditCategories() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [nombre, setNombre] = useState(state?.nombre || '');
  useHeader({ titulo: 'Editar categoría', mostrarBuscador: false, backLink: '/categories' });

  const editCategory = async (e) => {
    e.preventDefault();
    const resp = await fetch(`http://localhost:3000/api/categorias/${state.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre })
    });
    const data = await resp.json();
    if (data.success) navigate('/categories');
  };

  return (
    <main className="product-view">
      <form className="product-form" onSubmit={editCategory}>
        <h2>Información</h2>
        <label>
          Nombre de la categoría
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </label>
        <button className="button button--primary" type="submit">Guardar cambios</button>
      </form>
    </main>
  );
}

export default EditCategories;