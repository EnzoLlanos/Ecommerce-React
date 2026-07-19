import React, { useState } from 'react';
import './ProductView.css';
import { useParams } from 'react-router-dom';
import useHeader from '../../../hooks/useHeader';

function ProductView() {
  const { id } = useParams();
  const [stock, setStock] = useState(1);
  useHeader({ titulo: `Producto #${id}`, mostrarBuscador: false, backLink: '/products' });
  return (
    <main className="product-view">
      <section className="product-summary">
        <img src="https://placehold.co/96x96/cccccc/444?text=Producto" alt="Producto" />
        <div><h2>Alfajores Havanna Chocolate 12 Unidades</h2><div className="product-summary__stats"><b>19.900</b><small>PUNTOS<br />SUPERCLUB</small><b>999</b><small>STOCK<br />DISPONIBLE</small><span>● Havanna SL</span></div></div>
      </section>
      <form className="product-form" onSubmit={(event) => event.preventDefault()}>
        <h2>Información</h2>
        <label>Nombre<input defaultValue="Alfajores Havanna Chocolate 12 Unidades" /></label>
        <label>Valor<input type="number" defaultValue="19900" /></label>
        <label>Stock<span className="stock-control"><button type="button" onClick={() => setStock(Math.max(0, stock - 1))}>−</button><output>{stock}</output><button type="button" onClick={() => setStock(stock + 1)}>+</button></span></label>
        <label>Descripción<textarea defaultValue="Alfajores rellenos con dulce de leche y cobertura de chocolate." /></label>
        <label>Tienda<select defaultValue="havanna"><option value="havanna">Havanna SL</option><option value="otra">Otra tienda</option></select></label>
        <h2 className="product-form__gallery-title">Galería de Imágenes</h2>
        <label>Nueva Imagen<input placeholder="Pegá la URL de la imagen" /></label>
      </form>
    </main>
  );
}

export default ProductView;
