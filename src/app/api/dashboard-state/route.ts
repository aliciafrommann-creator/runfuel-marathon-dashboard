import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getDashboardState, saveDashboardState } from "@/lib/state-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const record = await getDashboardState(userId);
    return NextResponse.json(record || { state: null });
  } catch (error) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body?.state || typeof body.state !== "object") {
    return NextResponse.json({ error: "Invalid dashboard state" }, { status: 400 });
  }

  try {
    await saveDashboardState(userId, body.state);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }
}
