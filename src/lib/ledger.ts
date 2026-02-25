export type Currency = "KES" | "UGX" | "USD";

export interface Account {
  id: string;
  name: string;
  type: "asset" | "liability" | "equity" | "revenue" | "expense";
  currency: Currency;
  balance: number;
}

export interface Entry {
  accountId: string;
  debit: number;
  credit: number;
}

export interface Transaction {
  id: string;
  timestamp: Date;
  description: string;
  entries: Entry[];
  reference?: string;
}

export class Ledger {
  private accounts: Map<string, Account> = new Map();
  private transactions: Transaction[] = [];

  constructor() {
    this.createAccount({ id: "kes_vault", name: "Kenya Liquidity Pool", type: "asset", currency: "KES", balance: 142500000 });
    this.createAccount({ id: "ugx_vault", name: "Uganda Liquidity Pool", type: "asset", currency: "UGX", balance: 3850200000 });
    this.createAccount({ id: "kes_customer_1", name: "Alex Mwangi Wallet", type: "liability", currency: "KES", balance: 15000 });
    this.createAccount({ id: "ugx_customer_2", name: "Kampala Agri-Hub", type: "liability", currency: "UGX", balance: 2400000 });
    this.createAccount({ id: "fx_revenue", name: "FX Spread Revenue", type: "revenue", currency: "USD", balance: 0 });
  }

  createAccount(account: Account) {
    this.accounts.set(account.id, account);
  }

  getAccount(id: string): Account | undefined {
    return this.accounts.get(id);
  }

  recordTransaction(description: string, entries: Entry[], reference?: string): string {
    const txId = `TX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const transaction: Transaction = {
      id: txId,
      timestamp: new Date(),
      description,
      entries,
      reference
    };

    for (const entry of entries) {
      const account = this.accounts.get(entry.accountId);
      if (!account) throw new Error(`Account ${entry.accountId} not found`);

      if (account.type === "asset" || account.type === "expense") {
        account.balance += entry.debit - entry.credit;
      } else {
        account.balance += entry.credit - entry.debit;
      }
    }

    this.transactions.push(transaction);
    return txId;
  }

  getTransactions() {
    return this.transactions;
  }
}

export const corridorLedger = new Ledger();
