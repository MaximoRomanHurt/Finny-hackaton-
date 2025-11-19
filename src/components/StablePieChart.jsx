import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function renderLabel({ name, percent }) {
  try {
    return `${name}: ${Math.round(percent * 100)}%`;
  } catch (e) {
    return name;
  }
}

function StablePieChart({ data, colors = [], height = 300 }) {
  return (
    <div style={{ width: '100%', height, minHeight: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            label={renderLabel}
            labelLine={false}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(StablePieChart, (prev, next) => prev.data === next.data && prev.colors === next.colors && prev.height === next.height);
