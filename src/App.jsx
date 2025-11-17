import { useState } from 'react'
import Home from './Home'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulación de login exitoso
    if (email && password) {
      setIsLoggedIn(true)
    }
  }

  // Si está logueado, mostrar la página Home
  if (isLoggedIn) {
    return <Home />
  }

  // Si no está logueado, mostrar el login
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <img src="/logo.jpge" alt="Finny Logo" />
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
          <p>¿No tienes cuenta? <a href="#">Regístrate</a></p>
        </div>
      </div>
    </div>
  )
}

export default App