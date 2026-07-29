import { useEffect } from "react";
import { useHeaderConfig } from "../context/HeaderContext";

export default function useHeader({titulo, mostrarBuscador = true, mostrarBotonNuevo = false, backLink = null, mostrarBotonNuevaCategoria}){
    const {setHeaderConfig} = useHeaderConfig();

    useEffect(() =>{
        setHeaderConfig({titulo, mostrarBuscador, mostrarBotonNuevo, backLink, mostrarBotonNuevaCategoria});
    }, [titulo, mostrarBuscador, mostrarBotonNuevo, backLink, mostrarBotonNuevaCategoria, setHeaderConfig])
}