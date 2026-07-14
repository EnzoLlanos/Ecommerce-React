import { useEffect } from "react";
import { useHeaderConfig } from "../context/HeaderContext";

export default function useHeader({titulo, mostrarBuscador = true, mostrarBotonNuevo = false}){
    const {setHeaderConfig} = useHeaderConfig();

    useEffect(() =>{
        setHeaderConfig({titulo, mostrarBuscador, mostrarBotonNuevo });
    }, [titulo, mostrarBuscador, mostrarBotonNuevo, setHeaderConfig])
}