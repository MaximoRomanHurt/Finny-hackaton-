import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import '../pages/Settings.css';

export default function Settings({ setIsLoggedIn }) {
  const [settings, setSettings] = useState({
    currency: 'USD',
    theme: 'dark',
    notifications: true,
    language: 'es'
  });

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('Configuración guardada exitosamente');
  };

  return (
    <div className="settings-container">
      <Sidebar setIsLoggedIn={setIsLoggedIn} />
      
      <div className="settings-content">
        <h1>⚙️ Configuración</h1>
        
        <div className="settings-grid">
          <div className="setting-card">
            <label htmlFor="currency">Moneda</label>
            <select 
              id="currency"
              value={settings.currency} 
              onChange={(e) => handleChange('currency', e.target.value)}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="MXN">MXN ($)</option>
              <option value="ARS">ARS ($)</option>
              <option value="COP">COP ($)</option>
            </select>
          </div>

          <div className="setting-card">
            <label htmlFor="theme">Tema</label>
            <select 
              id="theme"
              value={settings.theme} 
              onChange={(e) => handleChange('theme', e.target.value)}
            >
              <option value="dark">Oscuro</option>
              <option value="light">Claro</option>
              <option value="auto">Automático</option>
            </select>
          </div>

          <div className="setting-card">
            <label htmlFor="language">Idioma</label>
            <select 
              id="language"
              value={settings.language} 
              onChange={(e) => handleChange('language', e.target.value)}
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
                checked={settings.notifications} 
                onChange={(e) => handleChange('notifications', e.target.checked)}
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
          <p><strong>Último actualizado:</strong> {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
}
