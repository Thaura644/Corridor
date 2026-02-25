"use client";

import React from "react";
import { Upload, FileText, Play, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const payoutBatches = [
  { id: "BCH-102", name: "Nov Salary Disb.", total: "KES 4,500,000", recipients: 142, status: "Processing", date: "Today, 10:24" },
  { id: "BCH-101", name: "Supplier Payment Q4", total: "UGX 12,200,000", recipients: 12, status: "Completed", date: "22 Nov, 09:15" },
];

export default function PayoutsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bulk Payouts</h1>
          <p className="text-slate-500 mt-1">Mass disbursements across corridors via CSV/API</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
          <Upload size={20} />
          Upload Payout File
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-border shadow-subtle overflow-hidden">
             <div className="px-8 py-5 border-b border-border bg-background-soft/30">
                <h3 className="font-bold text-slate-900">Active Batches</h3>
             </div>
             <div className="divide-y divide-border">
                {payoutBatches.map((batch) => (
                   <div key={batch.id} className="p-6 flex items-center justify-between hover:bg-background-soft/30 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-primary/5 rounded-lg text-primary">
                            <FileText size={24} />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-900">{batch.name}</p>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">{batch.id} • {batch.date}</p>
                         </div>
                      </div>
                      <div className="text-right flex items-center gap-8">
                         <div>
                            <p className="text-sm font-mono font-bold text-slate-900">{batch.total}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">{batch.recipients} Recipients</p>
                         </div>
                         <div className="w-32">
                            <span className={cn(
                               "px-2.5 py-1 rounded-full text-[10px] font-bold block text-center",
                               batch.status === "Completed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                            )}>
                               {batch.status}
                            </span>
                         </div>
                         <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Play size={18} /></button>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-6 rounded-lg border border-border shadow-subtle">
              <h3 className="font-bold text-slate-900 mb-4">Payout Templates</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">Download our standard CSV template for mobile money and bank disbursement.</p>
              <button className="w-full py-2.5 bg-background-soft text-slate-700 border border-border rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-border transition-colors">
                 <Download size={14} /> Download Template
              </button>
           </div>

           <div className="bg-secondary p-6 rounded-lg text-white">
              <h3 className="font-bold mb-2">Automated Payouts</h3>
              <p className="text-xs text-white/60 leading-relaxed mb-6">Schedule recurring disbursements to your logistics partners and employees.</p>
              <button className="w-full py-2.5 bg-accent text-secondary rounded-lg text-xs font-bold">Setup Automation</button>
           </div>
        </div>
      </div>
    </div>
  );
}
