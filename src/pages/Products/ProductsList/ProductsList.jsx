import React from 'react';
import './ProductsList.css';
import Header from '../../../components/Header/Header';
function ProductsList() {
  return (
    <>
      <Header titulo={"Lista de Productos"} mostrarBuscador={true} mostrarBotonNuevo={true}/>
    </>
  );
}

export default ProductsList;
