"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Download, TrendingUp, Clock, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const volumeData = [
  { name: "Jan", volume: 4000 },
  { name: "Feb", volume: 3000 },
  { name: "Mar", volume: 5000 },
  { name: "Apr", volume: 4500 },
  { name: "May", volume: 6000 },
  { name: "Jun", volume: 7500 },
];

const currencyData = [
  { name: "KES", value: 45, color: "#0E4D3A" },
  { name: "UGX", value: 35, color: "#0B1F33" },
  { name: "USD", value: 20, color: "#C9A227" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Treasury Analytics</h1>
          <p className="text-slate-500 mt-1">Enterprise-grade liquidity and FX exposure insights</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
          <Download size={16} />
          Download Treasury Report (PDF)
        </button>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Settlement Lag", value: "1.2s", change: "-0.4s", icon: Clock, color: "text-success" },
          { label: "Netting Efficiency", value: "94.2%", change: "+2.1%", icon: Zap, color: "text-success" },
          { label: "FX Exposure", value: "$12,402", change: "+$420", icon: Activity, color: "text-warning" },
          { label: "Monthly Volume", value: "$1.4M", change: "+12%", icon: TrendingUp, color: "text-success" },
        ].map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-border shadow-subtle">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-background-soft rounded-lg">
                <metric.icon size={20} className="text-slate-400" />
              </div>
              <span className={`text-xs font-bold ${metric.color}`}>{metric.change}</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{metric.label}</p>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-1">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volume Trend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-border shadow-subtle">
          <h3 className="font-bold text-slate-900 mb-6">Monthly Volume Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94A3B8" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94A3B8" }} />
                <Tooltip cursor={{ fill: "#F8FAFC" }} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} />
                <Bar dataKey="volume" fill="#0E4D3A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Currency Distribution */}
        <div className="bg-white p-6 rounded-lg border border-border shadow-subtle">
          <h3 className="font-bold text-slate-900 mb-6">Currency Distribution</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currencyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {currencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {currencyData.map((c, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-xs font-bold text-slate-600">{c.name}</span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-900">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FX Exposure Heatmap (Simplified) */}
      <div className="bg-white p-6 rounded-lg border border-border shadow-subtle">
        <h3 className="font-bold text-slate-900 mb-6">FX Exposure Heatmap</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {["KES/UGX", "USD/KES", "USD/UGX", "UGX/KES", "KES/USD", "UGX/USD"].map((pair, i) => (
            <div key={i} className="p-4 rounded-lg border border-border bg-background-soft text-center space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase">{pair}</p>
              <div className={cn(
                "w-full h-2 rounded-full",
                i === 0 ? "bg-success" : i === 2 ? "bg-warning" : i === 5 ? "bg-danger" : "bg-slate-200"
              )} />
              <p className="text-xs font-bold text-slate-700">{i === 0 ? "Low" : i === 2 ? "Moderate" : i === 5 ? "High" : "Stable"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
