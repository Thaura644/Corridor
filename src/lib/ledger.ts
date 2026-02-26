import { prisma } from './db'

export type Currency = 'KES' | 'UGX' | 'USD'
export type TransactionType = 'PAYMENT' | 'CONVERSION' | 'DEPOSIT' | 'WITHDRAWAL'

export interface LedgerTransaction {
  id: string
  amount: number
  currency: Currency
  type: TransactionType
  status: string
  reference: string
  createdAt: Date
}

export class PersistentLedger {
  /**
   * Get balance for a specific wallet
   */
  static async getBalance(userId: string, currency: Currency): Promise<number> {
    const wallet = await prisma.wallet.findUnique({
      where: {
        userId_currency: { userId, currency },
      },
    })
    return wallet ? Number(wallet.balance) : 0
  }

  /**
   * Ensure wallets exist for a user
   */
  static async ensureWallets(userId: string) {
    const currencies: Currency[] = ['KES', 'UGX', 'USD']
    for (const currency of currencies) {
      await prisma.wallet.upsert({
        where: { userId_currency: { userId, currency } },
        update: {},
        create: { userId, currency, balance: 0 },
      })
    }
  }

  /**
   * Record a double-entry transaction
   */
  static async recordTransaction(params: {
    userId: string
    amount: number
    currency: Currency
    type: TransactionType
    reference: string
    description: string
    metadata?: Record<string, unknown>
  }) {
    const { userId, amount, currency, type, reference, description, metadata } = params

    return await prisma.$transaction(async (tx) => {
      // 1. Get or create the wallet
      const wallet = await tx.wallet.upsert({
        where: { userId_currency: { userId, currency } },
        update: {
          balance: { increment: amount }
        },
        create: {
          userId,
          currency,
          balance: amount,
        },
      })

      // 2. Create the transaction record
      const transaction = await tx.transaction.create({
        data: {
          amount,
          currency,
          type,
          reference,
          status: 'SETTLED',
          metadata: metadata ? JSON.stringify(metadata) : null,
        },
      })

      // 3. Create the ledger entry
      await tx.ledgerEntry.create({
        data: {
          walletId: wallet.id,
          transactionId: transaction.id,
          amount,
          description,
        },
      })

      return transaction
    })
  }

  /**
   * Get transaction history for a user
   */
  static async getHistory(userId: string): Promise<LedgerTransaction[]> {
    const wallets = await prisma.wallet.findMany({
      where: { userId },
      select: { id: true }
    })

    const walletIds = wallets.map(w => w.id)

    const entries = await prisma.ledgerEntry.findMany({
      where: {
        walletId: { in: walletIds }
      },
      include: {
        transaction: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return entries.map(e => ({
      id: e.transaction.id,
      amount: Number(e.amount),
      currency: e.transaction.currency as Currency,
      type: e.transaction.type as TransactionType,
      status: e.transaction.status,
      reference: e.transaction.reference,
      createdAt: e.transaction.createdAt,
    }))
  }
}
