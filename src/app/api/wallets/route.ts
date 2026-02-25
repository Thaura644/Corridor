import { NextResponse } from "next/server";
import { corridorLedger } from "@/lib/ledger";

export async function GET() {
  const accounts = [
    corridorLedger.getAccount("kes_customer_1"),
    corridorLedger.getAccount("ugx_customer_2"),
  ];
  return NextResponse.json(accounts);
}
