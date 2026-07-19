import "./Header.scss";
import { useHeaderConfig } from "../../context/HeaderContext";
import { Link } from "react-router-dom";
import { FaBars, FaArrowLeft } from "react-icons/fa";

function Header({titulo, mostrarBuscador = true, mostrarBotonNuevo = false, backLink = null}) {
    const { menuAbierto, setMenuAbierto } = useHeaderConfig();
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
                    <input type="search" placeholder="⌕" className="buscador"/>
                </form>
            
                )}
                {mostrarBotonNuevo && (
                    <button className="boton-nuevo">✚</button>
                )}
             
            </div>
        </header>
    )
}
export default Header;