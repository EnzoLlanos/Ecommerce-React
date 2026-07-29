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
      <div className="product-form">
        <h2>Información</h2>
        <label>
          Imagen
          {imgLink && (
            <img src={imgLink} className="product-form__img-preview"/>
          )}
          {edit ? (
            <input type="text" placeholder='Pegar el link de la imagen' value={imgLink} onChange={(e) => {setImgLink(e.target.value)}}/>
          ) : (
            <span className="product-form__value">{imgLink}</span>
          )}
        </label>

        <label>
          Nombre
          {edit ? (
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
          ) : (
            <span className="product-form__value">{nombre}</span>
          )}
        </label>

        <label>
          Precio
          {edit ? (
            <input type="number" step="0.01" min="0" value={precio} onChange={(e) => setPrecio(e.target.value)}/>
          ) : (
            <span className="product-form__value">${precio}</span>
          )}
        </label>

        <label>
          Stock
          {edit ? (
            <input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)}/>
          ) : (
            <span className="product-form__value">{stock}</span>
          )}
        </label>

        <label>
          Descripcion
          {edit ? (
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
          ) : (
            <span className="product-form__value">{descripcion}</span>
          )}
        </label>

        <label>
          Categoria
          {edit ? (
            <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)}/>
          ) : (
            <span className="product-form__value">{categoria}</span>
          )}
        </label>

        {edit && (
          <button className="button button--primary" type="button" onClick={() => editProduct()}>Guardar</button>
        )}
      </div>
    </main>
  )
}

export default ProductView;