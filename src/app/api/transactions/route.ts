import { NextResponse } from 'next/server'
import { PersistentLedger } from '@/lib/ledger'
import { getCurrentUserId } from '@/lib/auth'

export async function GET() {
  const userId = await getCurrentUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const history = await PersistentLedger.getHistory(userId)

    // Format for the frontend table
    const transactions = history.map(tx => ({
      id: tx.id,
      date: tx.createdAt.toISOString().split('T')[0],
      corridor: tx.currency === 'KES' ? '🇰🇪 KE' : '🇺🇬 UG',
      counterparty: 'SME Treasury', // Simplified
      currency: tx.currency,
      amount: Math.abs(tx.amount),
      fxRate: '-',
      fee: '0.00',
      status: tx.status === 'SETTLED' ? 'Settled' : 'Pending',
      reference: tx.reference,
      type: tx.amount < 0 ? 'Debit' : 'Credit'
    }))

    return NextResponse.json({ transactions })
  } catch (error) {
    console.error('Transactions fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
  }
}
