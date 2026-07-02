import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <main className="landing">
      <section className="page-shell hero">
        <div>
          <p className="eyebrow">RunFuel</p>
          <h1>Marathon Dashboard</h1>
          <p>
            Dein Trainingsplan als geschützte Webapp: Account erstellen, einloggen,
            Dashboard speichern, Kalender exportieren und E-Mail-Benachrichtigungen vorbereiten.
          </p>
          <div className="actions">
            <Link className="button-link primary" href="/sign-up">
              Account erstellen
            </Link>
            <Link className="button-link" href="/sign-in">
              Einloggen
            </Link>
          </div>
        </div>
        <aside className="hero-card">
          <p className="eyebrow">Hosted Version</p>
          <p>
            Passwörter laufen über Clerk. Deine Trainingsdaten werden pro Account
            über die geschützte API gespeichert, sobald die Datenbank verbunden ist.
          </p>
        </aside>
      </section>
    </main>
  );
}
