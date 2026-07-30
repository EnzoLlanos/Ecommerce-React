import React, { useEffect, useState } from 'react';
import './ProductView.css';
import { useParams, Link } from 'react-router-dom';
import useHeader from '../../../hooks/useHeader';
import { FaArrowLeft } from 'react-icons/fa';

import { EditProduct } from '../productsComponents/EditProduct';
import { Alert } from '../../../components/Alert/Alert';

function ProductView() {
  
  const [product,setProduct] = useState({})
  const [edit,setEdit] = useState(false)

  const [nombre,setNombre] = useState("")
  const [descripcion,setDescripcion] = useState("")
  const [precio,setPrecio] = useState("")
  const [stock,setStock] = useState("")
  const [categoria,setCategoria] = useState("")
  const [imgLink,setImgLink] = useState("")

  const [alert, setAelert] = useState({
    visible:false,
    type: "",
    title: "",
    message : ""
  })

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

     <Alert alert={alert} onClose={() => setAelert(prev => ({...prev, visible:false}))}/>

      <div className="product-form">
        <h2>Información</h2>

          {edit ? (
            
            <EditProduct product={product} id={id} setAlert={setAelert} setEdit={setEdit}></EditProduct>

          ) : (

            
            <div>
              <label>
                {product.img && (
                  <img src={product.img} className="product-form__img-preview"/>
                )}
                Url Imagen
                <span className="product-form__value">{product.img}</span>
              </label>

              <label>
                Nombre
                <span className="product-form__value">{product.nombre}</span>
              </label>
              <label>
                Precio
                <span className="product-form__value">${product.precio}</span>
              </label>

              <label>
                Stock
                <span className="product-form__value">{product.stock}</span>
              </label>

              <label>
                Descripcion
                <span className="product-form__value">{product.descripcion}</span>
              </label>

              <label>
                Categoria
                <span className="product-form__value">{product.categoria}</span>
              </label>
            </div>
          )}
      </div>
    </main>
  )
}

export default ProductView;