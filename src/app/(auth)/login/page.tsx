"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Mail, Lock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors">
        <ArrowLeft size={18} /> Back to Site
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#0E4D3A] rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-6 shadow-xl shadow-[#0E4D3A]/20">
            C
          </div>
          <h1 className="text-3xl font-black text-slate-900">Institutional Login</h1>
          <p className="text-slate-500 mt-2">Access your corridor treasury dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-lg border border-red-100 flex items-center gap-2">
                 <ShieldCheck size={14} /> {error}
              </div>
            )}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>
              <div className="flex justify-end mt-2">
                <button type="button" className="text-[10px] font-bold text-primary uppercase hover:underline">Forgot password?</button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0E4D3A] text-white py-4 rounded-xl font-bold flex items-center justify-center shadow-lg shadow-[#0E4D3A]/20 hover:bg-[#0E4D3A]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign In"}
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold text-slate-400">
              <span className="bg-white px-4 tracking-widest">Regulated by CBK & BoU</span>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500">
            New institutional client? <Link href="/signup" className="text-primary font-bold hover:underline">Apply for access</Link>
          </p>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Bank-grade 256-bit encryption</span>
        </div>
      </motion.div>
    </div>
  );
}
