"use client";

/**
 * Header
 *
 * Fixed top bar: hamburger menu (opens `Sidebar`), logo/home link,
 * and a search box with lightweight typed-shortcut suggestions (team
 * number -> team page, otherwise search-in-Teams / search-in-Events
 * links). No backend search — see comments below on `suggestions`.
 */
import Image from "next/image";
import { Menu, Search, User, Users, CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

interface Suggestion {
  id: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  href: string;
}

export default function Header({ onMenuClick }: HeaderProps) {

  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Número puro ("254") ou já com o prefixo ("frc254") -> a página do
  // time já existe em /teams/[team_key], então vira a sugestão de topo.
  const teamKeyMatch = useMemo(
    () => /^(?:frc)?(\d+)$/i.exec(query.trim()),
    [query]
  );

  // Sugestões são geradas na hora a partir do que foi digitado — não são
  // um resultado de busca real (não temos dado de times/eventos aqui no
  // client), só atalhos pros lugares mais prováveis pra onde a pessoa quer
  // ir a partir do texto.
  const suggestions: Suggestion[] = useMemo(() => {

    const value = query.trim();

    if (!value) return [];

    const items: Suggestion[] = [];

    if (teamKeyMatch) {
      const teamKey = `frc${teamKeyMatch[1]}`;

      items.push({
        id: "team-direct",
        label: `Team ${teamKeyMatch[1]}`,
        hint: "Go to team page",
        icon: <Users className="h-4 w-4" />,
        href: `/teams/${teamKey}`,
      });
    }

    items.push({
      id: "teams-search",
      label: value,
      hint: "Search in Teams",
      icon: <Search className="h-4 w-4" />,
      href: `/teams?q=${encodeURIComponent(value)}`,
    });

    items.push({
      id: "events-search",
      label: value,
      hint: "Search in Events",
      icon: <CalendarDays className="h-4 w-4" />,
      href: `/events?q=${encodeURIComponent(value)}`,
    });

    return items;

  }, [query, teamKeyMatch]);

  // Fecha o dropdown ao clicar fora da barra de busca
  useEffect(() => {

    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current) return;

      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  // Sempre que a lista de sugestões muda, volta o destaque pra primeira.
  // Ajustado durante a renderização (padrão recomendado pelo React para
  // "resetar estado quando um input muda") em vez de um `useEffect`, que
  // chamaria `setState` de forma síncrona após o commit e disparuria uma
  // renderização em cascata extra.
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setActiveIndex(0);
  }

  function goTo(href: string) {
    router.push(href);
    setQuery("");
    setOpen(false);
  }

  function handleSubmit() {
    const target = suggestions[activeIndex] ?? suggestions[0];
    if (target) goTo(target.href);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {

    if (!open || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    }

    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    }

    else if (e.key === "Escape") {
      setOpen(false);
    }

  }

  return (
    <header className="fixed top-0 left-0 z-50 h-14 w-full border-b border-slate-800 bg-slate-950">
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
        <div
          ref={containerRef}
          className="relative hidden w-full max-w-xl px-8 md:block"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 transition-colors focus-within:border-blue-500"
          >

            <button
              type="submit"
              aria-label="Search"
              className="shrink-0 text-slate-400 transition-colors hover:text-white"
            >
              <Search className="h-5 w-5" />
            </button>

            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search teams, events or matches..."
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />

          </form>

          {/* Suggestions */}
          {open && suggestions.length > 0 && (
            <div
              className="
                absolute
                left-8
                right-8
                top-full
                mt-2
                overflow-hidden
                rounded-xl
                border
                border-slate-700
                bg-slate-900
                shadow-lg
                shadow-black/40
              "
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => goTo(suggestion.href)}
                  className={[
                    "flex",
                    "w-full",
                    "items-center",
                    "gap-3",
                    "px-4",
                    "py-2.5",
                    "text-left",
                    "text-sm",
                    "transition-colors",

                    index === activeIndex
                      ? "bg-slate-800 text-white"
                      : "text-slate-300",
                  ].join(" ")}
                >
                  <span className="shrink-0 text-slate-400">
                    {suggestion.icon}
                  </span>

                  <span className="truncate">
                    {suggestion.label}
                  </span>

                  <span className="ml-auto flex shrink-0 items-center gap-1 text-xs text-slate-500">
                    {suggestion.hint}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              ))}
            </div>
          )}

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