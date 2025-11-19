import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import '../pages/Settings.css';

export default function Settings({ setIsLoggedIn, currency, setCurrency, theme, setTheme }) {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('es');

  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify({
      currency,
      theme,
      notifications,
      language
    }));
    alert('Configuración guardada exitosamente');
  };

  return (
    <div className="settings-container">
      <Sidebar setIsLoggedIn={setIsLoggedIn} />
      
      <div className="settings-content">
        <div className="settings-card">
          <h1>⚙️ Configuración</h1>
          
          <div className="settings-grid">
            <div className="setting-card">
              <label htmlFor="currency">Moneda</label>
              <select 
                id="currency"
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="MXN">MXN ($)</option>
                <option value="ARS">ARS ($)</option>
                <option value="COP">COP ($)</option>
                <option value="PEN">PEN (S/.)</option>
              </select>
            </div>

            <div className="setting-card">
              <label htmlFor="theme">Tema</label>
              <select 
                id="theme"
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="dark">Oscuro</option>
                <option value="light">Claro</option>
              </select>
            </div>

            <div className="setting-card">
              <label htmlFor="language">Idioma</label>
              <select 
                id="language"
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>

            <div className="setting-card checkbox">
              <label htmlFor="notifications">
                <input 
                  id="notifications"
                  type="checkbox" 
                  checked={notifications} 
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                Habilitar notificaciones
              </label>
            </div>
          </div>

          <div className="settings-actions">
            <button className="save-btn" onClick={handleSave}>💾 Guardar Cambios</button>
          </div>

          <div className="info-section">
            <h3>Información de la Aplicación</h3>
            <p><strong>Versión:</strong> 1.0.0</p>
            <p><strong>Desarrollado con:</strong> React + Vite</p>
            <p><strong>Moneda Seleccionada:</strong> {currency}</p>
            <p><strong>Tema:</strong> {theme === 'dark' ? 'Oscuro' : 'Claro'}</p>
            <p><strong>Último actualizado:</strong> {new Date().toLocaleDateString('es-ES')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
