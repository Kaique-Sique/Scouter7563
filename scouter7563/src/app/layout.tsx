import type { Metadata } from "next";
import "./globals.css";

import AppLayout from "@/components/AppLayout";

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