"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, Globe, Layers, ArrowRight } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "Double-Entry Ledger Engine",
      description: "Our core accounting engine ensures ACID-compliant movements for every transaction across multiple currencies. Institutional grade immutability.",
      icon: Layers,
      color: "bg-blue-500",
    },
    {
      title: "Real-Time FX Routing",
      description: "Proprietary routing logic finds the best rates across regional pools, compressing spreads from 5% to under 1% for SME trade.",
      icon: Zap,
      color: "bg-amber-500",
    },
    {
      title: "Corridor Liquidity Pools",
      description: "Prefunded KES and UGX pools eliminate the need for traditional correspondent banking, enabling instant settlement.",
      icon: Globe,
      color: "bg-[#0E4D3A]",
    },
    {
      title: "Regulator-First Compliance",
      description: "Automated AML screening, tiered KYC workflows, and direct reporting capabilities for CBK and BoU oversight.",
      icon: Shield,
      color: "bg-emerald-500",
    },
    {
      title: "Institutional Analytics",
      description: "Get deep visibility into cashflow, FX exposure, and netting efficiency with professional-grade dashboards.",
      icon: BarChart3,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Infrastructure for <span className="text-[#0E4D3A]">Frictionless Trade.</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            We&apos;ve rebuilt the cross-border payment stack from the ground up, specifically for the East African corridor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-3xl border border-slate-100 bg-white hover:border-[#0E4D3A]/20 hover:shadow-2xl transition-all"
            >
              <div className={`w-12 h-12 ${feature.color} text-white rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-6">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Deep Dive Section */}
        <section className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0E4D3A]/20 blur-[120px] rounded-full translate-x-1/2" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black mb-8 leading-tight">Instant Settlement via Liquidity Netting</h2>
              <p className="text-white/60 text-lg mb-10 leading-relaxed">
                By maintaining pre-funded pools in Nairobi and Kampala, Corridor bypasses the slow and expensive SWIFT network. Our netting engine balances flows in real-time, ensuring SMEs get their money in seconds.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "No intermediary bank fees",
                  "Guaranteed delivery time (< 30s)",
                  "Transparent FX margin",
                  "Automatic reconciliation"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#0E4D3A] rounded-full flex items-center justify-center text-[10px] font-bold">✓</div>
                    <span className="font-bold">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors">
                Read the Whitepaper <ArrowRight size={20} />
              </button>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 aspect-square flex items-center justify-center">
               <div className="w-full space-y-4">
                  <div className="h-4 w-3/4 bg-white/10 rounded-full animate-pulse" />
                  <div className="h-4 w-1/2 bg-white/10 rounded-full animate-pulse" />
                  <div className="h-32 w-full border border-white/10 rounded-xl bg-white/5" />
                  <div className="h-4 w-2/3 bg-white/10 rounded-full animate-pulse" />
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
