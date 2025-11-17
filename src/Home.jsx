function Home() {
  const handleLogout = () => {
    // Recargar la página para volver al login
    window.location.reload()
  }

  return (
    <div className="home-container">
      <div className="home-card">
        <div className="home-header">
          <div className="logo">
            💰
          </div>
          <h1>Bienvenido a FinanceControl</h1>
          <p>Panel de control de gastos</p>
        </div>
        
        <div className="dashboard">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Balance Total</h3>
              <p className="amount">$2,500.00</p>
            </div>
            <div className="stat-card">
              <h3>Gastos del Mes</h3>
              <p className="amount expense">$750.00</p>
            </div>
            <div className="stat-card">
              <h3>Ingresos</h3>
              <p className="amount income">$3,250.00</p>
            </div>
          </div>

          <div className="recent-transactions">
            <h3>Transacciones Recientes</h3>
            <div className="transaction-list">
              <div className="transaction-item">
                <span>Comida</span>
                <span className="expense">-$45.00</span>
              </div>
              <div className="transaction-item">
                <span>Salario</span>
                <span className="income">+$1,500.00</span>
              </div>
              <div className="transaction-item">
                <span>Transporte</span>
                <span className="expense">-$25.00</span>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="action-btn primary">Agregar Gasto</button>
            <button className="action-btn secondary">Agregar Ingreso</button>
            <button onClick={handleLogout} className="action-btn logout">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home