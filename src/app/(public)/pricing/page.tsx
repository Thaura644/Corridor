"use client";

import React from "react";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Standard",
      price: "0",
      description: "Ideal for small traders and occasional cross-border payments.",
      features: [
        "Up to $1,000 monthly volume",
        "Standard FX rates (1.2% spread)",
        "Mobile Money payouts",
        "Next-day settlement",
        "Basic compliance tracking"
      ],
      cta: "Start for Free",
      highlight: false
    },
    {
      name: "Growth",
      price: "49",
      description: "Designed for active SMEs with weekly goods movement.",
      features: [
        "Up to $50,000 monthly volume",
        "Preferred FX rates (0.8% spread)",
        "Instant corridor settlement",
        "Multi-user SME dashboard",
        "Priority support",
        "Bulk payouts"
      ],
      cta: "Get Started",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Institutional infrastructure for aggregators and large exporters.",
      features: [
        "Unlimited volume",
        "Direct pool access (0.5% spread)",
        "API access for ERP sync",
        "Dedicated account manager",
        "Custom compliance workflows",
        "Multi-entity management"
      ],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <div className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Simple, Transparent <span className="text-[#0E4D3A]">Pricing.</span></h1>
          <p className="text-xl text-slate-500">Choose the plan that fits your corridor trade volume. No hidden fees, ever.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`bg-white p-10 rounded-3xl border ${plan.highlight ? "border-[#0E4D3A] shadow-2xl scale-105" : "border-slate-200 shadow-sm"} relative flex flex-col`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0E4D3A] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{plan.description}</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">{plan.price === "Custom" ? "" : "$"}{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-slate-400 font-bold">/mo</span>}
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                    <Check size={18} className="text-[#0E4D3A]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.name === "Enterprise" ? "/contact" : "/signup"}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  plan.highlight
                  ? "bg-[#0E4D3A] text-white shadow-xl shadow-[#0E4D3A]/20 hover:scale-[1.02]"
                  : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                {plan.cta} <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-white rounded-[3rem] border border-slate-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-xl">
              <h3 className="text-3xl font-black text-slate-900 mb-4">Are you a Financial Institution?</h3>
              <p className="text-slate-500">We provide white-label corridor infrastructure for banks and regional payment providers. Partner with us to unlock instant liquidity for your customers.</p>
           </div>
           <Link href="/contact" className="bg-[#0B1F33] text-white px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-transform">
              Partner with Corridor
           </Link>
        </div>
      </div>
    </div>
  );
}
