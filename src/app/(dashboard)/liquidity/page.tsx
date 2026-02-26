"use client";

import React, { useState, useEffect } from "react";
import {
  History,
  AlertCircle,
  ArrowRightLeft,
  TrendingUp,
  ShieldCheck,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const poolAdjustments = [
  { time: "2023-11-24 10:24:02", pool: "EAST-P1", action: "Inbound Settlement", amount: "+2,400,000.00", operator: "System (Auto)", status: "Confirmed" },
  { time: "2023-11-24 10:21:45", pool: "WEST-P1", action: "Cross-Pool Drain", amount: "-18,500,000.00", operator: "J. Doe (Admin)", status: "Confirmed" },
  { time: "2023-11-24 10:18:30", pool: "SOUTH-P1", action: "Internal Rebalance", amount: "1,000,000.00", operator: "System (Auto)", status: "Processing" },
];

export default function LiquidityPage() {
  const [timeLeft, setTimeLeft] = useState(892); // seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hh = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mm = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const ss = (seconds % 60).toString().padStart(2, "0");
    return { hh, mm, ss };
  };

  const { hh, mm, ss } = formatTime(timeLeft);

  return (
    <div className="space-y-8">
      {/* Top Controls Row */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg border border-border shadow-subtle gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Pan-African Regional Pools</h1>
          <p className="text-slate-500 text-sm mt-1">Monitoring real-time liquidity across all African regional hubs.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-primary/5 rounded-lg border border-primary/10">
            <span className="text-xs font-bold text-slate-700">Auto-Netting Engine</span>
            <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
               <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
          <button className="px-6 py-2 bg-white border-2 border-primary/20 text-primary rounded-lg font-bold text-xs hover:bg-primary/5 transition-colors">
            Manual Override
          </button>
        </div>
      </div>

      {/* Balances and Countdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pool East Africa */}
        <div className="bg-white p-6 rounded-lg border border-border shadow-subtle group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">East Africa Hub (KES/UGX/TZS)</p>
              <p className="font-mono text-3xl font-bold text-slate-900 mt-2">142,500,000.00</p>
            </div>
            <span className="px-2 py-1 bg-success/10 text-success text-[10px] font-bold rounded">+2.4%</span>
          </div>
          <div className="mt-6 pt-4 border-t border-border flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-[10px] text-slate-400 font-bold uppercase">Updated 3s ago</span>
          </div>
        </div>

        {/* Pool West Africa */}
        <div className="bg-white p-6 rounded-lg border border-border shadow-subtle group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">West Africa Hub (NGN/GHS)</p>
              <p className="font-mono text-3xl font-bold text-slate-900 mt-2">5,200,800,000.00</p>
            </div>
            <span className="px-2 py-1 bg-danger/10 text-danger text-[10px] font-bold rounded">-1.1%</span>
          </div>
          <div className="mt-6 pt-4 border-t border-border flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-[10px] text-slate-400 font-bold uppercase">Updated 8s ago</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-primary p-6 rounded-lg shadow-lg shadow-primary/20 flex flex-col justify-between min-h-[180px]">
          <div className="flex justify-between items-center text-white/70">
            <p className="text-[10px] font-bold uppercase tracking-widest">Next Net Settlement</p>
            <History size={16} />
          </div>
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <p className="font-mono text-4xl font-bold text-white">{hh}</p>
              <p className="text-[10px] text-white/40 uppercase mt-1">HH</p>
            </div>
            <div className="text-white/30 text-3xl font-bold">:</div>
            <div className="text-center">
              <p className="font-mono text-4xl font-bold text-white">{mm}</p>
              <p className="text-[10px] text-white/40 uppercase mt-1">MM</p>
            </div>
            <div className="text-white/30 text-3xl font-bold">:</div>
            <div className="text-center">
              <p className="font-mono text-4xl font-bold text-white">{ss}</p>
              <p className="text-[10px] text-white/40 uppercase mt-1">SS</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg py-2 px-3 text-center">
             <p className="text-white text-[10px] font-bold uppercase">Est. Global Net Value: <span className="font-mono">$2,241,050.12</span></p>
          </div>
        </div>
      </div>

      {/* Imbalance & Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Imbalance Indicator */}
        <div className="lg:col-span-3 bg-white p-8 rounded-lg border border-border shadow-subtle">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <Activity className="text-primary w-5 h-5" />
              <h3 className="text-slate-900 font-bold">Pan-African Imbalance Indicator</h3>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                <div className="w-2 h-2 rounded-full bg-primary" /> Net Inflow
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                <div className="w-2 h-2 rounded-full bg-slate-200" /> Net Outflow
              </div>
            </div>
          </div>
          <div className="relative h-12 w-full bg-slate-100 rounded-full flex items-center px-2">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 z-10" />
            <motion.div
              initial={{ x: "15%" }}
              animate={{ x: "65%" }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="h-8 w-24 bg-primary rounded-full shadow-lg border-2 border-white flex items-center justify-center text-white"
            >
              <ArrowRightLeft size={16} />
            </motion.div>
          </div>
          <div className="flex justify-between mt-6">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase">East Hub</p>
              <p className="text-sm font-bold text-slate-700 mt-1 font-mono">-12.5%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Global Equilibrium</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase">West Hub</p>
              <p className="text-sm font-bold text-primary mt-1 font-mono">+18.2%</p>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="space-y-4">
          {[
            { label: "Avg. Cross-Region Time", value: "1.2s", icon: TrendingUp, color: "bg-primary/10 text-primary" },
            { label: "Pending Reconciliations", value: "42", icon: AlertCircle, color: "bg-warning/10 text-warning" },
            { label: "Network Risk Score", value: "Low (0.05)", icon: ShieldCheck, color: "bg-success/10 text-success" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-lg border border-border shadow-subtle flex items-center gap-4">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", stat.color)}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adjustments Table */}
      <div className="bg-white rounded-lg border border-border shadow-subtle overflow-hidden">
        <div className="px-8 py-5 border-b border-border flex justify-between items-center bg-background-soft/30">
          <h4 className="font-bold text-slate-900">Recent Network Adjustments</h4>
          <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">View All Records</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-background-soft/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-border">
                <th className="px-8 py-4">Timestamp</th>
                <th className="px-8 py-4">Hub</th>
                <th className="px-8 py-4">Action</th>
                <th className="px-8 py-4">Value (USD Eq)</th>
                <th className="px-8 py-4">Operator</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {poolAdjustments.map((adj, i) => (
                <tr key={i} className="hover:bg-background-soft/30 transition-colors">
                  <td className="px-8 py-5 text-[10px] font-mono font-bold text-slate-500">{adj.time}</td>
                  <td className="px-8 py-5 text-xs font-bold text-slate-700">{adj.pool}</td>
                  <td className="px-8 py-5 text-xs font-medium text-slate-600">{adj.action}</td>
                  <td className={cn(
                    "px-8 py-5 text-sm font-mono font-bold",
                    adj.amount.startsWith("+") ? "text-primary" : adj.amount.startsWith("-") ? "text-danger" : "text-slate-900"
                  )}>{adj.amount}</td>
                  <td className="px-8 py-5 text-xs text-slate-500 font-medium">{adj.operator}</td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold",
                      adj.status === "Confirmed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    )}>
                      {adj.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
