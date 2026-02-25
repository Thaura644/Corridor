"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  Send,
  RefreshCw,
  Droplets,
  BarChart3,
  History,
  Users,
  CheckCircle2,
  ShieldCheck,
  Settings,
  Key,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GanttChartSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Wallet, label: "Wallets", href: "/wallets" },
  { icon: Send, label: "Send Payment", href: "/send-payment" },
  { icon: RefreshCw, label: "FX Convert", href: "/fx-convert" },
  { icon: Droplets, label: "Liquidity", href: "/liquidity" },
  { icon: BarChart3, label: "Treasury Analytics", href: "/analytics" },
  { icon: History, label: "Transactions", href: "/transactions" },
  { icon: Users, label: "Bulk Payouts", href: "/payouts" },
  { icon: GanttChartSquare, label: "Reconciliation", href: "/reconciliation" },
  { icon: ShieldCheck, label: "Compliance Center", href: "/compliance" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: Key, label: "API Access", href: "/api-access" },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      className={cn(
        "fixed left-0 top-0 h-screen bg-secondary text-white z-50 flex flex-col transition-all duration-300 ease-in-out border-r border-white/10"
      )}
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="font-bold text-xl">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Corridor</span>
          </motion.div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
             <span className="font-bold text-xl">C</span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "group relative flex items-center p-3 rounded-lg transition-all duration-200 cursor-pointer overflow-hidden",
                  isActive ? "bg-primary/20 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_8px_rgba(18,183,106,0.8)]"
                  />
                )}
                <item.icon className={cn("w-5 h-5 min-w-[20px]", isActive ? "text-primary" : "group-hover:text-primary")} />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-3 font-medium text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className={cn(
          "flex items-center p-3 rounded-lg text-white/60 hover:bg-white/5 hover:text-white cursor-pointer transition-all",
          isCollapsed && "justify-center"
        )}>
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3 font-medium text-sm">Logout</span>}
        </div>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white border-2 border-secondary hover:scale-110 transition-transform z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
}
