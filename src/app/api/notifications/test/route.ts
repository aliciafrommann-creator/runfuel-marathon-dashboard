import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  if (!user || !email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await sendWelcomeEmail(email, user.firstName || "Runner");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Email not configured" }, { status: 503 });
  }
}
