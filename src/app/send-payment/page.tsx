"use client";

import React, { useState } from "react";
import {
  Building2,
  Smartphone,
  ChevronRight,
  Check,
  ArrowLeft,
  Info,
  ShieldCheck,
  SmartphoneNfc
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const recipientTypes = [
  { id: "bank", label: "Bank Transfer", icon: Building2, desc: "Direct to any Kenyan or Ugandan bank account" },
  { id: "mpesa", label: "Safaricom M-Pesa", icon: Smartphone, desc: "Instant mobile money to Kenyan numbers" },
  { id: "mtn", label: "MTN MoMo", icon: SmartphoneNfc, desc: "Instant mobile money to Ugandan numbers" },
];

export default function SendPaymentPage() {
  const [step, setStep] = useState(1);
  const [recipientType, setRecipientType] = useState("");
  const [details, setDetails] = useState({ account: "", name: "", bank: "" });
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("KES");
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSend = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-success/20"
        >
          <Check className="text-white w-10 h-10" />
        </motion.div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Sent Successfully</h1>
        <p className="text-slate-500 mb-8">Transaction Ref: COR-7729-XPK</p>
        <div className="bg-white p-6 rounded-lg border border-border text-left space-y-3 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">Recipient</span>
            <span className="text-slate-900 font-bold">{details.name || "Alex Mwangi"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">Amount</span>
            <span className="text-slate-900 font-bold font-mono">{amount} {currency}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">Settlement</span>
            <span className="text-success font-bold">Instant</span>
          </div>
        </div>
        <button
          onClick={() => { setStep(1); setIsSuccess(false); setRecipientType(""); setDetails({ account: "", name: "", bank: "" }); setAmount(""); }}
          className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all"
        >
          Make Another Payment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Send Cross-Border Payment</h1>
        <p className="text-slate-500 mt-1">Instant corridor settlement between Kenya and Uganda</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-4 mb-10">
        {[1, 2, 3, 4].map((s) => (
          <React.Fragment key={s}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
              step === s ? "bg-primary text-white scale-110" : step > s ? "bg-success text-white" : "bg-white text-slate-400 border border-border"
            )}>
              {step > s ? <Check size={14} /> : s}
            </div>
            {s < 4 && <div className={cn("h-0.5 flex-1 transition-all", step > s ? "bg-success" : "bg-border")} />}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white p-8 rounded-lg border border-border shadow-subtle min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">Select Recipient Type</h2>
              {recipientTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setRecipientType(type.id)}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all cursor-pointer flex items-center gap-4 hover:border-primary/50",
                    recipientType === type.id ? "border-primary bg-primary/5" : "border-border"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    recipientType === type.id ? "bg-primary text-white" : "bg-background-soft text-slate-400"
                  )}>
                    <type.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{type.label}</h3>
                    <p className="text-xs text-slate-500">{type.desc}</p>
                  </div>
                  {recipientType === type.id && <Check className="text-primary" size={20} />}
                </div>
              ))}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">Recipient Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Mwangi"
                    className="w-full p-3 bg-background-soft rounded-lg border border-border focus:ring-2 focus:ring-primary/20"
                    value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                    {recipientType === "bank" ? "Account Number" : "Phone Number"}
                  </label>
                  <input
                    type="text"
                    placeholder={recipientType === "bank" ? "0110...." : "254...."}
                    className="w-full p-3 bg-background-soft rounded-lg border border-border focus:ring-2 focus:ring-primary/20"
                    value={details.account}
                    onChange={(e) => setDetails({ ...details, account: e.target.value })}
                  />
                </div>
                {recipientType === "bank" && (
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Bank Name</label>
                    <select className="w-full p-3 bg-background-soft rounded-lg border border-border focus:ring-2 focus:ring-primary/20">
                      <option>Select Bank</option>
                      <option>KCB Bank</option>
                      <option>Equity Bank</option>
                      <option>Stanbic Bank</option>
                    </select>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary" id="save" />
                  <label htmlFor="save" className="text-xs font-medium text-slate-600">Save recipient for future payments</label>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">Amount & Currency</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Amount</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full p-3 bg-background-soft rounded-lg border border-border text-2xl font-mono font-bold focus:ring-2 focus:ring-primary/20"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="w-32">
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Currency</label>
                    <select
                      className="w-full p-4 bg-background-soft rounded-lg border border-border font-bold"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="KES">KES</option>
                      <option value="UGX">UGX</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-background-soft rounded-lg space-y-3 border border-border">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Transaction Fee</span>
                    <span className="text-slate-900 font-bold">150.00 {currency}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">FX Margin (0.5%)</span>
                    <span className="text-success font-bold">Included</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-border">
                    <span className="text-slate-900 font-bold">Total to be debited</span>
                    <span className="text-slate-900 font-bold font-mono">{(parseFloat(amount || "0") + 150).toFixed(2)} {currency}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <Info size={16} className="text-primary mt-0.5" />
                  <p className="text-[10px] text-primary/80 leading-relaxed font-medium">
                    This payment will be settled via the local liquidity pool. Recipient will receive funds instantly.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">Review & Confirm</h2>
              <div className="bg-background-soft p-6 rounded-lg border border-border space-y-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Recipient</p>
                    <p className="font-bold text-slate-900">{details.name}</p>
                    <p className="text-xs text-slate-500">{recipientType.toUpperCase()} - {details.account}</p>
                  </div>
                  <Building2 className="text-slate-300" />
                </div>
                <div className="flex justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Amount</p>
                    <p className="text-2xl font-mono font-bold text-slate-900">{amount} {currency}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Settlement</p>
                    <p className="text-sm font-bold text-success">Instant</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 justify-center py-4">
                <ShieldCheck size={18} className="text-success" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Encrypted Payment Channel</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-8 flex gap-3">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 py-3 bg-white border border-border text-slate-700 rounded-lg font-bold hover:bg-background-soft transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Back
            </button>
          )}
          <button
            onClick={step === 4 ? handleSend : nextStep}
            disabled={step === 1 && !recipientType}
            className={cn(
              "flex-[2] py-3 bg-primary text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20",
              (step === 1 && !recipientType) ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"
            )}
          >
            {step === 4 ? "Confirm & Send" : "Continue"} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
