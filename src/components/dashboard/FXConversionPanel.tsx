"use client";

import React, { useState, useEffect } from "react";
import { ArrowRightLeft, Info } from "lucide-react";
import { motion } from "framer-motion";
import { AFRICAN_CURRENCIES } from "@/lib/constants";

export default function FXConversionPanel() {
  const [fromAmount, setFromAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("KES");
  const [toCurrency, setToCurrency] = useState("UGX");
  const [rate, setRate] = useState(31.24);
  const [isPulse, setIsPulse] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock rate fetching based on pair
    const mockRates: Record<string, number> = {
      "KES-UGX": 31.24,
      "UGX-KES": 0.032,
      "USD-KES": 129.50,
      "KES-USD": 0.0077,
      "USD-NGN": 1650.00,
      "NGN-USD": 0.0006,
      "ZAR-KES": 7.02,
      "KES-ZAR": 0.14,
    };
    const key = `${fromCurrency}-${toCurrency}`;
    setRate(mockRates[key] || 1.0);
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulse(true);
      setTimeout(() => setIsPulse(false), 500);
      setRate(prev => prev + (Math.random() - 0.5) * 0.0001 * prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toAmount = (parseFloat(fromAmount || "0") * rate).toFixed(2);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/fx/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromCurrency,
          to: toCurrency,
          amount: parseFloat(fromAmount),
          rate: rate,
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Successfully converted ${fromAmount} ${fromCurrency} to ${data.toAmount} ${toCurrency}`);
        window.location.reload();
      } else {
        alert(data.error || "Conversion failed");
      }
    } catch (err) {
      alert("Failed to connect to FX engine");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

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
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="bg-transparent border-none focus:ring-0 font-bold text-slate-700 p-0 pr-6"
            >
              {AFRICAN_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
            </select>
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
            onClick={handleSwap}
            className="w-8 h-8 bg-white rounded-full border border-border flex items-center justify-center text-primary shadow-sm hover:rotate-180 transition-transform duration-500"
          >
            <ArrowRightLeft size={14} />
          </button>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">To (Estimated)</label>
          <div className="flex items-center gap-3 p-3 bg-background-soft rounded-lg border border-border focus-within:ring-2 focus-within:ring-primary/20 transition-all">
             <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="bg-transparent border-none focus:ring-0 font-bold text-slate-700 p-0 pr-6"
            >
              {AFRICAN_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
            </select>
            <div className="text-xl font-mono font-bold w-full text-right text-slate-900">
              {toAmount}
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-lg space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">Exchange Rate</span>
            <span className="text-slate-900 font-bold font-mono">1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}</span>
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

      <button
        onClick={handleConvert}
        disabled={loading || !fromAmount}
        className="w-full mt-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
      >
        {loading ? "Converting..." : "Convert Now"}
      </button>
    </div>
  );
}
