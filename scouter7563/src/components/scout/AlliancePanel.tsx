"use client";

import TeamCard from "@/components/cards/TeamCard";

interface Team {
  key: string;
  number: number;
  nickname: string;
  avatar: string;
  station: string;
}

interface AlliancePanelProps {
  title: string;
  alliance: "red" | "blue";
  teams: Team[];
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
        <h2 className="text-lg font-bold text-white">
          {title}
        </h2>

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
        {teams.map((team) => (
          <TeamCard
            key={team.key}
            number={team.number}
            nickname={team.nickname}
            avatar={team.avatar}
            station={team.station}
            selected={selectedTeam === team.key}
            onClick={() => onSelectTeam(team.key)}
          />
        ))}
      </div>
    </div>
  );
}