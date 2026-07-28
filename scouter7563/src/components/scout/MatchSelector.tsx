"use client";

/**
 * Match dropdown for the `/scout` screen.
 *
 * Mirrors `EventSelector` (src/components/dashboard/EventSelector.tsx)
 * almost exactly — same searchable-dropdown pattern — but keyed off
 * `MatchOption` instead of `EventOption`, and labels each entry with
 * `formatMatchLabel` (e.g. "Q12", "SF3") instead of a plain name.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Flag,
  Search,
} from "lucide-react";

import { MatchOption } from "@/types/scout";
import { formatMatchLabel } from "@/utils/match";

interface MatchSelectorProps {
  matches: MatchOption[] | null;
  selectedMatch: string | null;
  onChange: (matchKey: string) => void;
}

export default function MatchSelector({
  matches,
  selectedMatch,
  onChange,
}: MatchSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  // Memoized so this doesn't produce a brand-new array identity on every
  // render when `matches` is null — otherwise the `filteredMatches`
  // useMemo below (which depends on `matchList`) would never hit its
  // cache and recompute needlessly on every re-render.
  const matchList = useMemo(() => matches ?? [], [matches]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredMatches = useMemo(() => {
    if (!search) return matchList;

    return matchList.filter((match) =>
      `${formatMatchLabel(
        match.competitionLevel,
        match.matchNumber
      )} ${match.key}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [matchList, search]);

  const selected = matchList.find(
    (match) => match.key === selectedMatch
  );

  const hasMatches = matchList.length > 0;

  return (
    <div
      ref={containerRef}
      className="rounded-xl border border-slate-800 bg-slate-900 p-4"
    >
      <label className="mb-2 flex items-center gap-2 text-sm text-slate-400">
        <Flag size={16} />
        Match
      </label>

      <button
        type="button"
        disabled={!hasMatches}
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          w-full
          items-center
          justify-between
          rounded-lg
          border
          border-slate-800
          bg-slate-950
          px-4
          py-2.5
          text-left
          transition-colors
          hover:border-slate-700
          focus:border-blue-600
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <span className="truncate text-white">
          {!hasMatches
            ? "No matches available"
            : selected
              ? formatMatchLabel(
                selected.competitionLevel,
                selected.matchNumber
              )
              : "Select Match"}
        </span>

        <ChevronDown
          size={18}
          className={`text-slate-500 transition-transform ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {open && hasMatches && (
        <div
          className="
            mt-2
            overflow-hidden
            rounded-lg
            border
            border-slate-800
            bg-slate-950
            shadow-xl
          "
        >
          <div className="border-b border-slate-800 p-3">
            <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
              <Search
                size={16}
                className="text-slate-500"
              />

              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search matches..."
                className="
                  w-full
                  bg-transparent
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-slate-500
                "
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {filteredMatches.length === 0 ? (
              <div className="p-4 text-center text-sm text-slate-500">
                No matches found.
              </div>
            ) : (
              filteredMatches.map((match) => (
                <button
                  key={match.key}
                  type="button"
                  onClick={() => {
                    if (!match.key) return;

                    onChange(match.key);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    px-4
                    py-3
                    text-left
                    transition-colors
                    hover:bg-slate-800
                  "
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {formatMatchLabel(
                        match.competitionLevel,
                        match.matchNumber
                      )}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {match.key}
                    </p>
                  </div>

                  {selectedMatch === match.key && (
                    <Check
                      size={18}
                      className="flex-shrink-0 text-blue-500"
                    />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {!hasMatches && (
        <p className="mt-2 text-xs text-slate-500">
          No matches found for the selected event.
        </p>
      )}
    </div>
  );
}