import { useState } from "react";
import NavBar from "../NavBar/NavBar";

function Layout({ children }) {
  const [menuAbierto, setMenuAbierto] = useState(true);

  return (
    <div className="app-layout">
      <NavBar
        menuAbierto={menuAbierto}
        setMenuAbierto={setMenuAbierto}
      />

      <main className="app-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;