import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import './ProductsList.css';
import useHeader from '../../../hooks/useHeader';

function ProductsList() {
  useHeader({ titulo: "Lista de Productos", mostrarBuscador: true, mostrarBotonNuevo: true });
  const [products, setProducts] = useState([])
  const getProducts = async() => {
    const resp = await fetch("http://localhost:3000/api/productos/",{
      method : "GET",
      headers: {
      "Content-Type": "application/json",
      }
    })
    const data = await resp.json();
    setProducts(data.data);
  }

  useEffect(() => {
    getProducts();
  }, []);
  

  return (
    <div className="products-list">
      <h1>Products List</h1>

      <table>

        <thead>
          <tr>
            <th>IMG</th>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {products.map((p) => (
            <tr key={p.id}>
              <td><img src={p.img} style={{ width: "60px", height: "60px", objectFit: "cover" }} alt="" /></td>
              <td>{p.nombre}</td>
              <td>{p.stock}</td>
              <td>${p.precio}</td>
              <td><NavLink to={`/products/${p.id}`}>Ver mas</NavLink></td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;