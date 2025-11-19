import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './Home';
import './App.css';
import Transactions from './pages/Transactions.jsx';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings.jsx';

// ---------------- APP PRINCIPAL ----------------
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('es');

  // Al iniciar, leer login del localStorage
  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    if (storedLogin === 'true') setIsLoggedIn(true);

    // Cargar preferencias guardadas
    const savedCurrency = localStorage.getItem('userCurrency');
    if (savedCurrency) setCurrency(savedCurrency);

    const savedTheme = localStorage.getItem('userTheme');
    if (savedTheme) setTheme(savedTheme);

    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  // Guardar moneda cuando cambia
  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem('userCurrency', newCurrency);
  };

  // Guardar tema cuando cambia
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('userTheme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Guardar idioma cuando cambia
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('userLanguage', newLanguage);
  };

  // Aplicar tema al montar
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} currency={currency} theme={theme} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} currency={currency} theme={theme} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/transactions" element={isLoggedIn ? <Transactions setIsLoggedIn={setIsLoggedIn} currency={currency} theme={theme} language={language} /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/reportes" element={isLoggedIn ? <Reports setIsLoggedIn={setIsLoggedIn} currency={currency} theme={theme} language={language} /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/configuracion" element={isLoggedIn ? <Settings setIsLoggedIn={setIsLoggedIn} currency={currency} setCurrency={handleCurrencyChange} theme={theme} setTheme={handleThemeChange} language={language} setLanguage={handleLanguageChange} /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;