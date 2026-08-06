"use client";

/**
 * One alliance's list of `TeamCard`s on the `/scout` screen. Two of
 * these render side by side (red + blue) in `scoutPageClient.tsx`, fed
 * with the six teams resolved server-side by `getMatchAlliances`
 * (src/lib/api/match.ts) for whichever match is currently selected.
 */

import TeamCard from "@/components/cards/TeamCard";
import { AllianceTeam } from "@/types/scout";

interface AlliancePanelProps {
  title: string;
  alliance: "red" | "blue";
  teams: AllianceTeam[];
  selectedTeam: string | null;
  onSelectTeam: (teamKey: string) => void;
}

export default function AlliancePanel({
  title,
  alliance,
  teams,
  selectedTeam,
  onSelectTeam,
}: AlliancePanelProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-slate-800
        bg-slate-900
        p-5
        shadow-sm
      "
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">{title}</h2>

        <span
          className={`
            rounded-md
            px-3
            py-1
            text-xs
            font-semibold

            ${
              alliance === "red"
                ? "bg-red-500/10 text-red-400"
                : "bg-blue-500/10 text-blue-400"
            }
          `}
        >
          {alliance.toUpperCase()}
        </span>
      </div>

      {/* Teams */}
      <div className="flex flex-col gap-3">
        {teams.length === 0 ? (
          // No match selected yet, or the match's team list is still
          // being fetched server-side — same "nothing to show" message
          // either way, since the scouter has no action to take here.
          <p className="text-sm text-slate-500">Select a match to see teams.</p>
        ) : (
          teams.map((team) => (
            <TeamCard
              key={team.key}
              number={team.number}
              nickname={team.nickname}
              avatar={team.avatar}
              station={team.station}
              selected={selectedTeam === team.key}
              onClick={() => onSelectTeam(team.key)}
            />
          ))
        )}
      </div>
    </div>
  );
}
