import React, { useEffect, useState } from 'react';
import '../App.css';
import Sidebar from '../Sidebar';
import EconomicTip from '../components/EconomicTip';
import { getTransactions, getDashboardData } from '../api.js';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#ef4444', '#04CFAD', '#fbbf24', '#8b5cf6', '#06b6d4', '#10b981'];

export default function Reports({ setIsLoggedIn }) {
  const [transactions, setTransactions] = useState([]);
  const [dashboard, setDashboard] = useState({ balanceTotal: 0, gastosMes: 0, ingresos: 0 });
  const [categoryData, setCategoryData] = useState([]);

  // Cargar datos al iniciar
  useEffect(() => {
    const data = getTransactions();
    setTransactions(data);
    setDashboard(getDashboardData());

    // Agrupar gastos por categoría para el gráfico
    const categoryTotals = {};
    data.forEach(t => {
      if (t.tipo === 'gasto') {
        categoryTotals[t.categoria] = (categoryTotals[t.categoria] || 0) + t.monto;
      }
    });

    const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2))
    }));

    setCategoryData(chartData);
  }, []);

  // Agrupar ingresos y egresos por categoría
  const incomeByCategory = {};
  const expenseByCategory = {};

  transactions.forEach(t => {
    if (t.tipo === 'ingreso') {
      incomeByCategory[t.categoria] = (incomeByCategory[t.categoria] || 0) + t.monto;
    } else if (t.tipo === 'gasto') {
      expenseByCategory[t.categoria] = (expenseByCategory[t.categoria] || 0) + t.monto;
    }
  });

  // Convertir a arrays para la tabla
  const allCategories = new Set([...Object.keys(incomeByCategory), ...Object.keys(expenseByCategory)]);
  const tableData = Array.from(allCategories).map(cat => ({
    categoria: cat,
    ingresos: incomeByCategory[cat] || 0,
    egresos: expenseByCategory[cat] || 0,
  }));

  return (
    <div className="home-container">
      <Sidebar setIsLoggedIn={setIsLoggedIn} />

      <div className="home-content">
        <div className="home-card">
          <h2>Reportes y Estadísticas</h2>

          {/* Resumen */}
          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 15 }}>
            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, textAlign: 'center' }}>
              <strong style={{ color: '#64748b', fontSize: 12 }}>Balance Total</strong>
              <p style={{ color: '#1e293b', fontSize: 20, margin: '8px 0 0 0' }}>S/. {dashboard.balanceTotal.toFixed(2)}</p>
            </div>
            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, textAlign: 'center' }}>
              <strong style={{ color: '#64748b', fontSize: 12 }}>Ingresos</strong>
              <p style={{ color: '#04CFAD', fontSize: 20, margin: '8px 0 0 0' }}>S/. {dashboard.ingresos.toFixed(2)}</p>
            </div>
            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, textAlign: 'center' }}>
              <strong style={{ color: '#64748b', fontSize: 12 }}>Egresos</strong>
              <p style={{ color: '#ef4444', fontSize: 20, margin: '8px 0 0 0' }}>S/. {dashboard.gastosMes.toFixed(2)}</p>
            </div>
          </div>

          {/* Gráfico de pastel */}
          <div style={{ marginTop: 30 }}>
            <h3>Distribución de Gastos por Categoría</h3>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: S/. ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `S/. ${value.toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>
                No hay datos de gastos
              </div>
            )}
          </div>

          {/* Tabla de Ingresos y Egresos */}
          <div style={{ marginTop: 30 }}>
            <h3>Desglose por Categoría</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: 12, textAlign: 'left', fontWeight: 600, color: '#1e293b' }}>Categoría</th>
                    <th style={{ padding: 12, textAlign: 'right', fontWeight: 600, color: '#04CFAD' }}>Ingresos</th>
                    <th style={{ padding: 12, textAlign: 'right', fontWeight: 600, color: '#ef4444' }}>Egresos</th>
                    <th style={{ padding: 12, textAlign: 'right', fontWeight: 600, color: '#1e293b' }}>Neto</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: 12, color: '#1e293b', fontWeight: 500 }}>{row.categoria}</td>
                      <td style={{ padding: 12, textAlign: 'right', color: '#04CFAD' }}>S/. {row.ingresos.toFixed(2)}</td>
                      <td style={{ padding: 12, textAlign: 'right', color: '#ef4444' }}>S/. {row.egresos.toFixed(2)}</td>
                      <td style={{ padding: 12, textAlign: 'right', color: '#1e293b', fontWeight: 600 }}>
                        S/. {(row.ingresos - row.egresos).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: '#f8fafc', fontWeight: 700, borderTop: '2px solid #e2e8f0' }}>
                    <td style={{ padding: 12, color: '#1e293b' }}>TOTAL</td>
                    <td style={{ padding: 12, textAlign: 'right', color: '#04CFAD' }}>
                      S/. {Object.values(incomeByCategory).reduce((a, b) => a + b, 0).toFixed(2)}
                    </td>
                    <td style={{ padding: 12, textAlign: 'right', color: '#ef4444' }}>
                      S/. {Object.values(expenseByCategory).reduce((a, b) => a + b, 0).toFixed(2)}
                    </td>
                    <td style={{ padding: 12, textAlign: 'right', color: '#1e293b' }}>
                      S/. {dashboard.balanceTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <EconomicTip />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
