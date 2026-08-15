/**
 * MatchRow (default export of MatchRowCard.tsx)
 *
 * Compact row summarizing one match: its label, an optional live
 * status pill, and the red/blue alliance team badges. Currently only
 * used with mock data (dashboard's UpcomingMatches has no real feed
 * yet — see the TODO in dashboardPageClient.tsx).
 */
import TeamBadge from "@/components/ui/TeamBadge";
import { EventAllianceTeam, MatchStatus } from "@/types/events";

interface MatchRowProps {
  match: string | null;
  status?: MatchStatus | null;
  red: EventAllianceTeam[];
  blue: EventAllianceTeam[];
}

const STATUS_LABEL: Record<MatchStatus, string> = {
  live: "Live",
  on_field: "On Field",
  scheduled: "Scheduled",
  completed: "Completed",
};

const STATUS_STYLE: Record<MatchStatus, string> = {
  live: "bg-red-500/10 text-red-400",
  on_field: "bg-amber-500/10 text-amber-400",
  scheduled: "bg-slate-500/10 text-slate-400",
  completed: "bg-blue-500/10 text-blue-400",
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