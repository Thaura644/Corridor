"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe, BarChart3, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0E4D3A] rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-[#0E4D3A]/20">
              C
            </div>
            <span className="text-2xl font-black text-[#0E4D3A] tracking-tight">Corridor</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-slate-600 hover:text-[#0E4D3A] transition-colors">Features</a>
            <a href="#corridors" className="text-sm font-bold text-slate-600 hover:text-[#0E4D3A] transition-colors">Corridors</a>
            <a href="#compliance" className="text-sm font-bold text-slate-600 hover:text-[#0E4D3A] transition-colors">Compliance</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-[#0E4D3A] px-4 py-2">Sign In</Link>
            <Link href="/signup" className="bg-[#0E4D3A] text-white px-6 py-3 rounded-lg text-sm font-bold shadow-lg shadow-[#0E4D3A]/20 hover:scale-105 transition-transform">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0E4D3A]/5 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#0E4D3A] rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-[#0E4D3A] uppercase tracking-widest">Institutional Treasury for SMEs</span>
            </div>
            <h1 className="text-6xl font-black text-slate-900 leading-[1.1] mb-8">
              The Liquidity Bridge Between <span className="text-[#0E4D3A]">Kenya & Uganda.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
              Corridor provides the financial infrastructure East African SMEs need to manage liquidity, settle instantly, and control FX exposure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className="bg-[#0E4D3A] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#0E4D3A]/20 hover:bg-[#0E4D3A]/90 transition-all">
                Open Institutional Account <ArrowRight size={20} />
              </Link>
              <Link href="/dashboard" className="bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-slate-200 transition-all">
                View Live Demo
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#0E4D3A]/10 blur-[100px] rounded-full" />
            <div className="relative bg-white p-2 rounded-2xl border border-slate-200 shadow-2xl">
               <div className="bg-slate-50 aspect-video rounded-xl flex items-center justify-center border border-slate-100">
                  <BarChart3 className="w-20 h-20 text-[#0E4D3A]/20" />
               </div>
               <div className="absolute -left-8 top-1/4 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:block">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-emerald-500" />
                    <span className="text-[10px] font-bold uppercase text-slate-400">KES Pool Status</span>
                  </div>
                  <p className="text-xl font-mono font-bold text-slate-900">142.5M KES</p>
               </div>
               <div className="absolute -right-8 bottom-1/4 bg-[#0B1F33] p-4 rounded-xl shadow-xl text-white hidden md:block">
                  <p className="text-[10px] font-bold uppercase opacity-60 mb-1">FX Savings</p>
                  <p className="text-xl font-mono font-bold text-[#C9A227]">+2.4% Match</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Built for Institutional Trust</h2>
            <p className="text-lg text-slate-500">Not just another wallet. A complete liquidity orchestration layer for regional trade.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Corridor-Specific Liquidity", desc: "Access deep pre-funded pools in KES and UGX for instant settlement without SWIFT delays." },
              { icon: Zap, title: "Instant Rail Settlement", desc: "Direct integration with M-Pesa and MTN MoMo ensures your payments land in seconds, not days." },
              { icon: Shield, title: "Regulator Ready", desc: "Built to comply with CBK and BoU standards. Real-time AML monitoring and tiered KYC." },
              { icon: BarChart3, title: "Treasury Analytics", desc: "Monitor your FX exposure and netting efficiency with enterprise-grade reporting tools." },
              { icon: Lock, title: "Bank-Grade Security", desc: "Multi-signature approval workflows and 256-bit encryption for all corridor movements." },
              { icon: Globe, title: "Regional Expansion", desc: "Currently active in Kenya and Uganda, with TZ and RW corridors launching soon." },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-[#0E4D3A]/5 text-[#0E4D3A] rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center justify-center md:justify-start gap-2 mb-8">
                  <div className="w-8 h-8 bg-[#0E4D3A] rounded-lg flex items-center justify-center text-white font-black text-lg">C</div>
                  <span className="text-xl font-black tracking-tight">Corridor</span>
               </div>
               <p className="text-white/40 text-sm leading-relaxed">The institutional treasury infrastructure for East African trade.</p>
            </div>
            <div>
               <h4 className="font-bold mb-6">Product</h4>
               <ul className="space-y-4 text-white/40 text-sm">
                  <li>Liquidity Pools</li>
                  <li>FX Engine</li>
                  <li>Settlement Rails</li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold mb-6">Compliance</h4>
               <ul className="space-y-4 text-white/40 text-sm">
                  <li>AML Policy</li>
                  <li>Privacy Shield</li>
                  <li>Audit Reports</li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold mb-6">Company</h4>
               <ul className="space-y-4 text-white/40 text-sm">
                  <li>About Us</li>
                  <li>Contact</li>
                  <li>Nairobi Office</li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-6 pt-20 mt-20 border-t border-white/5 text-center text-white/20 text-xs">
            © 2024 Corridor Technologies Ltd. All rights reserved. Registered with CBK and BoU.
         </div>
      </footer>
    </div>
  );
}
