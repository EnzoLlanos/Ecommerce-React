import { NavLink } from "react-router-dom"
import "./NavBarStyle.css"
import {FaHome, FaBoxOpen, FaUser, FaTags} from "react-icons/fa"
import { useHeaderConfig } from "../../context/HeaderContext"

function NavBar() {
  const { setMenuAbierto } = useHeaderConfig();

  const handleClick = () => setMenuAbierto(false);

  return(
    <nav className="NavBar">
      <div className="NavBar-header">
        <span className="NavBar-logo">Mi Ecommerce</span>
      </div>

      <ul onClick={handleClick}>
        <li>
          <NavLink end to="/">
            <FaHome className="icon"/>
            <span className="text">Inicio</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/products">
            <FaBoxOpen className="icon"/>
            <span className="text">Productos</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/categorias">
            <FaTags className="icon"/>
            <span className="text">Categorías</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile">
            <FaUser className="icon"/>
            <span className="text">Perfil</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar