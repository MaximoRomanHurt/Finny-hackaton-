import React from 'react';
import Sidebar from '../Sidebar';
import '../pages/Settings.css';

export default function Settings({ setIsLoggedIn, currency, setCurrency, theme, setTheme, language, setLanguage }) {
  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify({
      currency,
      theme,
      language
    }));
    alert('Configuración guardada exitosamente');
  };

  const translations = {
    es: {
      title: '⚙️ Configuración',
      currency: 'Moneda',
      theme: 'Tema',
      language: 'Idioma',
      dark: 'Oscuro',
      light: 'Claro',
      spanish: 'Español',
      english: 'English',
      portuguese: 'Português',
      save: '💾 Guardar Cambios',
      info: 'Información de la Aplicación',
      version: 'Versión',
      developed: 'Desarrollado con',
      selectedCurrency: 'Moneda Seleccionada',
      selectedTheme: 'Tema',
      updated: 'Último actualizado'
    },
    en: {
      title: '⚙️ Settings',
      currency: 'Currency',
      theme: 'Theme',
      language: 'Language',
      dark: 'Dark',
      light: 'Light',
      spanish: 'Español',
      english: 'English',
      portuguese: 'Português',
      save: '💾 Save Changes',
      info: 'Application Information',
      version: 'Version',
      developed: 'Developed with',
      selectedCurrency: 'Selected Currency',
      selectedTheme: 'Theme',
      updated: 'Last updated'
    },
    pt: {
      title: '⚙️ Configurações',
      currency: 'Moeda',
      theme: 'Tema',
      language: 'Idioma',
      dark: 'Escuro',
      light: 'Claro',
      spanish: 'Español',
      english: 'English',
      portuguese: 'Português',
      save: '💾 Salvar Alterações',
      info: 'Informações do Aplicativo',
      version: 'Versão',
      developed: 'Desenvolvido com',
      selectedCurrency: 'Moeda Selecionada',
      selectedTheme: 'Tema',
      updated: 'Última atualização'
    }
  };

  const t = translations[language] || translations.es;

  return (
    <div className="settings-container">
      <Sidebar setIsLoggedIn={setIsLoggedIn} />
      
      <div className="settings-content">
        <div className="settings-card">
          <h1>{t.title}</h1>
          
          <div className="settings-grid">
            <div className="setting-card">
              <label htmlFor="currency">{t.currency}</label>
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
              <label htmlFor="theme">{t.theme}</label>
              <select 
                id="theme"
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="dark">{t.dark}</option>
                <option value="light">{t.light}</option>
              </select>
            </div>

            <div className="setting-card">
              <label htmlFor="language">{t.language}</label>
              <select 
                id="language"
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="es">{t.spanish}</option>
                <option value="en">{t.english}</option>
                <option value="pt">{t.portuguese}</option>
              </select>
            </div>
          </div>

          <div className="settings-actions">
            <button className="save-btn" onClick={handleSave}>{t.save}</button>
          </div>

          <div className="info-section">
            <h3>{t.info}</h3>
            <p><strong>{t.version}:</strong> 1.0.0</p>
            <p><strong>{t.developed}:</strong> React + Vite</p>
            <p><strong>{t.selectedCurrency}:</strong> {currency}</p>
            <p><strong>{t.selectedTheme}:</strong> {theme === 'dark' ? t.dark : t.light}</p>
            <p><strong>{t.updated}:</strong> {new Date().toLocaleDateString(language === 'es' ? 'es-ES' : language === 'en' ? 'en-US' : 'pt-BR')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
