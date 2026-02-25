import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    pairs: [
      { pair: "KES/UGX", rate: 31.24, spread: 0.005, trend: "up" },
      { pair: "USD/KES", rate: 129.50, spread: 0.008, trend: "down" },
      { pair: "USD/UGX", rate: 3850.00, spread: 0.01, trend: "up" },
    ],
    timestamp: new Date().toISOString(),
  });
}
