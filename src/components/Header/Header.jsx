import "./Header.scss";

function Header({titulo, mostrarBuscador = true, mostrarBotonNuevo = false}) {
    return(
        <header className="header">
            
            <h1>{titulo}</h1>

            {mostrarBuscador && (
                <form className="form-buscador">
                    <input type="search" placeholder="Buscar..." className="buscador"/>
                </form>
            
            )}
            {mostrarBotonNuevo && (
                <button className="boton-nuevo">Agregar Producto</button>
            )}
            
        </header>
    )
}
export default Header;