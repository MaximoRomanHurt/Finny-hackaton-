// api.js — Simulación de backend en memoria

// Datos iniciales de demostración
let transactions = [
  { id: 1, fecha: "2025-11-01", categoria: "Salario", tipo: "ingreso", monto: 2000.00 },
  { id: 2, fecha: "2025-11-02", categoria: "Comida", tipo: "gasto", monto: 45.50 },
  { id: 3, fecha: "2025-11-05", categoria: "Transporte", tipo: "gasto", monto: 30.00 },
  { id: 4, fecha: "2025-11-08", categoria: "Servicios", tipo: "gasto", monto: 120.00 },
  { id: 5, fecha: "2025-11-10", categoria: "Compras", tipo: "gasto", monto: 200.00 },
  { id: 6, fecha: "2025-11-15", categoria: "Freelance", tipo: "ingreso", monto: 500.00 },
];

// Calcular totales desde transacciones
let dashboardData = {
  balanceTotal: 0,
  gastosMes: 0,
  ingresos: 0,
};

// Actualizar dashboard con datos reales
transactions.forEach(tx => {
  if (tx.tipo === "ingreso") {
    dashboardData.ingresos += tx.monto;
  } else {
    dashboardData.gastosMes += tx.monto;
  }
});
dashboardData.balanceTotal = dashboardData.ingresos - dashboardData.gastosMes;

// Gastos diarios agrupados por fecha para calendario
let dailyExpenses = {};
transactions.forEach(tx => {
  if (!dailyExpenses[tx.fecha]) dailyExpenses[tx.fecha] = [];
  dailyExpenses[tx.fecha].push(tx);
});

// ----------------- FUNCIONES API SIMULADAS -----------------

// Obtener datos del dashboard
export function getDashboardData() {
  return { ...dashboardData };
}

// Obtener todas las transacciones
export function getTransactions() {
  return [...transactions];
}

// Obtener gastos de un día específico
export function getDailyExpenses(date) {
  return dailyExpenses[date] ? [...dailyExpenses[date]] : [];
}

// Agregar un nuevo gasto o ingreso
export function addExpense(expense) {
  const newId = transactions.length ? transactions[transactions.length - 1].id + 1 : 1;
  const newExpense = { id: newId, ...expense };

  transactions.push(newExpense);

  // Actualizar dailyExpenses
  if (!dailyExpenses[expense.fecha]) dailyExpenses[expense.fecha] = [];
  dailyExpenses[expense.fecha].push(newExpense);

  // Actualizar dashboard
  if (expense.tipo === "gasto") {
    dashboardData.gastosMes += expense.monto;
    dashboardData.balanceTotal -= expense.monto;
  } else if (expense.tipo === "ingreso") {
    dashboardData.ingresos += expense.monto;
    dashboardData.balanceTotal += expense.monto;
  }

  return newExpense;
}

// Eliminar un gasto o ingreso
export function removeExpense(id) {
  const index = transactions.findIndex(tx => tx.id === id);
  if (index === -1) return false;

  const expense = transactions[index];
  transactions.splice(index, 1);

  // Actualizar dailyExpenses
  const dayList = dailyExpenses[expense.fecha];
  if (dayList) {
    dailyExpenses[expense.fecha] = dayList.filter(e => e.id !== id);
    if (dailyExpenses[expense.fecha].length === 0) delete dailyExpenses[expense.fecha];
  }

  // Actualizar dashboard
  if (expense.tipo === "gasto") {
    dashboardData.gastosMes -= expense.monto;
    dashboardData.balanceTotal += expense.monto;
  } else if (expense.tipo === "ingreso") {
    dashboardData.ingresos -= expense.monto;
    dashboardData.balanceTotal -= expense.monto;
  }

  return true;
}