import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar({ setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className={`menu-toggle ${isOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
        ☰
      </button>
      
      {isOpen && <div className="sidebar-overlay" onClick={closeMenu}></div>}
      
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeMenu}>✕</button>
        <ul>
          <li><a href="#/" onClick={closeMenu}>Dashboard</a></li>
          <li><Link to="/transacciones" onClick={closeMenu}>Transacciones</Link></li>
          <li><a href="#/reportes" onClick={closeMenu}>Reportes</a></li>
          <li><a href="#/configuracion" onClick={closeMenu}>Configuración</a></li>
          <li><button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button></li>
        </ul>
      </nav>
    </>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/transactions">Transacciones</Link></li>
        <!-- Añade más enlaces según tu app -->
      </ul>
    </aside>
  );
}
