import TeamBadge from "@/components/ui/TeamBadge";

interface Team {
  team: number;
  favorite?: boolean;
}

type MatchStatus = "live" | "on_field" | "scheduled";

interface MatchRowProps {
  match: string;
  status?: MatchStatus;
  red: Team[];
  blue: Team[];
}

const STATUS_LABEL: Record<MatchStatus, string> = {
  live: "Live",
  on_field: "On Field",
  scheduled: "Scheduled",
};

const STATUS_STYLE: Record<MatchStatus, string> = {
  live: "bg-red-500/10 text-red-400",
  on_field: "bg-amber-500/10 text-amber-400",
  scheduled: "bg-slate-500/10 text-slate-400",
};

export default function MatchRow({
  match,
  status,
  red,
  blue,
}: MatchRowProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">

      <div className="flex items-center justify-between gap-3">
        <h3 className="font-medium text-white">
          {match}
        </h3>

        {status && (
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[status]}`}
          >
            {STATUS_LABEL[status]}
          </span>
        )}
      </div>

      {/* RED */}
      <div className="mt-3 flex items-center gap-3">

        <span className="w-12 font-semibold text-red-400">
          RED
        </span>

        <div className="flex flex-wrap gap-2">

          {red.map((team) => (
            <TeamBadge
              key={team.team}
              team={team.team}
              alliance="red"
              favorite={team.favorite}
            />
          ))}

        </div>

      </div>

      {/* BLUE */}
      <div className="mt-3 flex items-center gap-3">

        <span className="w-12 font-semibold text-blue-400">
          BLUE
        </span>

        <div className="flex flex-wrap gap-2">

          {blue.map((team) => (
            <TeamBadge
              key={team.team}
              team={team.team}
              alliance="blue"
              favorite={team.favorite}
            />
          ))}

        </div>

      </div>

    </div>
  );
}