import React from 'react';
import './ProductView.css';
import { useParams } from 'react-router-dom';

function ProductView() {
  const { id } = useParams();
  return (<h1>Producto con id: {id}</h1>);
}

export default ProductView;
