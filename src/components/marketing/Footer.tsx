"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
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
          <h4 className="font-bold mb-6 text-white">Product</h4>
          <ul className="space-y-4 text-white/40 text-sm">
            <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-white">Compliance</h4>
          <ul className="space-y-4 text-white/40 text-sm">
            <li>AML Policy</li>
            <li>Privacy Shield</li>
            <li>Audit Reports</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-white">Company</h4>
          <ul className="space-y-4 text-white/40 text-sm">
            <li>About Us</li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li>Nairobi Office</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-20 mt-20 border-t border-white/5 text-center text-white/20 text-xs">
        © 2024 Corridor Technologies Ltd. All rights reserved. Registered with CBK and BoU.
      </div>
    </footer>
  );
}
