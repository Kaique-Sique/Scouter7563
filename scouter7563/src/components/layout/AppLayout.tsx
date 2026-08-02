"use client";

/**
 * AppLayout
 *
 * Persistent chrome wrapping every route (via src/app/layout.tsx):
 * the fixed top `Header` and the slide-out `Sidebar`, whose open/close
 * state lives here since both components need to read/drive it.
 */
import { useState } from "react";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header
        onMenuClick={() => {
          setSidebarOpen(true);
          // NOTE: leftover debug log, safe to remove.
          console.log("okay");
        }}
      />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="pt-14">
        {children}
      </main>
    </>
  );
}