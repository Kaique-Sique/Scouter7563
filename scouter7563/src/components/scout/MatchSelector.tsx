"use client";

import { ChevronDown, Flag } from "lucide-react";
import { CompetitionLevel } from "@/types/enums/CompetitionLevel";
import { formatMatchLabel } from "@/utils/match";

export interface Match {
  key: string;
  matchNumber: number;
  competitionLevel: CompetitionLevel;
}

interface MatchSelectorProps {
  matches: Match[];
  selectedMatch: string;
  onChange: (matchKey: string) => void;
}

export default function MatchSelector({
  matches,
  selectedMatch,
  onChange,
}: MatchSelectorProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Flag className="h-5 w-5 text-blue-500" />

        <div>
          <h2 className="text-sm font-semibold text-white">
            Match
          </h2>

          <p className="text-xs text-slate-400">
            Select the match to scout.
          </p>
        </div>
      </div>

      <div className="relative">
        <select
          value={selectedMatch}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 pr-10 text-sm text-white transition outline-none hover:border-slate-600 focus:border-blue-500"
        >
          <option value="" disabled>
            Select a match...
          </option>

          {matches.map((match) => (
            <option
              key={match.key}
              value={match.key}
            >
              {formatMatchLabel(
                match.competitionLevel,
                match.matchNumber
              )}
            </option>
          ))}
        </select>

        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}
