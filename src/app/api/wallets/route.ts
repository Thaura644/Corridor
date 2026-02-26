import { NextResponse } from 'next/server'
import { PersistentLedger } from '@/lib/ledger'
import { getCurrentUserId } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const userId = await getCurrentUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    // Ensure wallets exist
    await PersistentLedger.ensureWallets(userId)

    const wallets = await prisma.wallet.findMany({
      where: { userId }
    })

    return NextResponse.json({
      wallets: wallets.map(w => ({
        currency: w.currency,
        balance: Number(w.balance),
        available: Number(w.balance),
        pending: 0
      }))
    })
  } catch (error) {
    console.error('Wallet fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch wallets' }, { status: 500 })
  }
}
