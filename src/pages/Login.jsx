import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import './Login.css';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      // Simula login con cualquier email y contraseña
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true'); // Guardar login en localStorage
      navigate("/home");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <img src={logo} alt="Finny Logo" style={{ width: "120px", height: "auto" }} />
          </div>
          <p>Controla tus gastos de forma inteligente</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>

          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
