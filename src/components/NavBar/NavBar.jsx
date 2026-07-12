import { NavLink } from "react-router-dom"
import "./NavBarStyle.css"

function NavBar({menuAbierto, setMenuAbierto}) {
  return(
    <>
    <aside className={`NavBar ${menuAbierto ? "open" : "closed"}`}>
        <ul>
          <li><NavLink end to="/">Home</NavLink></li>
          <li><NavLink to="/products">Products</NavLink></li>
          <li><NavLink to="/profile">profile</NavLink></li>
        </ul>
    </aside>
    <button className="menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)} >
      {menuAbierto ? "✕" : "☰"}
    </button>
    </>
  )
}

export default NavBar