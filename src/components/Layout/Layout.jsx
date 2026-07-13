import { useState, useRef, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Header from "../Header/Header";
import { useHeaderConfig } from "../../context/HeaderContext";

function Layout({ children }) {
  const {headerConfig} = useHeaderConfig();
  const [menuAbierto, setMenuAbierto] = useState(true);
  const navRef = useRef(null);

  useEffect(() => {
    const click = (e) =>{
        if(navRef.current && !navRef.current.contains(e.target) && menuAbierto){
            setMenuAbierto(false)
        }
    }
  

  document.addEventListener("mousedown", click)
    return () => document.removeEventListener("mousedown", click)
  }, [menuAbierto])

  return (
    <div className="app-layout">
        <div ref={navRef}>
            <NavBar menuAbierto={menuAbierto} setMenuAbierto={setMenuAbierto}/>
        </div>
      <main className="app-content">
        <Header {...headerConfig}/>
        {children}
      </main>
    </div>
  );
}

export default Layout;