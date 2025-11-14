import { useState } from 'react'
import Home from './Home'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulación de login exitoso
    if (username && password) {
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
          <h1>Intranet Alumno</h1>
          <p>Sistema Único de Matrícula</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="maximo roman"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="······"
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}

export default App