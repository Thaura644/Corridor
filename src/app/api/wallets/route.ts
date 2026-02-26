import { NextResponse } from 'next/server'
import { PersistentLedger } from '@/lib/ledger'
import { getCurrentUserId } from '@/lib/auth'

export async function GET() {
  const userId = await getCurrentUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    // Ensure wallets exist
    await PersistentLedger.ensureWallets(userId)

    const kes = await PersistentLedger.getBalance(userId, 'KES')
    const ugx = await PersistentLedger.getBalance(userId, 'UGX')
    const usd = await PersistentLedger.getBalance(userId, 'USD')

    return NextResponse.json({
      wallets: [
        { currency: 'KES', balance: kes, available: kes, pending: 0 },
        { currency: 'UGX', balance: ugx, available: ugx, pending: 0 },
        { currency: 'USD', balance: usd, available: usd, pending: 0 },
      ]
    })
  } catch (error) {
    console.error('Wallet fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch wallets' }, { status: 500 })
  }
}
