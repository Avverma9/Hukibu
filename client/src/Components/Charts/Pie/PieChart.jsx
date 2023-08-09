import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const PieChartComp = ({ data, innerRadius, outerRadius, colors }) => {
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="students"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Legend
        verticalAlign="top"
        align="right"
        layout="vertical"
        iconType="square"
        iconSize={10}
        formatter={(value, entry) => {
          const color = entry.color;
          return <span style={{ color }}>{value}</span>;
        }}
      />
    </PieChart>
  );
};

export default PieChartComp;