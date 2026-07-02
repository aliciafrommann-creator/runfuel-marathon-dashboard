import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { sendWelcomeEmail } from "@/lib/email";

type ClerkEmailAddress = {
  id: string;
  email_address: string;
};

type ClerkUserCreatedEvent = {
  type: "user.created";
  data: {
    first_name?: string | null;
    primary_email_address_id?: string | null;
    email_addresses?: ClerkEmailAddress[];
  };
};

type ClerkEvent = ClerkUserCreatedEvent | { type: string; data: unknown };

function isUserCreatedEvent(event: ClerkEvent): event is ClerkUserCreatedEvent {
  return event.type === "user.created" && typeof event.data === "object" && event.data !== null;
}

export async function POST(request: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "CLERK_WEBHOOK_SECRET is not configured" }, { status: 503 });
  }

  const payload = await request.text();
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
  }

  let event: ClerkEvent;
  try {
    event = new Webhook(webhookSecret).verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature
    }) as ClerkEvent;
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (isUserCreatedEvent(event)) {
    const primaryEmail = event.data.email_addresses?.find(
      email => email.id === event.data.primary_email_address_id
    )?.email_address || event.data.email_addresses?.[0]?.email_address;

    if (primaryEmail) {
      await sendWelcomeEmail(primaryEmail, event.data.first_name || "Runner").catch(() => undefined);
    }
  }

  return NextResponse.json({ received: true });
}
