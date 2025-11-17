import React from "react";
import { Home, BarChart2, Calendar, HelpCircle, Settings, LogOut } from "lucide-react";
import logo from "./logo.png";
import "./Sidebar.css"; // Puedes seguir usando tu propio archivo CSS

function Sidebar({ setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <aside className="sidebar shadow-lg">
      <div className="sidebar-header">
        <img src={logo} alt="Finny Logo" className="sidebar-logo" />
      </div>

      <nav className="sidebar-menu">
        <a href="#" className="menu-item">
          <Home size={20} />
          <span>Inicio</span>
        </a>

        <a href="#" className="menu-item">
          <BarChart2 size={20} />
          <span>Estadísticas</span>
        </a>

        <a href="#" className="menu-item">
          <Calendar size={20} />
          <span>Calendario</span>
        </a>

        <a href="#" className="menu-item">
          <HelpCircle size={20} />
          <span>Ayuda</span>
        </a>

        <a href="#" className="menu-item">
          <Settings size={20} />
          <span>Configuración</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
