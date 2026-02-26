"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 py-20">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors">
        <ArrowLeft size={18} /> Back to Site
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900">Apply for Institutional Access</h1>
          <p className="text-slate-500 mt-2 text-lg">Join the liquidity bridge between Kenya and Uganda.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-2 bg-[#0E4D3A] p-10 text-white flex flex-col justify-between">
            <div>
               <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-8">
                  <ShieldCheck size={24} />
               </div>
               <h3 className="text-2xl font-bold mb-6">Why Corridor?</h3>
               <ul className="space-y-4">
                  {[
                    "Instant cross-border settlement",
                    "Deep liquidity in KES & UGX",
                    "CBK & BoU regulatory compliance",
                    "Tiered institutional KYC",
                    "Real-time treasury visibility"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/80">
                      <CheckCircle2 size={16} className="text-accent" />
                      {item}
                    </li>
                  ))}
               </ul>
            </div>
            <div className="pt-10 border-t border-white/10">
               <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">Trusted by leading SMEs</p>
            </div>
          </div>

          <div className="md:col-span-3 p-10 space-y-6">
            <div className="grid grid-cols-1 gap-6">
               <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Company Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Entity Name</label>
                        <input type="text" placeholder="Logistics Ltd" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                     </div>
                     <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Tax ID / PIN</label>
                        <input type="text" placeholder="P05..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm font-mono" />
                     </div>
                  </div>
                  <div>
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Operational Region</label>
                     <div className="flex gap-4">
                        <label className="flex-1 border border-slate-200 p-3 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-slate-50">
                           <input type="checkbox" defaultChecked className="rounded text-primary" />
                           <span className="text-sm font-bold">Kenya</span>
                        </label>
                        <label className="flex-1 border border-slate-200 p-3 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-slate-50">
                           <input type="checkbox" defaultChecked className="rounded text-primary" />
                           <span className="text-sm font-bold">Uganda</span>
                        </label>
                     </div>
                  </div>
               </div>

               <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Admin User</h4>
                  <div>
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Work Email</label>
                     <input type="email" placeholder="admin@company.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                  </div>
               </div>
            </div>

            <button className="w-full bg-[#0E4D3A] text-white py-4 rounded-xl font-bold shadow-xl shadow-[#0E4D3A]/20 hover:bg-[#0E4D3A]/90 transition-all">
              Submit Application
            </button>

            <p className="text-center text-xs text-slate-500">
              Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
