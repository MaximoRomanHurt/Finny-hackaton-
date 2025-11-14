import { useState } from 'react'
import './App.css'

function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }
    // Aquí iría la lógica de registro
    console.log('Datos de registro:', formData)
    alert('Registro exitoso! Ahora puedes iniciar sesión.')
    // Volver al login
    onSwitchToLogin()
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            💰
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
          <p>¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Iniciar Sesión</a></p>
        </div>
      </div>
    </div>
  )
}

export default Register