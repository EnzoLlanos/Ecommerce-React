import React, { useEffect, useState } from 'react';
import './ProductView.css';
import { useParams } from 'react-router-dom';

function ProductView() {
  const [product,setProduct] = useState({})
  const [edit,setEdit] = useState(false)

  const [nombre,setNombre] = useState("")
  const [descripcion,setDescripcion] = useState("")
  const [precio,setPrecio] = useState("")
  const [stock,setStock] = useState("")
  const [categoria,setCategoria] = useState("")
  const [imgLink,setImgLink] = useState("")

  const [newImg,setNewImg] = useState("")
  const [imgError,setImgError] = useState(false)

  const { id } = useParams();

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


  useEffect(() => {
    getProduct()
  }, [])

  return (
    <>
      <button onClick={() => setEdit(!edit)}>Editar</button>
      {edit ? (
        <div>
          <form action="">

            <div>
              <label htmlFor="">Imgagen Actual</label>
              <img src={imgLink} style={{width:"150px"}}/>
              <label>Nueva Imgagen</label>
              <input type="text" placeholder='Pegar el link de la imagen' value={newImg} style={{width:"150px"}} onChange={(e) => {setNewImg(e.target.value) ; setImgError(false)}}/>
              <br />
              {newImg && (
                <img src={newImg} style={{width:"150px"}} onError={() => setImgError(true)}/>
              )}
            </div>
            <br />

            <label>Nombre</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            <br />

            <label>Precio</label>
            <input type="text" value={precio} onChange={(e) => setPrecio(e.target.value)}/>
            <br />

            <label>Stock</label>
            <input type="text" value={stock} onChange={(e) => setStock(e.target.value)}/>
            <br />

            <label>Descripcion</label>
            <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
            <br />

            <label>Categoria</label>
            <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)}/>
          </form>
        </div>
      ) : (
        <div>

          <img src={product.img} alt="" />
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
