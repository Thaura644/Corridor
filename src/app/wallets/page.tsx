"use client";

import React from "react";
import { Plus, Wallet, MoreHorizontal, Download, ArrowUpRight, ArrowDownRight } from "lucide-react";

const wallets = [
  { id: "1", currency: "KES", balance: "14,250,000.00", available: "12,100,000.00", pending: "2,150,000.00", status: "Active" },
  { id: "2", currency: "UGX", balance: "385,200,000.00", available: "340,000,000.00", pending: "45,200,000.00", status: "Active" },
  { id: "3", currency: "USD", balance: "112,050.12", available: "112,050.12", pending: "0.00", status: "Active" },
];

export default function WalletsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Multi-Currency Wallets</h1>
          <p className="text-slate-500 mt-1">Manage institutional liquidity across East African rails</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
          <Plus size={20} />
          Open New Wallet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {wallets.map((w) => (
          <div key={w.id} className="bg-white p-8 rounded-lg border border-border shadow-subtle group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/5 text-primary rounded-lg flex items-center justify-center font-black text-xl">
                  {w.currency.slice(0, 1)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{w.currency} Treasury</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Operational</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={20} /></button>
            </div>

            <div className="space-y-1 mb-8">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Balance</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-mono font-bold text-slate-900">{w.balance}</span>
                <span className="text-sm font-bold text-slate-400">{w.currency}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border mb-8">
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Available</p>
                  <p className="text-sm font-mono font-bold text-slate-700">{w.available}</p>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Pending</p>
                  <p className="text-sm font-mono font-bold text-slate-700">{w.pending}</p>
               </div>
            </div>

            <div className="flex gap-3">
               <button className="flex-1 py-2.5 bg-primary text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                  <ArrowUpRight size={14} /> Send
               </button>
               <button className="flex-1 py-2.5 bg-white border border-border text-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-background-soft transition-colors">
                  <ArrowDownRight size={14} /> Deposit
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-border shadow-subtle overflow-hidden">
         <div className="px-8 py-5 border-b border-border flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Settlement Activity</h3>
            <button className="flex items-center gap-2 text-xs font-bold text-primary hover:underline">
               <Download size={14} /> Download Ledger
            </button>
         </div>
         <div className="p-20 text-center">
            <Wallet className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 text-sm font-medium">No recent activity for the selected period.</p>
         </div>
      </div>
    </div>
  );
}
