import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import EconomicTip from './components/EconomicTip';
import { getDashboardData, getTransactions, addExpense, removeExpense } from './api';
import logo from './logo.png';

const currencySymbols = {
  'USD': '$',
  'EUR': '€',
  'MXN': '$',
  'ARS': '$',
  'COP': '$',
  'PEN': 'S/.'
};

function Home({ setIsLoggedIn, currency = 'USD', theme, language }) {
  const [transactions, setTransactions] = useState([]);
  const [dashboard, setDashboard] = useState({ balanceTotal: 0, gastosMes: 0, ingresos: 0 });
  const [showForm, setShowForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({ fecha: '', categoria: '', monto: '', tipo: 'gasto' });
  const [hoverDeleteId, setHoverDeleteId] = useState(null);

  // Cargar datos una sola vez al montar el componente
  useEffect(() => {
    setTransactions(getTransactions());
    setDashboard(getDashboardData());
  }, []);

  const handleAddTransaction = useCallback((e) => {
    e.preventDefault();
    
    // Validaciones
    if (!newTransaction.fecha.trim()) {
      alert('Debes seleccionar una fecha');
      return;
    }
    if (!newTransaction.categoria.trim()) {
      alert('Debes ingresar una categoría');
      return;
    }
    const amount = Number(newTransaction.monto);
    if (!amount || amount <= 0) {
      alert('El monto debe ser mayor a 0');
      return;
    }
    if (amount > 10000) {
      alert('El monto no puede exceder 10,000');
      return;
    }

    try {
      addExpense({
        fecha: newTransaction.fecha,
        categoria: newTransaction.categoria,
        monto: amount,
        tipo: newTransaction.tipo,
      });
    } catch (err) {
      // Mostrar mensaje de error retornado por la 'API' en memoria
      alert(err.message || 'Error al guardar la transacción');
      return;
    }

    // Actualizar estado de una vez
    setTransactions(getTransactions());
    setDashboard(getDashboardData());
    setNewTransaction({ fecha: '', categoria: '', monto: '', tipo: 'gasto' });
    setShowForm(false);
  }, [newTransaction]);

  const handleDeleteTransaction = useCallback((id) => {
    removeExpense(id);
    setTransactions(getTransactions());
    setDashboard(getDashboardData());
  }, []);

  return (
    <div className="home-container">
      <Sidebar setIsLoggedIn={setIsLoggedIn} />

      <div className="home-content">
        <div className="home-card">
          <div className="home-header">
            <img src={logo} alt="Finny Logo" style={{ width: "120px", height: "auto" }} />
            <h1>Bienvenido a Finny</h1>
            <p>Panel de control de gastos</p>
          </div>

          <div className="dashboard">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Balance Total</h3>
                <p className="amount">{currencySymbols[currency]} {dashboard.balanceTotal.toFixed(2)}</p>
              </div>
              <div className="stat-card">
                <h3>Gastos del Mes</h3>
                <p className="amount expense">{currencySymbols[currency]} {dashboard.gastosMes.toFixed(2)}</p>
              </div>
              <div className="stat-card">
                <h3>Ingresos</h3>
                <p className="amount income">{currencySymbols[currency]} {dashboard.ingresos.toFixed(2)}</p>
              </div>
            </div>

            <div className="recent-transactions">
              <h3>Transacciones Recientes</h3>
              <div className="transaction-list">
                {transactions.slice(0, 5).map(t => (
                  <div key={t.id} className="transaction-item">
                    <span>{t.categoria} ({t.fecha})</span>
                    <span className={t.tipo}>
                      {t.tipo === 'gasto' ? `-${currencySymbols[currency]} ${t.monto.toFixed(2)}` : `+${currencySymbols[currency]} ${t.monto.toFixed(2)}`}
                    </span>

                    <span
                      className="delete-btn"
                      onClick={() => handleDeleteTransaction(t.id)}
                      onMouseEnter={() => setHoverDeleteId(t.id)}
                      onMouseLeave={() => setHoverDeleteId(null)}
                      style={{ color: hoverDeleteId === t.id ? 'red' : 'gray' }}
                    >
                      🗑️
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="actions">
              <button className="action-btn primary" onClick={() => setShowForm(true)}>Agregar Gasto</button>
            </div>

            {showForm && (
              <form onSubmit={handleAddTransaction} className="form-container">
                <label>Fecha</label>
                <input
                  type="date"
                  value={newTransaction.fecha}
                  onChange={e => setNewTransaction({ ...newTransaction, fecha: e.target.value })}
                  required
                />
                <label>Categoría</label>
                <input
                  type="text"
                  placeholder="Ej: Comida, Transporte"
                  value={newTransaction.categoria}
                  onChange={e => setNewTransaction({ ...newTransaction, categoria: e.target.value })}
                  required
                />
                <label>Monto</label>
                <input
                  type="number"
                  placeholder="Ej: 50.00"
                  value={newTransaction.monto}
                  onChange={e => setNewTransaction({ ...newTransaction, monto: e.target.value })}
                  required
                  min="0.01"
                  step="0.01"
                  max="10000"
                />
                <label>Tipo</label>
                <select value={newTransaction.tipo} onChange={e => setNewTransaction({ ...newTransaction, tipo: e.target.value })}>
                  <option value="gasto">Gasto</option>
                  <option value="ingreso">Ingreso</option>
                </select>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" className="action-btn primary" style={{ flex: 1 }}>Guardar</button>
                  <button type="button" className="action-btn" style={{ flex: 1, background: '#94a3b8' }} onClick={() => { setShowForm(false); setNewTransaction({ fecha: '', categoria: '', monto: '', tipo: 'gasto' }); }}>Cancelar</button>
                </div>
              </form>
            )}
          </div>

          <EconomicTip />
        </div>
      </div>
    </div>
  );
}

export default Home;
