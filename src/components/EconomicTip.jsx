import React, { useState, useEffect } from 'react';
import './EconomicTip.css';

const tips = [
  "💡 Presupuesto 50/30/20: 50% necesidades, 30% deseos, 20% ahorros.",
  "💡 Come en el comedor UNMSM o lleva viandas para ahorrar.",
  "💡 Usa transporte universitario o bonos escolares.",
  "💡 Abre una cuenta de ahorro con tasas competitivas.",
  "💡 Busca trabajos part-time o freelance en línea.",
  "💡 Evita deudas de tarjeta de crédito a corto plazo.",
  "💡 Participa en becas de investigación de la UNMSM.",
  "💡 Comparte gastos de vivienda con compañeros.",
  "💡 Aprovecha promociones estudiantiles en libros y software.",
  "💡 Invierte en tu educación para mejores ingresos futuros."
];

export default function EconomicTip() {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setTipIndex(randomIndex);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="economic-tip">
      <p>{tips[tipIndex]}</p>
    </div>
  );
}
