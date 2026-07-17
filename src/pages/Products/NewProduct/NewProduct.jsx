import React, { useState } from 'react';
import '../ProductView/ProductView.css';
import { Link } from 'react-router-dom';

function NewProduct() {
  const [stock, setStock] = useState(1);

  return (
    <main className="product-view">
      <header className="product-view__header">
        <h1><Link to="/products">Productos</Link><span>›</span> Nuevo producto</h1>
      </header>
      <form className="product-form" onSubmit={(event) => event.preventDefault()}>
        <h2>Información</h2>
        <label>Nombre<input placeholder="Nombre del producto" /></label>
        <label>Valor<input type="number" placeholder="0" /></label>
        <label>Stock<span className="stock-control"><button type="button" onClick={() => setStock(Math.max(0, stock - 1))}>−</button><output>{stock}</output><button type="button" onClick={() => setStock(stock + 1)}>+</button></span></label>
        <label>Descripción<textarea placeholder="Descripción del producto" /></label>
        <label>Tienda<select defaultValue=""><option value="" disabled>Seleccionar tienda</option><option value="havanna">Havanna SL</option></select></label>
        <h2 className="product-form__gallery-title">Galería de Imágenes</h2>
        <label>Nueva Imagen<input placeholder="Pegá la URL de la imagen" /></label>
        <button className="button button--primary" type="submit">Guardar producto</button>
      </form>
    </main>
  );
}

export default NewProduct;
