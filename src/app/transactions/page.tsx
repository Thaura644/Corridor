"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const transactions = [
  {
    id: "COR-7729-XPK",
    date: "2023-11-24 10:24",
    corridor: "KE ⇄ UG",
    counterparty: "Alex Mwangi",
    currency: "KES",
    amount: "15,000.00",
    rate: "31.24",
    fee: "150.00",
    status: "Settled",
    type: "Payout"
  },
  {
    id: "COR-8821-YLM",
    date: "2023-11-24 09:15",
    corridor: "UG ⇄ KE",
    counterparty: "Kampala Agri-Hub",
    currency: "UGX",
    amount: "2,400,000.00",
    rate: "0.032",
    fee: "5,000.00",
    status: "Pending",
    type: "Collection"
  },
  {
    id: "COR-9901-ZTR",
    date: "2023-11-23 16:40",
    corridor: "KE ⇄ UG",
    counterparty: "Nairobi Logistics",
    currency: "KES",
    amount: "50,000.00",
    rate: "31.20",
    fee: "500.00",
    status: "Flagged",
    type: "Payout"
  },
];

export default function TransactionsPage() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Transaction Ledger</h1>
          <p className="text-slate-500 mt-1">Full immutable record of corridor movements</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-sm font-bold text-slate-700 hover:bg-background-soft transition-colors shadow-sm">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-border shadow-sm flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by reference, counterparty or amount..."
            className="w-full pl-10 pr-4 py-2 bg-background-soft border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-background-soft border border-border rounded-lg text-xs font-bold text-slate-600">
            <Calendar size={14} />
            Date Range
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-background-soft border border-border rounded-lg text-xs font-bold text-slate-600">
            <Filter size={14} />
            Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-border shadow-subtle overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background-soft border-b border-border">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Corridor</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Counterparty</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rate</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((tx) => (
              <React.Fragment key={tx.id}>
                <tr
                  className={cn(
                    "hover:bg-background-soft/50 transition-colors cursor-pointer",
                    expandedRow === tx.id && "bg-background-soft"
                  )}
                  onClick={() => toggleRow(tx.id)}
                >
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-900">{tx.date.split(" ")[0]}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{tx.date.split(" ")[1]}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600">
                      {tx.corridor}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{tx.counterparty}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{tx.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-mono font-bold text-slate-900">{tx.amount}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{tx.currency}</p>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-600">
                    {tx.rate}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold",
                      tx.status === "Settled" ? "bg-success/10 text-success" :
                      tx.status === "Pending" ? "bg-warning/10 text-warning" :
                      "bg-danger/10 text-danger"
                    )}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {expandedRow === tx.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </td>
                </tr>
                <AnimatePresence>
                  {expandedRow === tx.id && (
                    <tr>
                      <td colSpan={7} className="px-0 py-0">
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-slate-50/50"
                        >
                          <div className="p-8 grid grid-cols-3 gap-8">
                            <div>
                              <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4">Double-Entry Breakdown</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-500">Dr. Customer Wallet ({tx.currency})</span>
                                  <span className="text-danger font-bold font-mono">-{tx.amount}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-500">Cr. Corridor Liquidity Pool</span>
                                  <span className="text-success font-bold font-mono">+{tx.amount}</span>
                                </div>
                                <div className="flex justify-between text-xs pt-2 border-t border-border">
                                  <span className="text-slate-500 font-bold">Transaction Fee</span>
                                  <span className="text-slate-900 font-bold font-mono">{tx.fee} {tx.currency}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4">Corridor Insights</h4>
                              <div className="space-y-3">
                                <div className="p-3 bg-white rounded-lg border border-border">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">FX Spread Captured</p>
                                  <p className="text-sm font-bold text-primary">0.52% ($4.20 eq.)</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-border">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Settlement Rail</p>
                                  <p className="text-sm font-bold text-slate-700">{tx.type === "Payout" ? "Local RTGS / Mobile Money" : "Prefunded Netting"}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-3">
                              <button className="w-full py-2 bg-white border border-border rounded-lg text-xs font-bold text-slate-700 hover:bg-white flex items-center justify-center gap-2">
                                <ExternalLink size={14} /> View on Blockchain
                              </button>
                              <button className="w-full py-2 bg-white border border-border rounded-lg text-xs font-bold text-slate-700 hover:bg-white flex items-center justify-center gap-2">
                                <Download size={14} /> Download Receipt
                              </button>
                              <button className="w-full py-2 bg-danger/5 border border-danger/20 rounded-lg text-xs font-bold text-danger hover:bg-danger/10">
                                Raise Dispute
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center px-2">
        <p className="text-xs text-slate-500 font-medium">Showing 1-10 of 1,240 transactions</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-border rounded-lg text-xs font-bold text-slate-400 cursor-not-allowed">Previous</button>
          <button className="px-4 py-2 bg-white border border-border rounded-lg text-xs font-bold text-slate-700 hover:bg-background-soft">Next</button>
        </div>
      </div>
    </div>
  );
}
