"use client";

import React, { useState, useEffect } from "react";
import { ArrowRightLeft, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function FXConversionPanel() {
  const [fromAmount, setFromAmount] = useState("1000");
  const [isFlipped, setIsFlipped] = useState(false);
  const [rate, setRate] = useState(31.24);
  const [isPulse, setIsPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulse(true);
      setTimeout(() => setIsPulse(false), 500);
      setRate(prev => prev + (Math.random() - 0.5) * 0.01);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toAmount = (parseFloat(fromAmount || "0") * (isFlipped ? 1/rate : rate)).toFixed(2);

  return (
    <div className="bg-white p-6 rounded-lg shadow-subtle border border-border h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900">FX Live Conversion</h3>
        <motion.div
          animate={{ scale: isPulse ? [1, 1.1, 1] : 1 }}
          className="flex items-center gap-2 px-2 py-1 bg-success/10 rounded-full"
        >
          <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-success uppercase">Live Rate</span>
        </motion.div>
      </div>

      <div className="space-y-4 flex-1">
        <div className="relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">From</label>
          <div className="flex items-center gap-3 p-3 bg-background-soft rounded-lg border border-border focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <span className="font-bold text-slate-700">{isFlipped ? "UGX" : "KES"}</span>
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-xl font-mono font-bold w-full text-right"
            />
          </div>
        </div>

        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-8 h-8 bg-white rounded-full border border-border flex items-center justify-center text-primary shadow-sm hover:rotate-180 transition-transform duration-500"
          >
            <ArrowRightLeft size={14} />
          </button>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">To (Estimated)</label>
          <div className="flex items-center gap-3 p-3 bg-background-soft rounded-lg border border-border">
            <span className="font-bold text-slate-700">{isFlipped ? "KES" : "UGX"}</span>
            <div className="text-xl font-mono font-bold w-full text-right text-slate-900">
              {toAmount}
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-lg space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">Exchange Rate</span>
            <span className="text-slate-900 font-bold font-mono">1 {isFlipped ? "UGX" : "KES"} = {isFlipped ? (1/rate).toFixed(5) : rate.toFixed(2)} {isFlipped ? "KES" : "UGX"}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1 text-slate-500 font-medium">
              Spread Transparency <Info size={12} className="text-slate-400" />
            </span>
            <span className="text-success font-bold">0.5% (Included)</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">Arrival Time</span>
            <span className="text-slate-900 font-bold">Instant</span>
          </div>
        </div>
      </div>

      <button className="w-full mt-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
        Convert Now
      </button>
    </div>
  );
}
