"use client";

import React, { useState } from "react";
import {
  Building,
  Users,
  Key,
  Webhook,
  Shield,
  Bell,
  Globe,
  Lock,
  Plus,
  Trash2,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { id: "profile", label: "Company Profile", icon: Building },
  { id: "team", label: "Team Members", icon: Users },
  { id: "api", label: "API Keys", icon: Key },
  { id: "webhooks", label: "Webhooks", icon: Webhook },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "expansion", label: "Corridor Expansion", icon: Globe, comingSoon: true },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your institutional corridor configuration</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.comingSoon && setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg text-sm font-bold transition-all",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-primary/10"
                  : "text-slate-500 hover:bg-background-soft",
                tab.comingSoon && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-3">
                <tab.icon size={18} />
                {tab.label}
              </div>
              {tab.comingSoon && <span className="text-[8px] px-1.5 py-0.5 bg-slate-100 text-slate-400 rounded">Soon</span>}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-lg border border-border shadow-subtle overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-8 space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-900">General Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Entity Name</label>
                        <input type="text" defaultValue="Corridor Logistics Ltd" className="w-full p-2.5 bg-background-soft rounded border border-border text-sm font-bold text-slate-700" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Tax ID (PIN)</label>
                        <input type="text" defaultValue="P051234567A" className="w-full p-2.5 bg-background-soft rounded border border-border text-sm font-mono text-slate-700" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-900">Contact Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Headquarters</label>
                        <input type="text" defaultValue="Westlands, Nairobi, KE" className="w-full p-2.5 bg-background-soft rounded border border-border text-sm font-bold text-slate-700" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Support Email</label>
                        <input type="email" defaultValue="treasury@corridor.logistics" className="w-full p-2.5 bg-background-soft rounded border border-border text-sm font-bold text-slate-700" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-border flex justify-end">
                  <button className="px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm">Save Changes</button>
                </div>
              </motion.div>
            )}

            {activeTab === "api" && (
              <motion.div
                key="api"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 space-y-8"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900">API Access Keys</h3>
                    <p className="text-xs text-slate-500 mt-1">Manage keys for ERP and custom integrations</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold">
                    <Plus size={16} /> Create New Key
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "ERP Integration", key: "pk_live_********************8821", lastUsed: "2 mins ago" },
                    { name: "Mobile App Backend", key: "pk_live_********************YLM", lastUsed: "14 Oct 2023" },
                  ].map((key, i) => (
                    <div key={i} className="p-4 bg-background-soft rounded-lg border border-border flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded border border-border">
                          <Key size={18} className="text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{key.name}</p>
                          <p className="text-xs font-mono text-slate-500 mt-1">{key.key}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-400">Last used: {key.lastUsed}</span>
                        <button className="p-2 text-slate-400 hover:text-danger transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-primary/5 rounded-lg border border-primary/10 flex items-start gap-4">
                   <Lock className="text-primary mt-1" size={20} />
                   <div>
                     <h4 className="font-bold text-sm text-slate-900">Regulator Audit Mode</h4>
                     <p className="text-xs text-slate-500 leading-relaxed mt-1">
                       Enable read-only API access for Central Bank auditors. This token expires automatically after 24 hours.
                     </p>
                     <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold">Generate Auditor Token</button>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 space-y-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-background-soft rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white rounded border border-border text-primary"><Shield size={20} /></div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Two-Factor Authentication (2FA)</p>
                        <p className="text-xs text-slate-500">Required for all institutional payouts</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Clock size={18} className="text-slate-400" /> Recent Security Activity
                    </h3>
                    <div className="space-y-4">
                      {[
                        { event: "Login from New IP", location: "Nairobi, KE", time: "10 mins ago", status: "Verified" },
                        { event: "API Key Created", location: "System Console", time: "2 hours ago", status: "Success" },
                        { event: "Failed Login Attempt", location: "Kampala, UG", time: "5 hours ago", status: "Blocked" },
                      ].map((activity, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                          <div className="flex items-center gap-4">
                             <div className={cn(
                               "w-2 h-2 rounded-full",
                               activity.status === "Blocked" ? "bg-danger" : "bg-success"
                             )} />
                             <div>
                               <p className="text-sm font-bold text-slate-900">{activity.event}</p>
                               <p className="text-[10px] text-slate-500 font-medium">{activity.location} • {activity.time}</p>
                             </div>
                          </div>
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-1 rounded",
                            activity.status === "Verified" ? "bg-success/10 text-success" :
                            activity.status === "Blocked" ? "bg-danger/10 text-danger" : "bg-slate-100 text-slate-500"
                          )}>{activity.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
