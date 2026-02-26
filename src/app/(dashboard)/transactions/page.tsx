'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  MoreHorizontal,
  FileText,
  Clock,
  CheckCircle2
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Transaction {
  id: string
  date: string
  corridor: string
  counterparty: string
  currency: string
  amount: number
  fxRate: string
  fee: string
  status: string
  reference: string
  type: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch('/api/transactions')
        const data = await res.json()
        setTransactions(data.transactions || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTransactions()
  }, [])

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transaction Ledger</h1>
          <p className="text-slate-500 text-sm">Full double-entry record of corridor movements.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Advanced Filter
          </Button>
        </div>
      </div>

      <Card className="border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by reference, entity, or amount..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0E4D3A]/10 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white">All Currencies <ChevronDown className="ml-2 h-4 w-4" /></Button>
            <Button variant="outline" size="sm" className="bg-white">Status <ChevronDown className="ml-2 h-4 w-4" /></Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Corridor</th>
                <th className="px-6 py-4">Counterparty</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                [1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={8} className="px-6 py-4"><div className="h-4 bg-slate-50 rounded w-full" /></td>
                  </tr>
                ))
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center text-slate-400">
                     <FileText className="h-10 w-10 mx-auto mb-2 opacity-20" />
                     <p>No transactions found in this period.</p>
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <>
                    <tr
                      key={tx.id}
                      className={`hover:bg-slate-50/50 transition-colors cursor-pointer text-sm ${expandedRow === tx.id ? 'bg-slate-50' : ''}`}
                      onClick={() => setExpandedRow(expandedRow === tx.id ? null : tx.id)}
                    >
                      <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                      <td className="px-6 py-4 font-bold">{tx.corridor}</td>
                      <td className="px-6 py-4">{tx.counterparty}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="font-medium bg-white">{tx.type}</Badge>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold">
                        {tx.amount.toLocaleString()} {tx.currency}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">{tx.reference}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {tx.status === 'Settled' ? (
                            <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
                          ) : (
                            <Clock className="h-4 w-4 text-[#F79009]" />
                          )}
                          <span className={`text-[11px] font-bold uppercase ${tx.status === 'Settled' ? 'text-[#12B76A]' : 'text-[#F79009]'}`}>
                            {tx.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="text-slate-400"><MoreHorizontal className="h-4 w-4" /></Button>
                      </td>
                    </tr>
                    {expandedRow === tx.id && (
                      <tr className="bg-slate-50/50 border-y border-slate-100">
                        <td colSpan={8} className="px-10 py-6">
                          <div className="grid grid-cols-2 gap-12">
                            <div>
                              <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">Double-Entry Breakdown</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-slate-500 font-mono">DR: SME_WALLET_{tx.currency}</span>
                                  <span className="font-bold text-red-600">-{tx.amount} {tx.currency}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-slate-500 font-mono">CR: CORRIDOR_CLEARING_POOL</span>
                                  <span className="font-bold text-green-600">+{tx.amount} {tx.currency}</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                               <div className="flex gap-8">
                                  <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Fee Allocation</p>
                                    <p className="text-sm font-bold text-slate-900">{tx.fee} {tx.currency}</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Network Time</p>
                                    <p className="text-sm font-bold text-slate-900">1.2s (Instant)</p>
                                  </div>
                               </div>
                               <Button variant="outline" size="sm" className="w-full bg-white gap-2 font-bold text-xs">
                                  <Download className="h-3 w-3" /> Download MT940 Reference
                               </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
