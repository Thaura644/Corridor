"use client";

import React from "react";
import { Key, ShieldCheck, Terminal, Copy, Plus, Trash2, Lock } from "lucide-react";

const apiKeys = [
  { id: "1", name: "Main ERP Production", key: "pk_live_********************8821", type: "Full Access", created: "12 Oct 2023" },
  { id: "2", name: "Mobile App Client", key: "pk_live_********************YLM", type: "Read Only", created: "14 Oct 2023" },
];

export default function ApiAccessPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">API Infrastructure</h1>
          <p className="text-slate-500 mt-1">Direct corridor ledger integration for developers</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/20">
          <Plus size={20} />
          Generate API Key
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-lg border border-border shadow-subtle overflow-hidden">
              <div className="px-8 py-5 border-b border-border bg-background-soft/30">
                 <h3 className="font-bold text-slate-900">Active API Keys</h3>
              </div>
              <div className="divide-y divide-border">
                 {apiKeys.map((key) => (
                    <div key={key.id} className="p-6 flex items-center justify-between group hover:bg-background-soft/30 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/5 rounded-lg text-primary group-hover:scale-110 transition-transform">
                             <Key size={24} />
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-900">{key.name}</p>
                             <p className="text-xs font-mono text-slate-500 mt-1">{key.key}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase">{key.type}</span>
                          <div className="flex items-center gap-1">
                             <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Copy size={16} /></button>
                             <button className="p-2 text-slate-400 hover:text-danger transition-colors"><Trash2 size={16} /></button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-lg border border-border shadow-subtle overflow-hidden">
              <div className="px-8 py-5 border-b border-border flex items-center gap-2">
                 <Terminal size={18} className="text-primary" />
                 <h3 className="font-bold text-slate-900">Developer Quickstart</h3>
              </div>
              <div className="p-8 bg-slate-900 text-white font-mono text-xs space-y-4 overflow-x-auto">
                 <p className="text-slate-500">{"// Fetch live corridor rates"}</p>
                 <p>curl -X GET https://api.corridor.io/v1/fx/rates \</p>
                 <p className="ml-4">-H &quot;Authorization: Bearer YOUR_API_KEY&quot; \</p>
                 <p className="ml-4">-H &quot;X-Corridor-ID: KE-UG-001&quot;</p>
                 <div className="pt-4 border-t border-slate-800">
                    <p className="text-slate-500">{"// Initiate instant settlement"}</p>
                    <p>{"{"}</p>
                    <p className="ml-4">&quot;amount&quot;: 150000,</p>
                    <p className="ml-4">&quot;currency&quot;: &quot;KES&quot;,</p>
                    <p className="ml-4">&quot;recipient_id&quot;: &quot;MPESA_254...&quot;</p>
                    <p>{"}"}</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-primary/5 border border-primary/10 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                 <ShieldCheck className="text-primary" size={20} />
                 <h3 className="font-bold text-slate-900">Security Guard</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">Restrict API access to specific CIDR ranges and enable automatic key rotation.</p>
              <button className="w-full py-2.5 bg-white border border-border rounded-lg text-xs font-bold text-slate-700">Configure IP Whitelist</button>
           </div>

           <div className="bg-white border border-border p-6 rounded-lg shadow-subtle">
              <div className="flex items-center gap-2 mb-4 text-warning">
                 <Lock size={20} />
                 <h3 className="font-bold text-slate-900 text-sm">Sandbox Mode</h3>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed mb-6">Test your integration against our virtual corridor rails without real fund movement.</p>
              <div className="flex items-center justify-between p-3 bg-background-soft rounded border border-border">
                 <span className="text-[10px] font-bold text-slate-700 uppercase">Enable Sandbox</span>
                 <div className="w-8 h-4 bg-slate-200 rounded-full relative">
                    <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
