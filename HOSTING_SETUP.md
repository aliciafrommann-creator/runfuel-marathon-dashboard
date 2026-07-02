# Runnies Hosting Setup

Diese Version ist eine öffentliche No-Login-Webapp.

## Speicherung

- Es sind keine API Keys erforderlich.
- Es ist keine Clerk-, Supabase- oder Neon-Verbindung erforderlich.
- Alle Eingaben werden im Browser der jeweiligen Person gespeichert (`localStorage`).
- Wenn eine Person die App auf einem anderen Gerät oder in einem anderen Browser öffnet, sind die Daten dort separat.
- JSON-Backups bleiben deshalb wichtig, wenn Daten zwischen Geräten übertragen werden sollen.

## Vercel

1. GitHub-Repo in Vercel importieren.
2. Root Directory: `./`
3. Build Command: automatisch `npm run build`
4. Domain: z.B. `runnies.vercel.app`
5. Deployment Protection ausschalten, wenn Freunde ohne Vercel-Login testen sollen.

## Später optional

Für eine Account-Version können wieder ergänzt werden:

- Clerk für Login und Account Creation
- Neon oder Supabase für Cloud-Speicherung
- Resend für E-Mails
- Stripe für Verkauf oder Subscriptions
