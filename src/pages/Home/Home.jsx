import React from 'react';
import './Home.css';
import useHeader from '../../hooks/useHeader';

function Home({userName}) {
  useHeader({ titulo: `¡Hola ${userName}!`, mostrarBuscador: false });
  return <div>Inicio</div>;
}

export default Home;