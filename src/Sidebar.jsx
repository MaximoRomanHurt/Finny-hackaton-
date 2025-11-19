import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

export default function Sidebar({ setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    if (typeof setIsLoggedIn === 'function') setIsLoggedIn(false);
  };

  const toggleMenu = () => setIsOpen((s) => !s);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button className={`menu-toggle ${isOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
        ☰
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={closeMenu} />}

      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeMenu}>✕</button>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Dashboard</Link></li>
          <li><Link to="/transactions" onClick={closeMenu}>Transacciones</Link></li>
          <li><Link to="/reportes" onClick={closeMenu}>Reportes</Link></li>
          <li><Link to="/configuracion" onClick={closeMenu}>Configuración</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button></li>
        </ul>
      </nav>
    </>
  );
}
