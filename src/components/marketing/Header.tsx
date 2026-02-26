"use client";

import React from "react";
import Link from "next/link";

export function Header() {
  return (
    <nav className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#0E4D3A] rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-[#0E4D3A]/20">
            C
          </div>
          <span className="text-2xl font-black text-[#0E4D3A] tracking-tight">Corridor</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/features" className="text-sm font-bold text-slate-600 hover:text-[#0E4D3A] transition-colors">Features</Link>
          <Link href="/pricing" className="text-sm font-bold text-slate-600 hover:text-[#0E4D3A] transition-colors">Pricing</Link>
          <Link href="/contact" className="text-sm font-bold text-slate-600 hover:text-[#0E4D3A] transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-[#0E4D3A] px-4 py-2">Sign In</Link>
          <Link href="/signup" className="bg-[#0E4D3A] text-white px-6 py-3 rounded-lg text-sm font-bold shadow-lg shadow-[#0E4D3A]/20 hover:scale-105 transition-transform">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
