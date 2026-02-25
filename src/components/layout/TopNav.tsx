"use client";

import React from "react";
import { Bell, ChevronDown, Search } from "lucide-react";

export default function TopNav() {
  return (
    <header className="h-16 border-b border-border bg-white flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-10 pr-4 py-2 bg-background-soft rounded-lg text-sm border-none focus:ring-2 focus:ring-primary/20 w-64"
          />
        </div>

        <div className="hidden lg:flex items-center overflow-hidden w-64 border-l border-border pl-6">
          <div className="flex gap-4 animate-marquee whitespace-nowrap">
            <span className="text-xs font-mono font-bold text-slate-500">
              KES/UGX <span className="text-success">31.24 ↑</span>
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">
              USD/KES <span className="text-danger">129.50 ↓</span>
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">
              USD/UGX <span className="text-success">3850.00 ↑</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-background-soft rounded-full border border-border">
          <span className="text-lg">🇰🇪</span>
          <span className="text-[10px] font-bold text-slate-400">⇄</span>
          <span className="text-lg">🇺🇬</span>
          <span className="text-xs font-bold text-slate-700 ml-1">Corridor Active</span>
        </div>

        <button className="relative p-2 text-slate-600 hover:bg-background-soft rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-border cursor-pointer group">
          <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 leading-none">John Doe</span>
            <span className="text-[10px] font-medium text-slate-500 mt-1">SME Admin</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
        </div>
      </div>
    </header>
  );
}
