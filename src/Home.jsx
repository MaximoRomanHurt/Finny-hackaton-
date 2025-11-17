import { useEffect, useState } from 'react'
import { getSummary } from './api'

function Home() {
  const [summary, setSummary] = useState({
    balance: 2500.0,
    expense: 750.0,
    income: 3250.0,
    transactions: [
      { id: 1, category: 'Comida', amount: -45 },
      { id: 2, category: 'Salario', amount: 1500 },
      { id: 3, category: 'Transporte', amount: -25 },
    ],
  })

  useEffect(() => {
    let mounted = true
    getSummary()
      .then((data) => {
        if (mounted) setSummary(data)
      })
      .catch((err) => {
        // Si falla, mantenemos los datos por defecto (offline)
        console.warn('Could not load summary', err)
      })
    return () => {
      mounted = false
    }
  }, [])

  const handleLogout = () => {
    // Recargar la página para volver al login
    window.location.reload()
  }

  return (
    <div className="home-container">
      <div className="home-card">
        <div className="home-header">
          <div className="logo">💰</div>
          <h1>Bienvenido a FinanceControl</h1>
          <p>Panel de control de gastos</p>
        </div>

        <div className="dashboard">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Balance Total</h3>
              <p className="amount">${summary.balance.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>Gastos del Mes</h3>
              <p className="amount expense">${summary.expense.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>Ingresos</h3>
              <p className="amount income">${summary.income.toFixed(2)}</p>
            </div>
          </div>

          <div className="recent-transactions">
            <h3>Transacciones Recientes</h3>
            <div className="transaction-list">
              {summary.transactions.map((t) => (
                <div className="transaction-item" key={t.id}>
                  <span>{t.category}</span>
                  <span className={t.amount < 0 ? 'expense' : 'income'}>
                    {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}
                  </span>
                </div>
              ))}
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