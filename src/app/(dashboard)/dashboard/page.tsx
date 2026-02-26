'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  TrendingUp,
  Wallet as WalletIcon,
  ChevronRight
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { motion } from 'framer-motion'

interface Wallet {
  currency: string
  balance: number
  available: number
  pending: number
}

interface Transaction {
  id: string
  date: string
  currency: string
  amount: number
  type: string
  status: string
  reference: string
}

const data = [
  { name: 'Mon', inflow: 4000, outflow: 2400 },
  { name: 'Tue', inflow: 3000, outflow: 1398 },
  { name: 'Wed', inflow: 2000, outflow: 9800 },
  { name: 'Thu', inflow: 2780, outflow: 3908 },
  { name: 'Fri', inflow: 1890, outflow: 4800 },
  { name: 'Sat', inflow: 2390, outflow: 3800 },
  { name: 'Sun', inflow: 3490, outflow: 4300 },
]

export default function DashboardPage() {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [wRes, tRes] = await Promise.all([
          fetch('/api/wallets'),
          fetch('/api/transactions')
        ])
        const wData = await wRes.json()
        const tData = await tRes.json()
        setWallets(wData.wallets || [])
        setTransactions((tData.transactions || []).slice(0, 5))
      } catch (err) {
        console.error('Failed to fetch dashboard data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="space-y-8 p-8">
      {/* Welcome Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pan-African Treasury Dashboard</h1>
          <p className="text-slate-500 mt-1">Regional Liquidity & Infrastructure Control</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" /> Sync ERP
          </Button>
          <Button size="sm" className="bg-[#0E4D3A] hover:bg-[#0E4D3A]/90 gap-2">
            Download 7D Report
          </Button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-40 bg-slate-100 animate-pulse rounded-xl" />)
        ) : (
          <>
            {wallets.map((wallet) => (
              <motion.div
                key={wallet.currency}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6 border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <WalletIcon className="h-12 w-12 text-[#0E4D3A]" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">{wallet.currency} Wallet</p>
                  <h3 className="text-2xl font-bold mt-2 font-mono">
                    {wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </h3>
                  <div className="flex gap-4 mt-6">
                    <Button variant="ghost" size="sm" className="text-[#0E4D3A] font-bold p-0 hover:bg-transparent h-auto">Send</Button>
                    <Button variant="ghost" size="sm" className="text-[#0E4D3A] font-bold p-0 hover:bg-transparent h-auto">Convert</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
            <Card className="p-6 bg-[#0B1F33] text-white border-none shadow-lg">
              <p className="text-sm font-medium text-slate-400">Total Regional Exposure</p>
              <h3 className="text-2xl font-bold mt-2 font-mono">$1,240,050.12</h3>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#12B76A]" />
                <span className="text-[#12B76A] text-sm font-bold">+2.4% vs yesterday</span>
              </div>
            </Card>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cashflow Graph */}
        <Card className="p-6 border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg text-slate-900">Regional Cashflow</h3>
            <div className="flex bg-slate-50 p-1 rounded-lg">
              {['7D', '30D', '90D'].map(t => (
                <button key={t} className={`px-3 py-1 text-xs font-bold rounded-md ${t === '7D' ? 'bg-white shadow-sm text-[#0E4D3A]' : 'text-slate-500'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0E4D3A" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0E4D3A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="inflow" stroke="#0E4D3A" strokeWidth={2} fillOpacity={1} fill="url(#colorIn)" />
                <Area type="monotone" dataKey="outflow" stroke="#C9A227" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6 border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900">Regional Activity</h3>
            <Button variant="ghost" size="sm" className="text-[#0E4D3A] font-bold gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {loading ? (
              [1, 2, 3, 4, 5].map(i => <div key={i} className="h-12 bg-slate-50 animate-pulse rounded-lg" />)
            ) : transactions.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                  <RefreshCw className="h-10 w-10 mb-2 opacity-20" />
                  <p>No recent activity detected</p>
               </div>
            ) : (
              transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${tx.amount < 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {tx.amount < 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{tx.type}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-mono">{tx.reference}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${tx.amount < 0 ? 'text-slate-900' : 'text-[#12B76A]'}`}>
                      {tx.amount < 0 ? '-' : '+'}{Math.abs(tx.amount).toLocaleString()} {tx.currency}
                    </p>
                    <p className="text-[10px] text-slate-500">{tx.date}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
