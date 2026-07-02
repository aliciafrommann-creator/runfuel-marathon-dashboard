import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    state: null,
    mode: "local-browser-storage"
  });
}

export async function PUT() {
  return NextResponse.json({
    ok: true,
    mode: "local-browser-storage"
  });
}
