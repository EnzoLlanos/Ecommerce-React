import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ProductView/ProductView.css';
import useHeader from '../../../hooks/useHeader';

function NewProduct() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imgLink, setImgLink] = useState('');
  const [categorias, setCategorias] = useState([]);
  useHeader({ titulo: 'Nuevo producto', mostrarBuscador: false, backLink: '/products' });

  const getCategorias = async () => {
    const resp = await fetch('http://localhost:3000/api/productos/', {
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await resp.json();
    const cats = [...new Set(data.data.map(p => p.categoria))];
    setCategorias(cats);
  };

  const createProduct = async (e) => {
    e.preventDefault();
    const resp = await fetch('http://localhost:3000/api/productos/crear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        descripcion,
        categoria,
        img: imgLink
      })
    });
    const data = await resp.json();
    if (data.success) navigate('/products');
  };

  useEffect(() => {
    getCategorias();
  }, []);

  return (
    <main className="product-view">
      <form className="product-form" onSubmit={createProduct}>
        <h2>Información</h2>

        <label>
          Nombre
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </label>

        <label>
          Precio
          <input type="number" step="0.01" min="0" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        </label>

        <label>
          Stock
          <input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </label>

        <label>
          Descripción
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        </label>

        <label>
          Categoría
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
            <option value="" disabled>Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <h2 className="product-form__gallery-title">Galería de Imágenes</h2>
        <label>
          Nueva Imagen
          {imgLink && <img src={imgLink} className="product-form__img-preview" />}
          <input type="text" placeholder="Pegá la URL de la imagen" value={imgLink} onChange={(e) => setImgLink(e.target.value)} />
        </label>

        <button className="button button--primary" type="submit">Guardar producto</button>
      </form>
    </main>
  );
}

export default NewProduct;