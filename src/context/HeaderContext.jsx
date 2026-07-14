import { createContext, useState, useContext } from "react";

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const [headerConfig, setHeaderConfig] = useState({
    titulo: "",
    mostrarBuscador: true,
    mostrarBotonNuevo: false,
  })

  const [menuAbierto, setMenuAbierto] = useState(false);

  return(
    <HeaderContext.Provider value={{headerConfig, setHeaderConfig, menuAbierto, setMenuAbierto}}>
        {children}
    </HeaderContext.Provider>
  );
}
export function useHeaderConfig() {
  return useContext(HeaderContext);
}