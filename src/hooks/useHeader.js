import { useEffect } from "react";
import { useHeaderConfig } from "../context/HeaderContext";

export default function useHeader({titulo, mostrarBuscador = true, mostrarBotonNuevo = false, backLink = null}){
    const {setHeaderConfig} = useHeaderConfig();

    useEffect(() =>{
        setHeaderConfig({titulo, mostrarBuscador, mostrarBotonNuevo, backLink});
    }, [titulo, mostrarBuscador, mostrarBotonNuevo, backLink, setHeaderConfig])
}