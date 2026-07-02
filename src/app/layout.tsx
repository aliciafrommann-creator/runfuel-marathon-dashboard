import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Runnies Marathon Dashboard",
  description: "Marathon-Training, Kraft, Fueling und Nutrition als browserbasiertes Dashboard."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
