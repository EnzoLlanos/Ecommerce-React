import React, { useEffect, useState } from 'react';
import './ProductsList.css';

function ProductsList() {
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
    console.log(data.data)
  }

  useEffect(() => {
    getProducts();
  }, []);
  

  return (
    <div className="products-list">
      <h1>Products List</h1>
      {products.map((p) => (
        <div>

          <p>{p.nombre}</p>
          <p>${p.precio}</p>
          <p></p>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
