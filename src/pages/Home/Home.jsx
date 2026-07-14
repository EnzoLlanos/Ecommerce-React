import React from 'react';
import './Home.scss';
import useHeader from '../../hooks/useHeader';
import {FaBoxOpen, FaTags} from "react-icons/fa"
import { Link } from 'react-router-dom';

function Home({userName}) {
  useHeader({ titulo: `¡Hola ${userName}!`, mostrarBuscador: false });

  return( 
    <div className="home">
      <section className="home__card">
        <div className="home__info">
          <FaBoxOpen className="home__icon" />
          <p><strong>123</strong> Productos</p>
        </div>
        <div className="home__actions">
          <Link to="/products">
            <button className="btn btn--outline">Ver Listado</button>
          </Link>
          <Link to="/products/new">
            <button className="btn btn--outline">Agregar Producto</button>
          </Link>
        </div>
      </section>

      <section className="home__card">
        <div className="home__info">
          <FaTags className="home__icon" />
          <p><strong>10</strong> Categorias</p>
        </div>
        <div className="home__actions">
          <Link to="/categorias">
            <button className="btn btn--outline">Ver Listado</button>
          </Link>
          <Link to="/categories/new">
            <button className="btn btn--outline">Agregar Categorias</button>
          </Link>
        </div>
      </section>
    </div>
)}

export default Home;