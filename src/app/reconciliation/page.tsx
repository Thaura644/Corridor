"use client";

import React from "react";
import { GanttChartSquare, CheckCircle2, AlertCircle, RefreshCw, Filter, Search, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const reconciliationItems = [
  { id: "REC-441", description: "M-Pesa Inbound vs Internal Ledger", match: 98, status: "Review Required", date: "24 Nov" },
  { id: "REC-440", description: "MTN MoMo Settlement vs Bank Statement", match: 100, status: "Matched", date: "23 Nov" },
];

export default function ReconciliationPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Smart Reconciliation</h1>
          <p className="text-slate-500 mt-1">Automated matching of corridor rails with internal ledger</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-sm font-bold text-slate-700">
             <Filter size={16} /> Filters
           </button>
           <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/20">
             <RefreshCw size={16} /> Run Auto-Match
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
            { label: "Match Rate", value: "99.2%", icon: CheckCircle2, color: "text-success" },
            { label: "Unmatched Items", value: "14", icon: AlertCircle, color: "text-warning" },
            { label: "Net Difference", value: "$42.10", icon: GanttChartSquare, color: "text-slate-400" },
            { label: "Last Run", value: "2h ago", icon: RefreshCw, color: "text-primary" },
         ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-border shadow-subtle">
               <div className="p-2 bg-background-soft rounded-lg w-fit mb-4">
                  <stat.icon size={20} className="text-slate-400" />
               </div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
               <p className="text-2xl font-mono font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
         ))}
      </div>

      <div className="bg-white rounded-lg border border-border shadow-subtle overflow-hidden">
         <div className="px-8 py-5 border-b border-border bg-background-soft/30 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Reconciliation Ledger</h3>
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
               <input type="text" placeholder="Search accounts..." className="pl-9 pr-4 py-1.5 bg-white border border-border rounded-lg text-xs" />
            </div>
         </div>
         <table className="w-full text-left">
            <thead>
               <tr className="bg-background-soft/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-border">
                  <th className="px-8 py-4">Account Pair</th>
                  <th className="px-8 py-4">Confidence</th>
                  <th className="px-8 py-4">Last Match</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right"></th>
               </tr>
            </thead>
            <tbody className="divide-y divide-border">
               {reconciliationItems.map((item) => (
                  <tr key={item.id} className="hover:bg-background-soft/30 transition-colors">
                     <td className="px-8 py-5">
                        <p className="text-sm font-bold text-slate-900">{item.description}</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{item.id}</p>
                     </td>
                     <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                           <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={cn("h-full rounded-full", item.match === 100 ? "bg-success" : "bg-warning")} style={{ width: `${item.match}%` }} />
                           </div>
                           <span className="text-xs font-mono font-bold text-slate-700">{item.match}%</span>
                        </div>
                     </td>
                     <td className="px-8 py-5 text-sm text-slate-600 font-medium">{item.date}</td>
                     <td className="px-8 py-5">
                        <span className={cn(
                           "px-2.5 py-1 rounded-full text-[10px] font-bold",
                           item.status === "Matched" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        )}>
                           {item.status}
                        </span>
                     </td>
                     <td className="px-8 py-5 text-right">
                        <button className="text-slate-400 hover:text-primary"><MoreVertical size={16} /></button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}
