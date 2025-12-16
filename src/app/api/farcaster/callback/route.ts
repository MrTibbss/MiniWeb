import { NextResponse } from "next/server";

// Placeholder endpoint to capture Neynar connect redirect codes.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  return NextResponse.json({
    ok: true,
    code,
    state,
    note: "Exchange this code server-side via Neynar's API to finalize the Farcaster connect flow."
  });
}
