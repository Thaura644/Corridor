"use client";

import React from "react";
import { Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h1 className="text-5xl font-black text-slate-900 mb-8 tracking-tight">
              Let&apos;s Scale Your <br /><span className="text-[#0E4D3A]">Corridor Trade.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-12">
              Our team of corridor liquidity experts is ready to help you optimize your cross-border treasury operations.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#0E4D3A]/5 text-[#0E4D3A] rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Nairobi Office</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    12th Floor, Trade Center<br />
                    Westlands, Nairobi, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#0E4D3A]/5 text-[#0E4D3A] rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Kampala Office</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Level 4, Nakawa Business Park<br />
                    Kampala, Uganda
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#0E4D3A]/5 text-[#0E4D3A] rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Institutional Inquiries</h4>
                  <p className="text-slate-500 text-sm">sales@corridor.africa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Send an Inquiry</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0E4D3A]/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Company Email</label>
                  <input
                    type="email"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0E4D3A]/20 transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Company Name</label>
                <input
                  type="text"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0E4D3A]/20 transition-all"
                  placeholder="SME Exports Ltd"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Expected Monthly Volume</label>
                <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0E4D3A]/20 transition-all">
                  <option>Under $10,000</option>
                  <option>$10,000 - $50,000</option>
                  <option>$50,000 - $250,000</option>
                  <option>$250,000+</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0E4D3A]/20 transition-all"
                  placeholder="Tell us about your corridor needs..."
                />
              </div>
              <button
                type="button"
                className="w-full bg-[#0E4D3A] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#0E4D3A]/20 hover:scale-[1.02] transition-all"
              >
                Submit Inquiry <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
