import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: false,
    mode: "local-browser-storage",
    message: "Notifications are disabled in the no-login version."
  });
}
