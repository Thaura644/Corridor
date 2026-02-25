import { NextResponse } from "next/server";
import { corridorLedger } from "@/lib/ledger";
import { z } from "zod";

const paymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.enum(["KES", "UGX", "USD"]),
  recipientType: z.enum(["bank", "mpesa", "mtn"]),
  recipientDetails: z.object({
    name: z.string().min(1),
    account: z.string().min(1),
    bank: z.string().optional(),
  }),
  senderAccountId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = paymentSchema.parse(json);

    const { amount, currency, recipientType, recipientDetails, senderAccountId } = body;

    const txId = corridorLedger.recordTransaction(
      `Payout to ${recipientDetails.name} via ${recipientType}`,
      [
        { accountId: senderAccountId || "kes_customer_1", debit: amount, credit: 0 },
        { accountId: currency === "KES" ? "kes_vault" : "ugx_vault", debit: 0, credit: amount },
      ],
      `REF-${Date.now()}`
    );

    return NextResponse.json({
      success: true,
      transactionId: txId,
      status: "Settled",
      estimatedArrival: "Instant"
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.flatten() }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
