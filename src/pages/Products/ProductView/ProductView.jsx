import React from 'react';
import './ProductView.css';
import { useParams } from 'react-router-dom';
import useHeader from '../../../hooks/useHeader';

function ProductView() {
  const { id } = useParams();
  useHeader({ titulo: `Producto #${id}` });
  return <div>Producto con id: {id}</div>;
}

export default ProductView;