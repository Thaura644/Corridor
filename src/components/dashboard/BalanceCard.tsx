"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  currency: string;
  balance: string;
  available: string;
  pending: string;
  change: string;
  isPositive: boolean;
  type: "KES" | "UGX" | "USD";
}

export default function BalanceCard({
  currency,
  balance,
  available,
  pending,
  change,
  isPositive,
  type,
}: BalanceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      className="bg-white p-6 rounded-lg shadow-subtle border border-border relative overflow-hidden group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold",
            type === "KES" ? "bg-primary" : type === "UGX" ? "bg-secondary" : "bg-accent"
          )}>
            {currency.slice(0, 1)}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{currency} Wallet</h3>
            <p className="text-[10px] font-medium text-slate-400">Account: **** 8821</p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-mono font-bold text-slate-900">{balance}</span>
          <span className="text-xs font-bold text-slate-400">{currency}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          {isPositive ? (
            <ArrowUpRight size={14} className="text-success" />
          ) : (
            <ArrowDownRight size={14} className="text-danger" />
          )}
          <span className={cn("text-xs font-bold", isPositive ? "text-success" : "text-danger")}>
            {change} <span className="text-slate-400 font-medium">vs yesterday</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Available</p>
          <p className="text-sm font-mono font-bold text-slate-700">{available}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Pending</p>
          <p className="text-sm font-mono font-bold text-slate-700">{pending}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="flex-1 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors">
          Send
        </button>
        <button className="flex-1 py-2 bg-background-soft text-slate-700 rounded-lg text-xs font-bold hover:bg-border transition-colors border border-border">
          Convert
        </button>
      </div>

      {/* Glass pulse decoration */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
    </motion.div>
  );
}
