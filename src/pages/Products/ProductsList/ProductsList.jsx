import React from 'react';
import './ProductsList.css';
import useHeader from '../../../hooks/useHeader';

function ProductsList() {
  useHeader({ titulo: "Lista de Productos", mostrarBuscador: true, mostrarBotonNuevo: true });
  return <div>Lista de Productos</div>;
}

export default ProductsList;