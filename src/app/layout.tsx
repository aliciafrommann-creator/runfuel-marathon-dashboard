import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RunFuel Marathon Dashboard",
  description: "Personalisiertes Marathon-Training mit Login, Cloud-Speicherung und E-Mail-Benachrichtigungen."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="de">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
