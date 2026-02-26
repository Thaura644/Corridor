"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Send, History, Settings, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileItems = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  { icon: Send, label: "Send", href: "/send-payment" },
  { icon: ShieldCheck, label: "Compliance", href: "/compliance" },
  { icon: History, label: "History", href: "/transactions" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-border flex items-center justify-around px-2 z-50">
      {mobileItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 flex-1">
            <item.icon size={20} className={cn(isActive ? "text-primary" : "text-slate-400")} />
            <span className={cn("text-[10px] font-bold", isActive ? "text-primary" : "text-slate-400")}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
