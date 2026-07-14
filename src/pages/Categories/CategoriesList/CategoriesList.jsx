import React from 'react';
import './CategoriesList.css';
import useHeader from '../../../hooks/useHeader';

function CategoriesList() {
  useHeader({titulo:"Categorias", mostrarBotonNuevo: true})
  return <div>categorias</div>
}

export default CategoriesList;
