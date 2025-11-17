import React, { useState, useEffect } from 'react';
import './App.css';
import { getDashboardData, getTransactions, addExpense, removeExpense } from './api';
import logo from './logo.png';
import Sidebar from './Sidebar';

function Home({ setIsLoggedIn }) {
  const [transactions, setTransactions] = useState([]);
  const [dashboard, setDashboard] = useState({ balanceTotal: 0, gastosMes: 0, ingresos: 0 });
  const [showForm, setShowForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    fecha: '',
    categoria: '',
    monto: '',
    tipo: 'gasto'
  });

  useEffect(() => {
    setTransactions(getTransactions());
    setDashboard(getDashboardData());
  }, []);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTransaction.fecha || !newTransaction.categoria || !newTransaction.monto) return;

    const expenseToAdd = {
      fecha: newTransaction.fecha,
      categoria: newTransaction.categoria,
      monto: Number(newTransaction.monto),
      tipo: newTransaction.tipo
    };

    addExpense(expenseToAdd);
    setTransactions(getTransactions());
    setDashboard(getDashboardData());
    setNewTransaction({ fecha: '', categoria: '', monto: '', tipo: 'gasto' });
    setShowForm(false);
  };

  const handleDeleteTransaction = (id) => {
    removeExpense(id);
    setTransactions(getTransactions());
    setDashboard(getDashboardData());
  };

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
                <p className="amount">S/. {dashboard.balanceTotal.toFixed(2)}</p>
              </div>
              <div className="stat-card">
                <h3>Gastos del Mes</h3>
                <p className="amount expense">S/. {dashboard.gastosMes.toFixed(2)}</p>
              </div>
              <div className="stat-card">
                <h3>Ingresos</h3>
                <p className="amount income">S/. {dashboard.ingresos.toFixed(2)}</p>
              </div>
            </div>

            <div className="recent-transactions">
              <h3>Transacciones Recientes</h3>
              <div className="transaction-list">
                {transactions.map(t => (
                  <div key={t.id} className="transaction-item">
                    <span>{t.categoria} ({t.fecha})</span>
                    <span className={t.tipo}>
                      {t.tipo === 'gasto' ? `-S/. ${t.monto}` : `+S/. ${t.monto}`}
                    </span>
                    <span
                      style={{ cursor: 'pointer', color: 'gray', marginLeft: '10px' }}
                      onClick={() => handleDeleteTransaction(t.id)}
                      onMouseEnter={e => e.target.style.color = 'red'}
                      onMouseLeave={e => e.target.style.color = 'gray'}
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
              <form
                onSubmit={handleAddTransaction}
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <input
                  type="date"
                  value={newTransaction.fecha}
                  onChange={e => setNewTransaction({ ...newTransaction, fecha: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Categoría"
                  value={newTransaction.categoria}
                  onChange={e => setNewTransaction({ ...newTransaction, categoria: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Monto"
                  value={newTransaction.monto}
                  onChange={e => setNewTransaction({ ...newTransaction, monto: e.target.value })}
                  required
                />
                <select
                  value={newTransaction.tipo}
                  onChange={e => setNewTransaction({ ...newTransaction, tipo: e.target.value })}
                >
                  <option value="gasto">Gasto</option>
                  <option value="ingreso">Ingreso</option>
                </select>

                <button type="submit" className="action-btn primary">Aceptar</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
