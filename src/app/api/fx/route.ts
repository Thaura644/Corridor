import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    pairs: [
      { pair: "KES/UGX", rate: 31.24, spread: 0.005, trend: "up" },
      { pair: "USD/KES", rate: 129.50, spread: 0.008, trend: "down" },
      { pair: "USD/UGX", rate: 3850.00, spread: 0.01, trend: "up" },
      { pair: "USD/NGN", rate: 1650.00, spread: 0.02, trend: "up" },
      { pair: "USD/ZAR", rate: 18.45, spread: 0.005, trend: "down" },
      { pair: "NGN/KES", rate: 0.078, spread: 0.015, trend: "up" },
      { pair: "ZAR/KES", rate: 7.02, spread: 0.01, trend: "up" },
    ],
    timestamp: new Date().toISOString(),
  });
}
