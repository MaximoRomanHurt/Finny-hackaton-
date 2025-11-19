import React, { useEffect, useState } from 'react';
import '../pages/Login.css';
import '../App.css';
import Sidebar from '../Sidebar';
import { getTransactions } from '../api.js';

export default function Transactions({ setIsLoggedIn }) {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar transacciones al iniciar
  useEffect(() => {
    setLoading(true);
    const data = getTransactions();
    setTransactions(data);
    setFilteredTransactions(data);
    setLoading(false);
  }, []);

  // Filtrar por fecha
  const handleFilter = () => {
    let filtered = transactions;

    if (from) {
      filtered = filtered.filter(t => t.fecha >= from);
    }
    if (to) {
      filtered = filtered.filter(t => t.fecha <= to);
    }

    setFilteredTransactions(filtered);
  };

  // Limpiar filtros
  const handleClear = () => {
    setFrom('');
    setTo('');
    setFilteredTransactions(transactions);
  };

  // Calcular totales
  const computeTotals = (list) => {
    let ingresos = 0;
    let egresos = 0;

    for (const t of list) {
      if (t.tipo === 'ingreso') {
        ingresos += t.monto;
      } else if (t.tipo === 'gasto') {
        egresos += t.monto;
      }
    }

    const restante = ingresos - egresos;
    return { ingresos, egresos, restante };
  };

  const { ingresos, egresos, restante } = computeTotals(filteredTransactions);

  return (
    <div className="home-container">
      <Sidebar setIsLoggedIn={setIsLoggedIn} />
      
      <div className="home-content">
        <div className="home-card">
          <h2>Historial de Transacciones</h2>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              Desde:
              <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              Hasta:
              <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            </label>

            <button onClick={handleFilter} className="action-btn primary" disabled={loading}>
              Buscar
            </button>
            <button onClick={handleClear} className="action-btn secondary">
              Limpiar
            </button>
          </div>

          {loading && <div style={{ marginTop: 12 }}>Cargando...</div>}

          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 15 }}>
            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, textAlign: 'center' }}>
              <strong style={{ color: '#64748b', fontSize: 12 }}>Ingresos</strong>
              <p style={{ color: '#04CFAD', fontSize: 20, margin: '8px 0 0 0' }}>S/. {ingresos.toFixed(2)}</p>
            </div>
            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, textAlign: 'center' }}>
              <strong style={{ color: '#64748b', fontSize: 12 }}>Egresos</strong>
              <p style={{ color: '#ef4444', fontSize: 20, margin: '8px 0 0 0' }}>S/. {egresos.toFixed(2)}</p>
            </div>
            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, textAlign: 'center' }}>
              <strong style={{ color: '#64748b', fontSize: 12 }}>Restante</strong>
              <p style={{ color: '#1e293b', fontSize: 20, margin: '8px 0 0 0' }}>S/. {restante.toFixed(2)}</p>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <h3>Transacciones ({filteredTransactions.length})</h3>
            <div className="transaction-list">
              {filteredTransactions.map(t => (
                <div key={t.id} className="transaction-item">
                  <div>
                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{t.categoria}</span>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{t.fecha}</div>
                  </div>
                  <span className={t.tipo}>
                    {t.tipo === 'gasto' ? `-S/. ${t.monto.toFixed(2)}` : `+S/. ${t.monto.toFixed(2)}`}
                  </span>
                </div>
              ))}
            </div>
            {filteredTransactions.length === 0 && (
              <div style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>
                No hay transacciones
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
            <th style={{ textAlign: 'left', padding: 8 }}>Fecha</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Descripción</th>
            <th style={{ textAlign: 'right', padding: 8 }}>Monto</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && !loading ? (
            <tr><td colSpan="3" style={{ padding: 12 }}>No hay transacciones para las fechas seleccionadas.</td></tr>
          ) : items.map((t, i) => (
            <tr key={t.id ?? i} style={{ borderTop: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>{t.date ? new Date(t.date).toLocaleDateString() : '-'}</td>
              <td style={{ padding: 8 }}>{t.description ?? t.concept ?? '-'}</td>
              <td style={{ padding: 8, textAlign: 'right', color: (Number(t.amount ?? t.monto) < 0) ? 'crimson' : 'green' }}>
                {(Number(t.amount ?? t.monto) || 0).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
