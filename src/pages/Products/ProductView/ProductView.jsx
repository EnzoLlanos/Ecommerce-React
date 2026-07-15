import React, { useEffect, useState } from 'react';
import './ProductView.css';
import { useParams } from 'react-router-dom';
import useHeader from '../../../hooks/useHeader';
import { Link } from 'react-router-dom';
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
    <>
    <Link to="/products">
      <FaArrowLeft />
    </Link>
      <button onClick={() => {setEdit(!edit) ; setBotonEdit("Cancelar")}}>{edit ? "Cancelar" : "Editar"}</button>
      {edit ? (
        <div>
          <form onSubmit={(e) => {
            editProduct()
          }}>

            <div>
              <label>Cambiar Imagen</label>
              {imgLink && (
                <img src={imgLink} style={{width:"150px"}}/>
              )}
              <input type="text" placeholder='Pegar el link de la imagen' value={imgLink} style={{width:"150px"}} onChange={(e) => {setImgLink(e.target.value)}}/>
              <br />
            </div>
            <br />

            <label>Nombre</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            <br />

            <label>Precio</label>
            <input type="number" step="0.01" min="0" value={precio} onChange={(e) => setPrecio(e.target.value)}/>
            <br />

            <label>Stock</label>
            <input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)}/>
            <br />

            <label>Descripcion</label>
            <textarea type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
            <br />

            <label>Categoria</label>
            <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)}/>

            <br />
            <button type='submit'>Guardar</button>
          </form>
        </div>
      ) : (
        <div>

          <img src={product.img} style={{width:"150px"}} />
          <p>{product.nombre}</p>
          <p>{product.precio}</p>
          <p>{product.descripcion}</p>
          <p>{product.categoria}</p>

        </div>
      )}
    </>
  )
}

export default ProductView;