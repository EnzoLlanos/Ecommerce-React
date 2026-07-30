import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ProductView/ProductView.css';
import useHeader from '../../../hooks/useHeader';

import { Alert } from "../../../components/Alert/Alert";

const initialForm = {
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  categoria: "",
  img: ""
};

function NewProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [alert, setAlert] = useState({
    visible: false,
    type: "",
    title: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useHeader({ titulo: 'Nuevo producto', mostrarBuscador: false, backLink: '/products' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);

  if (Number(form.precio) <= 0 || Number(form.stock) < 0) {
    setAlert({ visible: true, type: "error", title: "Error", message: "Precio debe ser mayor a 0 y Stock no puede ser negativo." });
    setLoading(false);
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/productos/crear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        precio: Number(form.precio),
        stock: Number(form.stock),
        categoria: form.categoria.trim(),
        img: form.img.trim()
      })
    });

    if (!response.ok) throw new Error("No se pudo guardar el producto");

    setForm(initialForm);
    setAlert({ visible: true, type: "success", title: "¡Listo!", message: "Producto guardado correctamente." });
    setTimeout(() => navigate('/products'), 1500);
  } catch (err) {
    setAlert({ visible: true, type: "error", title: "Error", message: "No se pudo guardar el producto. Intenta nuevamente." });
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="product-view">

      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Información</h2>

        <label>
          Nombre
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
        </label>

        <label>
          Descripción
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows="4" required />
        </label>

        <label>
          Precio
          <input type="number" name="precio" value={form.precio} onChange={handleChange} min="0" step="0.01" required />
        </label>

        <label>
          Stock
          <input type="number" name="stock" value={form.stock} onChange={handleChange} min="0" step="1" required />
        </label>

        <label>
          Categoría
          <input type="text" name="categoria" value={form.categoria} onChange={handleChange} required />
        </label>

        <label>
          Imagen
          <input type="url" name="img" value={form.img} onChange={handleChange} placeholder="https://..."  />
        </label>


        <Alert alert={alert} onClose={() => setAlert(prev => ({...prev, visible: false}))} />
        <button className="button button--primary" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </main>
  );
}

export default NewProduct;