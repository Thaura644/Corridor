"use client";

import React from "react";
import FXConversionPanel from "@/components/dashboard/FXConversionPanel";
import { History, TrendingUp, Info, ArrowRightLeft } from "lucide-react";

export default function FXConvertPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">FX Conversion Desk</h1>
          <p className="text-slate-500 mt-1">Instant internal settlement between KES and UGX liquidity pools</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <FXConversionPanel />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-lg border border-border shadow-subtle">
             <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={20} className="text-primary" />
                <h3 className="font-bold text-slate-900">Live Corridor Spread</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <div className="flex justify-between items-center p-4 bg-background-soft rounded-lg">
                      <span className="text-xs font-bold text-slate-500">MARKET RATE</span>
                      <span className="text-sm font-mono font-bold text-slate-900">31.2421</span>
                   </div>
                   <div className="flex justify-between items-center p-4 bg-background-soft rounded-lg border border-primary/20">
                      <span className="text-xs font-bold text-slate-500">CORRIDOR RATE</span>
                      <span className="text-sm font-mono font-bold text-primary">31.2400</span>
                   </div>
                </div>
                <div className="p-6 bg-primary/5 rounded-xl flex flex-col justify-center">
                   <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Total Savings Captured</p>
                   <p className="text-3xl font-mono font-bold text-primary">0.52%</p>
                   <p className="text-xs text-primary/60 mt-2">vs traditional bank transfer rails</p>
                </div>
             </div>
          </div>

          <div className="bg-white rounded-lg border border-border shadow-subtle overflow-hidden">
             <div className="px-8 py-5 border-b border-border bg-background-soft/30 flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <History size={18} className="text-slate-400" />
                   <h3 className="font-bold text-slate-900">Recent Conversions</h3>
                </div>
             </div>
             <div className="p-12 text-center">
                <ArrowRightLeft className="w-10 h-10 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 text-sm font-medium">No conversion history available.</p>
             </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-secondary text-white rounded-lg flex items-start gap-4">
         <Info size={24} className="text-accent mt-1" />
         <div>
            <h4 className="font-bold text-lg">Corridor Liquidity Notice</h4>
            <p className="text-white/60 text-sm leading-relaxed mt-1">
               Conversions are settled instantly against our pre-funded pools. Large volume conversions (&gt; 50M KES) may require manual compliance override from our treasury desk.
            </p>
         </div>
      </div>
    </div>
  );
}
