import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Products/ProductView/ProductView.css';
import useHeader from '../../../hooks/useHeader';

function NewCategories() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  useHeader({ titulo: 'Nueva categoría', mostrarBuscador: false, backLink: '/categories' });

  const createCategory = async (e) => {
    e.preventDefault();
    const resp = await fetch('http://localhost:3000/api/categorias/crear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre })
    });
    const data = await resp.json();
    if (data.success) navigate('/categories');
  };

  return (
    <main className="product-view">
      <form className="product-form" onSubmit={createCategory}>
        <h2>Información</h2>
        <label>
          Nombre de la categoría
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </label>
        <button className="button button--primary" type="submit">Guardar categoría</button>
      </form>
    </main>
  );
}

export default NewCategories;