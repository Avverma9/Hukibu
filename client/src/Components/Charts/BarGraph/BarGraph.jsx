import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'A', boys: 100, girls: 50 },
  { name: 'B', boys: 200, girls: 120 },
  { name: 'C', boys: 300, girls: 180 },
  { name: 'D', boys: 400, girls: 240 },
];

const BarGraph = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Analysis</h2>

      <div style={{ display: 'flex', flexDirection:'column' }}>
        <BarChart width={400} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="boys" fill="#FF5F5F" />
          <Bar dataKey="girls" fill="#49B3FF" />
        </BarChart>

        {/* //2// */}
        <BarChart width={400} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="boys" fill="#FF5F5F" />
          <Bar dataKey="girls" fill="#49B3FF" />
        </BarChart>
      </div>
    </div>
  );
};

export default BarGraph;