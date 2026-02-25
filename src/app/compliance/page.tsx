"use client";

import React from "react";
import {
  ShieldCheck,
  Verified,
  UploadCloud,
  FileText,
  Download,
  Gavel,
  CheckCircle2,
  ExternalLink,
  Activity,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const alerts = [
  { id: 1, type: "High-Freq Transfer", entity: "UG-8829-X (Kampala)", trigger: "Velocity Limit", time: "Today, 14:22 EAT", level: "Danger" },
  { id: 2, type: "Structuring Attempt", entity: "KE-9011-L (Nairobi)", trigger: "Pattern Match", time: "Yesterday, 09:15 EAT", level: "Warning" },
  { id: 3, type: "Cross-Border Spikes", entity: "Regional Aggregator 04", trigger: "Volume Threshold", time: "22 Oct, 18:40 EAT", level: "Info" },
];

export default function CompliancePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary rounded-lg text-white">
                <ShieldCheck size={24} />
             </div>
             <h1 className="text-3xl font-black text-slate-900 tracking-tight">Compliance Center</h1>
          </div>
          <p className="text-slate-500 max-w-2xl leading-relaxed">
            Centralized monitoring of regulatory alignment with <span className="font-semibold text-primary">Central Bank of Kenya (CBK)</span> and <span className="font-semibold text-primary">Bank of Uganda (BoU)</span> standards.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-sm font-bold text-slate-700 hover:bg-background-soft transition-colors shadow-sm">
            <Download size={16} /> Audit Logs
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <FileText size={16} /> View SAR Reports
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KYC Tier Status */}
        <div className="bg-white border border-border rounded-lg p-8 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg text-slate-900">KYC Tier Status</h3>
              <span className="px-3 py-1 bg-success/10 text-success rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Verified size={12} /> Verified
              </span>
            </div>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-lg bg-primary flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-primary/20">
                T3
              </div>
              <div>
                <p className="text-slate-900 font-bold text-xl">Tier 3 (Institutional)</p>
                <p className="text-slate-500 text-sm mt-1">High-limit operational clearance</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-8">
              Your account is at the maximum institutional compliance level. You are authorized to manage multi-entity settlements across East African corridors.
            </p>
          </div>
          <button className="w-full py-4 border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary hover:text-white transition-all">
            Upgrade to Global Tier
          </button>
        </div>

        {/* Document Upload */}
        <div className="bg-white border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center group hover:border-primary transition-colors cursor-pointer shadow-subtle">
          <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
            <UploadCloud size={40} />
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Regulatory Documentation</h3>
          <p className="text-slate-500 text-sm mb-6 max-w-[250px]">Drag and drop business licenses, tax certificates or board resolutions</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["PDF", "JPG", "MAX 20MB"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-background-soft text-slate-500 text-[10px] font-bold rounded uppercase">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* AML Monitoring */}
      <div className="bg-white border border-border rounded-lg overflow-hidden shadow-subtle">
        <div className="border-b border-border px-8 py-5 flex items-center justify-between bg-background-soft/30">
          <div className="flex items-center gap-2">
            <Activity className="text-primary w-5 h-5" />
            <h3 className="font-bold text-lg text-slate-900">AML Real-time Monitoring</h3>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Feed: CBK-AF-092</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {/* Risk Score */}
          <div className="p-8 border-r border-border flex flex-col items-center justify-center bg-background-soft/20">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Risk Score</p>
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle className="text-slate-100" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                <circle className="text-primary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="310" strokeWidth="10" strokeLinecap="round"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-4xl font-bold text-primary">14</span>
                <span className="text-[10px] font-bold text-success uppercase mt-1">Low Risk</span>
              </div>
            </div>
            <p className="mt-8 text-xs text-center text-slate-500 leading-relaxed font-medium">
              Score calculated based on 1,240 transaction vectors over last 30 days.
            </p>
          </div>
          {/* Alerts */}
          <div className="lg:col-span-3">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-background-soft/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-border">
                    <th className="px-8 py-4">Alert Type</th>
                    <th className="px-8 py-4">Entity / Account</th>
                    <th className="px-8 py-4">Flag Trigger</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {alerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-background-soft/30 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            alert.level === "Danger" ? "bg-danger" : alert.level === "Warning" ? "bg-warning" : "bg-primary"
                          )} />
                          <div>
                            <p className="text-sm font-bold text-slate-900">{alert.type}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{alert.time}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-mono text-slate-600 font-medium">{alert.entity}</td>
                      <td className="px-8 py-5">
                        <span className={cn(
                          "px-2 py-0.5 text-[10px] font-bold rounded border uppercase",
                          alert.level === "Danger" ? "bg-danger/5 text-danger border-danger/10" : "bg-warning/5 text-warning border-warning/10"
                        )}>
                          {alert.trigger}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="text-primary text-xs font-bold hover:underline inline-flex items-center gap-1">
                          Review <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-background-soft/30 text-center">
              <button className="text-[10px] font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2 mx-auto">
                Show all historical alerts <ExternalLink size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Regulator Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Gavel, label: "BoU Compliance", desc: "Updated AML Circular No. 2/2024 active. All reporting compliant." },
          { icon: CheckCircle2, label: "CBK Standards", desc: "Tier 3 Audit completed Sept 30. No pending rectifications." },
          { icon: FileText, label: "SAR Status", desc: "Next quarterly reporting due in 14 days to FIU Kenya." },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <item.icon className="text-primary w-6 h-6 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-slate-900">{item.label}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
