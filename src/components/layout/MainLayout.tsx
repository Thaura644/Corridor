"use client";

import React from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import MobileFAB from "@/components/ui/MobileFAB";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background-soft">
      {/* Sidebar hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          "pb-20 md:pb-0", // Space for bottom nav on mobile
          isCollapsed ? "md:pl-20" : "md:pl-64",
          "pl-0" // No padding on mobile
        )}
      >
        <TopNav />
        <main className="p-4 md:p-8 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>

      <BottomNav />
      <MobileFAB />
    </div>
  );
}
