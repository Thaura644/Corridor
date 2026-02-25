"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Download } from "lucide-react";

const data = [
  { name: "Mon", inflow: 4000, outflow: 2400 },
  { name: "Tue", inflow: 3000, outflow: 1398 },
  { name: "Wed", inflow: 2000, outflow: 9800 },
  { name: "Thu", inflow: 2780, outflow: 3908 },
  { name: "Fri", inflow: 1890, outflow: 4800 },
  { name: "Sat", inflow: 2390, outflow: 3800 },
  { name: "Sun", inflow: 3490, outflow: 4300 },
];

export default function CashflowGraph() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-subtle border border-border h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-bold text-slate-900">Cashflow Analytics</h3>
          <p className="text-xs text-slate-500">Inflows vs Outflows across corridors</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-background-soft p-1 rounded-lg border border-border">
            <button className="px-3 py-1 text-[10px] font-bold text-slate-900 bg-white rounded shadow-sm">7D</button>
            <button className="px-3 py-1 text-[10px] font-bold text-slate-500">30D</button>
            <button className="px-3 py-1 text-[10px] font-bold text-slate-500">90D</button>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-xs font-bold text-slate-700 hover:bg-background-soft transition-colors">
            <Download size={14} />
            CSV
          </button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#12B76A" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#12B76A" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D92D20" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#D92D20" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#94A3B8", fontWeight: 600 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#94A3B8", fontWeight: 600 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                fontSize: "12px",
                fontWeight: "bold"
              }}
            />
            <Area
              type="monotone"
              dataKey="inflow"
              stroke="#12B76A"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorInflow)"
            />
            <Area
              type="monotone"
              dataKey="outflow"
              stroke="#D92D20"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorOutflow)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex justify-center gap-8 border-t border-border pt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-success rounded-full" />
          <span className="text-xs font-bold text-slate-600">Total Inflows</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-danger rounded-full" />
          <span className="text-xs font-bold text-slate-600">Total Outflows</span>
        </div>
      </div>
    </div>
  );
}
