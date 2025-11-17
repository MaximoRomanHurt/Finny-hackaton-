import React from 'react';
import './Sidebar.css'; // Aquí pondrás los estilos del sidebar

function Sidebar({ setIsLoggedIn }) {
  const handleLogout = () => {
    // Eliminar la sesión del localStorage
    localStorage.removeItem('isLoggedIn');
    
    // Actualizar el estado en el componente principal para redirigir al login o cambiar el estado
    setIsLoggedIn(false);

    // Si quieres redirigir a la página de inicio de sesión después del logout
    // (por ejemplo usando react-router)
    // window.location.href = '/login'; // O usa el hook de history si estás utilizando react-router
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <ul className="menu">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Estadísticas</a></li>
        <li><a href="#">Calendario</a></li>
        <li><a href="#">Ayuda</a></li>
        <li><a href="#">Configuración</a></li>
        <li>
          <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
