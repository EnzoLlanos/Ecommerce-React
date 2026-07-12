import { useState, useRef, useEffect } from "react";
import NavBar from "../NavBar/NavBar";

function Layout({ children }) {
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
        {children}
      </main>
    </div>
  );
}

export default Layout;