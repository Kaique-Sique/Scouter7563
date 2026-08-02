/**
 * Root layout — wraps every route in the app.
 *
 * Pulls in the global stylesheet once here (Tailwind + custom theme
 * vars/animations, see globals.css) and wraps all page content in
 * `AppLayout`, which owns the persistent sidebar + header chrome.
 */
import type { Metadata } from "next";
import "./globals.css";

import AppLayout from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  title: "Scouter7563",
  description: "SESI SENAI Megazord Scouting System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}