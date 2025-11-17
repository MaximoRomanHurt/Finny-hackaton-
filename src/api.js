// api.js — Simulación de backend en memoria

// Datos iniciales de demostración
let dashboardData = {
  balanceTotal: 2500.00,
  gastosMes: 750.00,
  ingresos: 3250.00,
};

let transactions = [
  { id: 1, fecha: "2025-11-17", categoria: "Comida", tipo: "gasto", monto: 45.00 },
  { id: 2, fecha: "2025-11-01", categoria: "Salario", tipo: "ingreso", monto: 1500.00 },
  { id: 3, fecha: "2025-11-15", categoria: "Transporte", tipo: "gasto", monto: 25.00 },
];

// Gastos diarios agrupados por fecha para calendario
let dailyExpenses = {
  "2025-11-01": [{ id: 2, categoria: "Salario", tipo: "ingreso", monto: 1500.00 }],
  "2025-11-15": [{ id: 3, categoria: "Transporte", tipo: "gasto", monto: 25.00 }],
  "2025-11-17": [{ id: 1, categoria: "Comida", tipo: "gasto", monto: 45.00 }],
};

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