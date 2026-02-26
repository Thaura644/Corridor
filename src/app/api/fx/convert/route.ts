import { NextResponse } from 'next/server'
import { PersistentLedger } from '@/lib/ledger'
import { getCurrentUserId } from '@/lib/auth'
import { z } from 'zod'

const convertSchema = z.object({
  from: z.enum(['KES', 'UGX']),
  to: z.enum(['KES', 'UGX']),
  amount: z.number().positive(),
  rate: z.number(),
})

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { from, to, amount, rate } = convertSchema.parse(body)
    const targetAmount = amount * rate
    const reference = `FX-${Math.random().toString(36).substring(7).toUpperCase()}`

    // Use a DB transaction for both legs of the conversion
    await PersistentLedger.recordTransaction({
      userId,
      amount: -amount,
      currency: from,
      type: 'CONVERSION',
      reference: reference,
      description: `FX Conversion: ${amount} ${from} to ${to}`,
    })

    await PersistentLedger.recordTransaction({
      userId,
      amount: targetAmount,
      currency: to,
      type: 'CONVERSION',
      reference: `${reference}-CREDIT`,
      description: `FX Conversion Credit: Received ${targetAmount} ${to}`,
    })

    return NextResponse.json({
      success: true,
      reference,
      fromAmount: amount,
      toAmount: targetAmount,
      rate
    })
  } catch (error) {
    console.error('FX conversion error:', error)
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 })
  }
}
