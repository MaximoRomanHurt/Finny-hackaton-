import { useState } from 'react';
import './App.css';
import logo from './logo.png';

// ---------------- LOGIN COMPONENT ----------------
function Login({ onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí puedes agregar validación con localStorage si quieres simular login
    if (email && password) {
      alert(`Bienvenido ${email}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <img src={logo} alt="Finny Logo" style={{ width: "120px", height: "auto" }} />
          </div>
          <h1>Finny</h1>
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

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>

        <div className="login-footer">
          <p>¿No tienes cuenta?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------- REGISTER COMPONENT ----------------
function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Datos de registro:', formData);
    alert('Registro exitoso! Ahora puedes iniciar sesión.');
    onSwitchToLogin(); // Vuelve al login
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <img src={logo} alt="Finny Logo" style={{ width: "120px", height: "auto" }} />
          </div>
          <h1>Crear Cuenta</h1>
          <p>Únete a FinanceControl</p>
        </div>

        <form onSubmit={handleRegister} className="login-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre completo"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar contraseña"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Crear Cuenta
          </button>
        </form>

        <div className="login-footer">
          <p>¿Ya tienes cuenta?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>
              Iniciar Sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------- MAIN APP ----------------
function App() {
  const [page, setPage] = useState("login"); // "login" o "register"

  return (
    <>
      {page === "login" && <Login onSwitchToRegister={() => setPage("register")} />}
      {page === "register" && <Register onSwitchToLogin={() => setPage("login")} />}
    </>
  );
}

export default App;
