import { Link } from "react-router-dom"
import { useState } from "react"
import "./NavBarStyle.css"

function NavBar(){
  const [menu,setMenu] = useState(false)
  return(

    <div className={`NavBar ${menu ? "open" : "closed"}`}>
      <button onClick={()=> setMenu (!menu)}>
        {menu ? "✕" : "☰"}
      </button>
      {menu && (

        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/profile">profile</Link></li>
        </ul>
      )}
    </div>
  )
}

export default NavBar