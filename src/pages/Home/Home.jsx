import React from 'react';
import './Home.css';
import useHeader from '../../hooks/useHeader';

function Home() {
  useHeader({ titulo: "Inicio" });
  return <div>Inicio</div>;
}

export default Home;