import React, { useState } from "react";
import "./Sidebar.css";
import logo from "./logo.png";

function Sidebar({ setIsLoggedIn }) {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* Botón hamburguesa (solo móvil) */}
      <button
        className={`hamburger ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="logo">
          <img src={logo} alt="Finny Logo" />
        </div>

        <ul className="menu">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Estadísticas</a></li>
          <li><a href="#">Calendario</a></li>
          <li><a href="#">Ayuda</a></li>
          <li><a href="#">Configuración</a></li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
