"use client";

import Image from "next/image";
import { Menu, Search, User } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 z-30 h-14 w-full border-b border-slate-800 bg-slate-950">
      <div className="flex h-full items-center justify-between px-5 lg:px-6">

        {/* Left */}
        <div className="flex items-center gap-4">

          {/* Menu Button */}
          <button
            type="button"
            onClick={onMenuClick}
            className="relative rounded-lg p-2 transition-colors hover:bg-slate-800"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>


          {/* Logo */}
          <Link
            href="/"
            className="flex select-none items-center gap-3 rounded-lg transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo.png"
              alt="Scouter7563 Logo"
              width={38}
              height={38}
              priority
            />

            <div className="leading-tight">
              <h1 className="text-xl font-bold text-white">
                Scouter7563
              </h1>

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                SESI SENAI MEGAZORD
              </p>
            </div>
          </Link>

        </div>


        {/* Center */}
        <div className="hidden w-full max-w-xl px-8 md:block">
          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 transition-colors focus-within:border-blue-500">

            <Search className="h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="Search teams, events or matches..."
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />

          </div>
        </div>


        {/* Right */}
        <div className="flex items-center gap-2">

          <button
            type="button"
            className="rounded-full border border-slate-700 p-2 transition-colors hover:bg-slate-800"
            aria-label="User"
          >
            <User className="h-5 w-5 text-white" />
          </button>

        </div>

      </div>
    </header>
  );
}