# RunFuel Hosted App Setup

Diese Version macht aus dem lokalen HTML-Dashboard eine gehostete Next.js-App mit:

- Clerk Login und Account Creation
- geschützter `/dashboard` Route
- Cloud-Speicherung pro User über Neon Postgres
- Welcome-Mail und Test-Mail über Resend
- bestehendem Dashboard-Core unter `/dashboard-static/lissabon-marathon-dashboard.html`

## 1. Lokale Variablen

Kopiere `.env.example` nach `.env.local` und fülle die Werte.

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
DATABASE_URL=
RESEND_API_KEY=
RESEND_FROM_EMAIL=RunFuel <onboarding@resend.dev>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 2. Vercel Integrationen

Empfohlen über Vercel Marketplace:

- Clerk für Login/Signup und Passwort-Handling
- Neon für `DATABASE_URL`
- Resend für Mailversand

Die Passwörter werden nicht in dieser App gespeichert. Clerk übernimmt Account Creation, Login, Passwort-Reset und Session Security.

## 3. Clerk Webhook

In Clerk einen Webhook auf diese Route setzen:

```text
https://deine-domain.de/api/webhooks/clerk
```

Event:

```text
user.created
```

Den Secret-Wert als `CLERK_WEBHOOK_SECRET` in Vercel setzen.

## 4. Datenmodell

Die App legt beim ersten Zugriff automatisch diese Tabelle an:

```sql
CREATE TABLE IF NOT EXISTS dashboard_states (
  user_id text PRIMARY KEY,
  state jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

Gespeichert wird der bestehende Dashboard-State als JSON pro Clerk User.

## 5. Deployment

Wenn alle Variablen gesetzt sind:

```bash
pnpm install
pnpm build
vercel deploy
vercel deploy --prod
```

Oder über GitHub mit Vercel Git Integration deployen.

## 6. Noch offen für SaaS-Qualität

- Account Settings und Billing
- explizites Save/Sync UI im Dashboard
- echte E-Mail-Einstellungen pro User
- Datenschutz/Impressum/AGB
- Admin-Ansicht
- sauberer Import alter lokaler Daten in den Account
