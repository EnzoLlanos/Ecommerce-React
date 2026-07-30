import { useState } from "react"
import '../ProductView/ProductView.css'
import { useParams, Link, useNavigate } from 'react-router-dom';

export function EditProduct({product,id,setEdit,setAlert}){
  const navigate = useNavigate();
  const [form,setForm] = useState({
    nombre: product.nombre,
    descripcion: product.descripcion,
    precio: product.precio,
    stock: product.stock,
    categoria: product.categoria,
    img: product.img
  })


  const editProduct = async() => {
  
    try {

      if(!validateForm()){
        setAlert({
          visible:true,
          type:"error",
          title:"Campos incompletos",
          message:"Todos los campos son obligatorios."
        })

        return;
      }

      const resp = await fetch(`http://localhost:3000/api/productos/Edit/${id}`,{
        method : "PUT",
        headers : {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(form)
      })
      
      setEdit(false)
      setAlert({visible:true,type:"success",title:"Producto guardado",message: "Los cambios se guardaron correctamente.",})

    } catch (error) {
      setAlert({visible: true,type: "error",title: "Error",message: "No se pudo guardar el producto.",})
    }
    
    
  }

  const changes = (e) => {
    setForm(prev => ({...prev,[e.target.name] : e.target.value}))
  }

  const validateForm = () => {
    return Object.values(form).every(value =>
      value.toString().trim() !== ""
    )
  }



    const eliminarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      const resp = await fetch(`http://localhost:3000/api/productos/${id}`, { method: "DELETE" });
      if (!resp.ok) throw new Error();
      navigate('/products');
    } catch (err) {
      alert("No se pudo eliminar el producto");
    }
  };
  

  return(
    <div>
      <form className="product-form" onSubmit={(e) => {
        e.preventDefault()
        editProduct()
      }}>
        <label>
          {form.img && (
            <img src={form.img} className="product-form__img-preview"/>
          )}
          <p>Url Imagen </p>
          <input type="text" placeholder='Pegar el link de la imagen' value={form.img} name="img" onChange={changes}/>
        </label>

        <label>
          Nombre
          <input type="text" value={form.nombre} name="nombre" onChange={changes}/>
        </label>

        <label>
          Precio
          <input type="number" step="0.01" min="0" value={form.precio} name="precio" onChange={changes}/>
        </label>

        <label>
          Stock
          <input type="number" min="0" value={form.stock} name="stock" onChange={changes}/>
        </label>

        <label>
          Descripcion
          <textarea value={form.descripcion} name="descripcion" onChange={changes}/>
        </label>

        <label>
          Categoria
          <input type="text" value={form.categoria} name="categoria" onChange={changes}/>
        </label>
        <button className="button button--primary" type='submit'>Guardar</button>

      </form>
        <button className="button button--danger" style={{ width: '100%' }} onClick={() => eliminarProducto(product.id)}>Eliminar</button>
    </div>
  )
}