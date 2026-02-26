'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Plus,
  ArrowUpRight,
  Search,
  Filter,
  MoreVertical,
  ShieldCheck,
  Download
} from 'lucide-react'

interface Wallet {
  currency: string
  balance: number
  available: number
  pending: number
}

export default function WalletsPage() {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWallets() {
      try {
        const res = await fetch('/api/wallets')
        const data = await res.json()
        setWallets(data.wallets || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchWallets()
  }, [])

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Wallet Infrastructure</h1>
          <p className="text-slate-500 mt-1">Manage institutional liquidity pools across corridors.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Statements
          </Button>
          <Button className="bg-[#0E4D3A] hover:bg-[#0E4D3A]/90 gap-2">
            <Plus className="h-4 w-4" /> Add Funding Source
          </Button>
        </div>
      </div>

      {/* Main Wallet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-64 bg-slate-50 animate-pulse rounded-2xl" />)
        ) : (
          wallets.map((wallet) => (
            <Card key={wallet.currency} className="overflow-hidden border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="p-6 bg-[#0E4D3A] text-white">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{wallet.currency}</span>
                    <ShieldCheck className="h-4 w-4 text-[#12B76A]" />
                  </div>
                  <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/10">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-white/60 text-sm">Available Balance</p>
                <h2 className="text-3xl font-bold font-mono mt-1">
                  {wallet.available.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Pending Settlements</span>
                  <span className="font-mono text-slate-900 font-bold">{wallet.pending.toLocaleString()} {wallet.currency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Reserved Liquidity</span>
                  <span className="font-mono text-slate-900 font-bold">0.00 {wallet.currency}</span>
                </div>
                <div className="pt-4 flex gap-3">
                  <Button variant="outline" className="flex-1 gap-2 text-xs font-bold border-slate-200">
                    <Plus className="h-3 w-3" /> Top Up
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2 text-xs font-bold border-slate-200">
                    <ArrowUpRight className="h-3 w-3" /> Withdraw
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* History & Controls */}
      <Card className="border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Recent Wallet Movement</h3>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search movements..."
                className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0E4D3A]/10 outline-none w-64"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>
        <div className="p-0">
           <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-50">
                  <th className="px-6 py-3">Movement ID</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Source/Dest</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50/50 text-sm">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">MV-882193</td>
                  <td className="px-6 py-4 font-bold text-slate-900">M-Pesa Topup</td>
                  <td className="px-6 py-4 text-slate-500">254712****34</td>
                  <td className="px-6 py-4 font-mono font-bold text-[#12B76A]">+50,000.00 KES</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold">Settled</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 text-sm">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">MV-882194</td>
                  <td className="px-6 py-4 font-bold text-slate-900">MTN MoMo Payout</td>
                  <td className="px-6 py-4 text-slate-500">256772****90</td>
                  <td className="px-6 py-4 font-mono font-bold text-red-600">-1,200,000.00 UGX</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold">In Transit</span>
                  </td>
                </tr>
              </tbody>
           </table>
        </div>
      </Card>
    </div>
  )
}
