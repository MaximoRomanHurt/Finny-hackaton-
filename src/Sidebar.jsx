import React, { useState, useEffect } from 'react';
import './App.css';
import { getDashboardData, getTransactions, addExpense, removeExpense } from './api';
import logo from './logo.png';
import Sidebar from './Sidebar';

function Home({ setIsLoggedIn }) {
  const [transactions, setTransactions] = useState([]);
  const [dashboard, setDashboard] = useState({ balanceTotal: 0, gastosMes: 0, ingresos: 0 });
  const [showForm, setShowForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({ fecha: '', categoria: '', monto: '', tipo: 'gasto' });

  useEffect(() => {
    setTransactions(getTransactions());
    setDashboard(getDashboardData());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTransaction.fecha || !newTransaction.categoria || !newTransaction.monto) return;

    addExpense({
      fecha: newTransaction.fecha,
      categoria: newTransaction.categoria,
      monto: Number(newTransaction.monto),
      tipo: newTransaction.tipo
    });

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
            <img src={logo} alt="Finny Logo" style={{ width: 120, height: 'auto' }} />
            <h1>Bienvenido a Finny</h1>
            <p>Panel de control de gastos</p>
          </div>

          {/* ... resto de tu contenido (cards, transacciones, formulario) ... */}

          <div className="actions">
            <button className="action-btn primary" onClick={() => setShowForm(true)}>Agregar Gasto</button>
            <button className="action-btn logout" onClick={handleLogout}>Cerrar Sesión</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
