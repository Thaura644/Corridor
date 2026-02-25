"use client";

import React from "react";
import BalanceCard from "@/components/dashboard/BalanceCard";
import FXConversionPanel from "@/components/dashboard/FXConversionPanel";
import LiquidityPoolWidget from "@/components/dashboard/LiquidityPoolWidget";
import CashflowGraph from "@/components/dashboard/CashflowGraph";
import { ShieldCheck, TrendingUp, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Treasury Dashboard</h1>
          <p className="text-slate-500 mt-1">Nairobi 🇰🇪 ⇄ Kampala 🇺🇬 Operational Corridor</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-border shadow-sm">
            <ShieldCheck className="text-success w-4 h-4" />
            <span className="text-xs font-bold text-slate-700">Bank of Uganda Compliant</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-border shadow-sm">
            <ShieldCheck className="text-success w-4 h-4" />
            <span className="text-xs font-bold text-slate-700">CBK Registered</span>
          </div>
        </div>
      </div>

      {/* Balance Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BalanceCard
          type="KES"
          currency="KES"
          balance="14,250,000.00"
          available="12,100,000.00"
          pending="2,150,000.00"
          change="+12.5%"
          isPositive={true}
        />
        <BalanceCard
          type="UGX"
          currency="UGX"
          balance="385,200,000.00"
          available="340,000,000.00"
          pending="45,200,000.00"
          change="-2.1%"
          isPositive={false}
        />
        <BalanceCard
          type="USD"
          currency="USD"
          balance="112,050.12"
          available="112,050.12"
          pending="0.00"
          change="+0.8%"
          isPositive={true}
        />
      </div>

      {/* Main Grid: FX and Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CashflowGraph />
        </div>
        <div>
          <FXConversionPanel />
        </div>
      </div>

      {/* Bottom Grid: Liquidity and Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <LiquidityPoolWidget />
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-secondary p-6 rounded-lg text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-accent w-5 h-5" />
                <h3 className="font-bold">Total Corridor Exposure</h3>
              </div>
              <p className="text-3xl font-mono font-bold">$241,050.12</p>
              <p className="text-xs text-white/60 mt-2">Aggregated across all wallets</p>

              <div className="mt-6">
                <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                  <span>FX Sensitivity</span>
                  <span className="text-accent">Moderate</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-accent rounded-full" />
                </div>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="bg-white p-6 rounded-lg border border-border shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="text-warning w-5 h-5" />
                <h3 className="font-bold text-slate-900">Pending Actions</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center justify-between p-2 hover:bg-background-soft rounded-lg transition-colors cursor-pointer border border-transparent hover:border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full" />
                    <span className="text-xs font-medium text-slate-700">Reconcile 14 UGX transactions</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary">View</span>
                </li>
                <li className="flex items-center justify-between p-2 hover:bg-background-soft rounded-lg transition-colors cursor-pointer border border-transparent hover:border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-danger rounded-full" />
                    <span className="text-xs font-medium text-slate-700">Upload KYC for &quot;Kampala SME&quot;</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary">Upload</span>
                </li>
              </ul>
            </div>
            <button className="w-full mt-4 py-2 border-2 border-primary text-primary rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-all">
              Manage Compliance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
