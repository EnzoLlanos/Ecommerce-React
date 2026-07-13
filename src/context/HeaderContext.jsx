import { createContext, useState, useContext } from "react";

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const [headerConfig, setHeaderConfig] = useState({
    titulo: "",
    mostrarBuscador: true,
    mostrarBotonNuevo: false,
  })
  return(
    <HeaderContext.Provider value={{headerConfig, setHeaderConfig}}>
        {children}
    </HeaderContext.Provider>
  );
}
export function useHeaderConfig() {
  return useContext(HeaderContext);
}