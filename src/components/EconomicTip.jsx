import React, { useState, useEffect } from 'react';
import './EconomicTip.css';

const tips = [
  "💡 Crea un presupuesto mensual y respeta el 50/30/20: 50% necesidades, 30% deseos, 20% ahorros.",
  "💡 Come en la cafetería de la UNMSM o lleva viandas de casa para ahorrar en comida.",
  "💡 Utiliza el transporte universitario o bonos escolares para reducir gastos de movilidad.",
  "💡 Abre una cuenta de ahorro en un banco que ofrezca tasas competitivas para estudiantes.",
  "💡 Busca trabajos part-time o freelance en línea para generar ingresos adicionales.",
  "💡 Evita deudas de tarjeta de crédito a corto plazo; solicita solo lo que puedas pagar.",
  "💡 Participa en proyectos universitarios pagados o becas de investigación de la UNMSM.",
  "💡 Comparte gastos de vivienda con compañeros para reducir el costo de alquiler.",
  "💡 Aprovecha las promociones estudiantiles en libros, materiales y software académico.",
  "💡 Invierte en tu educación ahora para garantizar mejores ingresos en el futuro."
];

export default function EconomicTip() {
  const [tip, setTip] = useState('');

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  return (
    <div className="economic-tip">
      <div className="tip-header">
        <h3>📚 Consejo Económico para Estudiantes UNMSM</h3>
      </div>
      <div className="tip-content">
        <p>{tip}</p>
      </div>
    </div>
  );
}
