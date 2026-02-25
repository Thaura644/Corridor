"use client";

import React from "react";
import Link from "next/link";
import { Send } from "lucide-react";

export default function MobileFAB() {
  return (
    <Link
      href="/send-payment"
      className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/40 z-50 active:scale-95 transition-transform"
    >
      <Send size={24} />
    </Link>
  );
}
