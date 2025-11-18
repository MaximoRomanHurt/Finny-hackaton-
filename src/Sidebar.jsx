import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#/">Dashboard</a></li>
          <li><a href="#/transacciones">Transacciones</a></li>
          <li><a href="#/reportes">Reportes</a></li>
          <li><a href="#/configuracion">Configuración</a></li>
          <li><button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button></li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
