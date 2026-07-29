import "./Header.scss";
import { useHeaderConfig } from "../../context/HeaderContext";
import { Link } from "react-router-dom";
import { FaBars, FaArrowLeft } from "react-icons/fa";

function Header({titulo, mostrarBuscador = true, mostrarBotonNuevo = false, backLink = null, mostrarBotonNuevaCategoria = false}) {
    const { menuAbierto, setMenuAbierto, searchQuery, setSearchQuery } = useHeaderConfig();
    return(
        <header className="header">

            <button className="menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)}>
                <FaBars/>
            </button>

            {backLink ? (
                <Link to={backLink} className="header-title-link">
                <FaArrowLeft className="header-back-icon" />
                <h1>{titulo}</h1>
                </Link>
            ) : (
            <h1>{titulo}</h1>
)}

            <div className="header-actions">
               {mostrarBuscador && (
                <form className="form-buscador">
                    <input type="search" placeholder="⌕" className="buscador" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                </form>
            
                )}
                {mostrarBotonNuevo && (
                    <Link to="/products/new">
                        <button className="boton-nuevo">✚</button>
                    </Link>
                    
                )}
                {mostrarBotonNuevaCategoria && (
                <Link to={"/categories/new"}>
                    <button className="boton-nuevo">✚</button>
                </Link>
    )}
             
            </div>
        </header>
    )
}
export default Header;