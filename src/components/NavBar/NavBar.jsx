import { NavLink } from "react-router-dom"
import "./NavBarStyle.css"
import {FaHome, FaBoxOpen, FaUser} from "react-icons/fa"

function NavBar({menuAbierto, setMenuAbierto}) {
  return(
    
    <aside className={`NavBar ${menuAbierto ? "open" : "closed"}`}>
      <div className="NavBar-header">
        <span className="NavBar-logo">Mi Ecommerce</span>
        <button className="menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)} >
        {menuAbierto ? "✕" : "☰"}
      </button>
      </div>

      
        <ul>
          <li>
            <NavLink end to="/">
              <FaHome className="icon"/>
              <span className="text">Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/products">
              <FaBoxOpen className="icon"/>
              <span className="text">Products</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile">
              <FaUser className="icon"/>
              <span className="text">profile</span>
            </NavLink>
          </li>
        </ul>
    </aside>
  
  )
}

export default NavBar