import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResend() {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export async function sendWelcomeEmail(to: string, name = "Runner") {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const from = process.env.RESEND_FROM_EMAIL || "RunFuel <onboarding@resend.dev>";

  await getResend().emails.send({
    from,
    to,
    subject: "Willkommen bei RunFuel",
    html: `
      <div style="font-family:Arial,sans-serif;background:#dfe5eb;padding:32px;">
        <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;padding:24px;border:1px solid #c3cbd3;">
          <p style="color:#f47a98;font-weight:800;text-transform:uppercase;margin:0 0 8px;">RunFuel</p>
          <h1 style="font-size:34px;line-height:1;margin:0 0 16px;text-transform:uppercase;">Willkommen, ${escapeHtml(name)}</h1>
          <p style="color:#46515c;font-size:16px;line-height:1.5;">
            Dein Marathon Dashboard ist bereit. Du kannst dich einloggen, deinen Plan bearbeiten,
            Einheiten verschieben und deine Daten in deinem Account speichern.
          </p>
          <p>
            <a href="${appUrl}/dashboard" style="display:inline-block;background:#0477d9;color:white;text-decoration:none;padding:12px 16px;border-radius:8px;font-weight:800;text-transform:uppercase;">Dashboard öffnen</a>
          </p>
        </div>
      </div>
    `
  });
}

function escapeHtml(value: string) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
