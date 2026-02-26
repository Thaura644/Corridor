import { NextResponse } from 'next/server'
import { PersistentLedger } from '@/lib/ledger'
import { getCurrentUserId } from '@/lib/auth'
import { z } from 'zod'

const paymentSchema = z.object({
  recipient: z.string().min(1),
  amount: z.number().positive(),
  currency: z.enum(['KES', 'UGX']),
  type: z.enum(['MPESA', 'MTN', 'BANK']),
})

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const validatedData = paymentSchema.parse(body)

    // Record the debit
    const tx = await PersistentLedger.recordTransaction({
      userId,
      amount: -validatedData.amount,
      currency: validatedData.currency,
      type: 'PAYMENT',
      reference: `PAY-${Math.random().toString(36).substring(7).toUpperCase()}`,
      description: `Payment to ${validatedData.recipient} via ${validatedData.type}`,
      metadata: { recipient: validatedData.recipient, method: validatedData.type }
    })

    return NextResponse.json({
      success: true,
      transactionId: tx.id,
      reference: tx.reference,
      status: 'SETTLED'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Payment error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
