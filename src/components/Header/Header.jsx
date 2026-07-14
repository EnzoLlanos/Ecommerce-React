import "./Header.scss";
import { useHeaderConfig } from "../../context/HeaderContext";
import { FaBars } from "react-icons/fa";

function Header({titulo, mostrarBuscador = true, mostrarBotonNuevo = false}) {
    const { menuAbierto, setMenuAbierto } = useHeaderConfig();
    return(
        <header className="header">

            <button className="menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)}>
                <FaBars/>
            </button>

            <h1>{titulo}</h1>

            <div className="header-actions">
               {mostrarBuscador && (
                <form className="form-buscador">
                    <input type="search" placeholder="🔍" className="buscador"/>
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