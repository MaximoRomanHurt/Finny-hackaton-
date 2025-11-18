import React, { useEffect, useState } from 'react';
import '../pages/Login.css';
import '../App.css';
import { getTransactions as apiGetTransactions } from '../api.js'; // si no existe, la página hará fetch directo

export default function Transactions() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchTransactions({ from, to } = {}) {
    // intenta usar helper api.js si existe, si no hace fetch directo
    try {
      if (typeof apiGetTransactions === 'function') {
        return await apiGetTransactions({ from, to });
      }
    } catch (err) {
      // continúa a fetch directo si el helper falla
    }

    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const url = (params.toString() ? `/transactions?${params.toString()}` : '/transactions');

    const res = await fetch(url, { credentials: 'include' });
    if (!res.ok) throw new Error('Error fetching transactions');
    return res.json();
  }

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTransactions({ from: from || undefined, to: to || undefined });
      // aceptar tanto { transactions: [...] } como un array directo
      const list = Array.isArray(data) ? data : data?.transactions ?? [];
      setItems(list);
    } catch (err) {
      setError(err.message || 'Error cargando transacciones');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  function computeTotals(list) {
    let ingresos = 0;
    let egresos = 0;
    for (const t of list) {
      const amount = Number(t.amount ?? t.monto ?? 0);
      if (amount >= 0) ingresos += amount;
      else egresos += amount;
    }
    const totalGasto = Math.abs(egresos);
    const restante = ingresos + egresos;
    return { ingresos, egresos: Math.abs(egresos), totalGasto, restante };
  }

  const { ingresos, egresos, totalGasto, restante } = computeTotals(items);

  return (
    <div className="page-container" style={{ padding: 20 }}>
      <h2>Historial de transacciones</h2>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
        <label>
          Desde:
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </label>

        <label>
          Hasta:
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </label>

        <button onClick={load} disabled={loading}>Buscar</button>
        <button onClick={() => { setFrom(''); setTo(''); load(); }}>Limpiar</button>
      </div>

      {loading && <div style={{ marginTop: 12 }}>Cargando...</div>}
      {error && <div style={{ marginTop: 12, color: 'crimson' }}>{error}</div>}

      <div style={{ marginTop: 16 }}>
        <strong>Ingresos:</strong> {ingresos.toFixed(2)} &nbsp;
        <strong>Egresos:</strong> {egresos.toFixed(2)} &nbsp;
        <strong>Total gasto:</strong> {totalGasto.toFixed(2)} &nbsp;
        <strong>Restante:</strong> {restante.toFixed(2)}
      </div>

      <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
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
