"use client";

import React from "react";
import { Droplets, AlertTriangle, ArrowUpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PoolProps {
  name: string;
  currency: string;
  utilization: number;
  buffer: number;
}

function PoolBar({ name, currency, utilization, buffer }: PoolProps) {
  const isWarning = utilization > buffer;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <div>
          <h4 className="text-xs font-bold text-slate-900">{name}</h4>
          <p className="text-[10px] text-slate-500">{currency} Pool</p>
        </div>
        <span className={cn(
          "text-xs font-mono font-bold",
          isWarning ? "text-danger" : "text-success"
        )}>
          {utilization}% Used
        </span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${utilization}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full transition-colors",
            isWarning ? "bg-danger" : "bg-primary"
          )}
        />
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-slate-300"
          style={{ left: `${buffer}%` }}
        />
      </div>
      {isWarning && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-[10px] text-danger font-bold"
        >
          <AlertTriangle size={12} />
          <span>Low liquidity buffer - Top up recommended</span>
        </motion.div>
      )}
    </div>
  );
}

export default function LiquidityPoolWidget() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-subtle border border-border">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Droplets className="text-primary w-5 h-5" />
          <h3 className="font-bold text-slate-900">Liquidity Status</h3>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold hover:bg-primary/20 transition-colors">
          <ArrowUpCircle size={12} />
          Top Up Pool
        </button>
      </div>

      <div className="space-y-8">
        <PoolBar name="Kenya Pool" currency="KES" utilization={45} buffer={80} />
        <PoolBar name="Uganda Pool" currency="UGX" utilization={88} buffer={80} />
      </div>

      <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-4">
        <div className="p-3 bg-background-soft rounded-lg">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Net Settlement</p>
          <p className="text-sm font-mono font-bold text-slate-700">14:22:05</p>
        </div>
        <div className="p-3 bg-background-soft rounded-lg">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Exposure</p>
          <p className="text-sm font-mono font-bold text-slate-700">Low (0.02)</p>
        </div>
      </div>
    </div>
  );
}
