import React, { useEffect, useState } from 'react';
import './ProductView.css';
import { useParams, Link } from 'react-router-dom';
import useHeader from '../../../hooks/useHeader';
import { FaArrowLeft } from 'react-icons/fa';

function ProductView() {
  
  const [product,setProduct] = useState({})
  const [edit,setEdit] = useState(false)

  const [nombre,setNombre] = useState("")
  const [descripcion,setDescripcion] = useState("")
  const [precio,setPrecio] = useState("")
  const [stock,setStock] = useState("")
  const [categoria,setCategoria] = useState("")
  const [imgLink,setImgLink] = useState("")

  const [botonEdit,setBotonEdit] = useState("Editar")

  const { id } = useParams();
  useHeader({ titulo: `Producto / #${id}` });
  const getProduct = async()=> {

    const resp = await fetch(`http://localhost:3000/api/productos/${id}`,{
      method : "GET",
      headers: {
      "Content-Type": "application/json",
      }
    })
    
    const data = await resp.json()
    setProduct(data.data)

    setNombre(data.data.nombre)
    setPrecio(data.data.precio)
    setStock(data.data.stock)
    setDescripcion(data.data.descripcion)
    setImgLink(data.data.img)
    setCategoria(data.data.categoria)
    

  }

  const editProduct = async() => {
    const resp = await fetch(`http://localhost:3000/api/productos/Edit/${id}`,{
      method : "PUT",
      headers : {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        nombre,
        precio,
        descripcion,
        stock,
        categoria,
        img: imgLink
      })
    })

    const data = await resp.json();

    console.log(data);
    console.log(data.mensaje);
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <main className="product-view">
      <div className="product-view__toolbar">
        <Link to="/products" className="product-view__back">
          <FaArrowLeft />
        </Link>
        <button className="button button--primary" onClick={() => {setEdit(!edit) ; setBotonEdit("Cancelar")}}>{edit ? "Cancelar" : "Editar"}</button>
      </div>
      {edit ? (
        <form className="product-form" onSubmit={(e) => {
          e.preventDefault()
          editProduct()
        }}>
          <h2>Información</h2>
          <label>
            Cambiar Imagen
            {imgLink && (
              <img src={imgLink} className="product-form__img-preview"/>
            )}
            <input type="text" placeholder='Pegar el link de la imagen' value={imgLink} onChange={(e) => {setImgLink(e.target.value)}}/>
          </label>

          <label>
            Nombre
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
          </label>

          <label>
            Precio
            <input type="number" step="0.01" min="0" value={precio} onChange={(e) => setPrecio(e.target.value)}/>
          </label>

          <label>
            Stock
            <input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)}/>
          </label>

          <label>
            Descripcion
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
          </label>

          <label>
            Categoria
            <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)}/>
          </label>

          <button className="button button--primary" type='submit'>Guardar</button>
        </form>
      ) : (
        <div className="product-summary">
          <img src={product.img} />
          <div>
            <h2>{product.nombre}</h2>
            <div className="product-summary__stats">
              <b>{product.precio}</b>
              <small>PRECIO</small>
              <b>{product.stock}</b>
              <small>STOCK<br />DISPONIBLE</small>
              <span>{product.categoria}</span>
            </div>
            <p>{product.descripcion}</p>
          </div>
        </div>
      )}
    </main>
  )
}

export default ProductView;