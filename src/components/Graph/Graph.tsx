'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// components

// store

// constants and functions

export const Graph = ({ productData }: any) => {
  return (
    <div className="mt-4 flex h-[50vh] w-auto items-center justify-center rounded-xl bg-slate-50 shadow-lg">
      <ResponsiveContainer>
        <LineChart
          data={productData}
          margin={{
            top: 20,
            right: 40,
            left: 5,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide />
          <YAxis tickCount={10} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 10 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
