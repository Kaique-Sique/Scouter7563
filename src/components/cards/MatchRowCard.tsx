/**
 * MatchRow (default export of MatchRowCard.tsx)
 *
 * Match card: match label + status pill (and the TBA link, if any) on
 * their own line up top, red/blue alliances below on a second line —
 * each alliance as its own compact strip with its teams and score.
 * Used on the dashboard (`UpcomingMatches`) with mock data today — see
 * the TODO in dashboardPageClient.tsx explaining there's no per-match
 * alliance/status API wired up yet.
 *
 * `matchKey`, `redScore` and `blueScore` are all optional — omitting them
 * keeps the row lean (no link, no score); passing them in adds the link
 * out to the match's TBA page and a score next to each alliance, with
 * the winning side highlighted.
 */
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import TeamBadge from "@/components/ui/TeamBadge";
import { EventAllianceTeam, MatchStatus } from "@/types/events";

interface MatchRowProps {
  match: string | null;
  status?: MatchStatus | null;
  red: EventAllianceTeam[];
  blue: EventAllianceTeam[];
  /** TBA match key (e.g. `"2025scmb_qm12"`). When present, an icon next
   *  to the label links out to `thebluealliance.com/match/{matchKey}`. */
  matchKey?: string | null;
  /** Red alliance score. Only rendered when both `redScore` and
   *  `blueScore` are non-null — a lone score isn't useful on its own. */
  redScore?: number | null;
  /** Blue alliance score. See `redScore`. */
  blueScore?: number | null;
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

interface AllianceRowProps {
  alliance: "red" | "blue";
  teams: EventAllianceTeam[];
  score?: number | null;
  showScore: boolean;
  isWinner: boolean;
}

function AllianceRow({ alliance, teams, score, showScore, isWinner }: AllianceRowProps) {
  const isRed = alliance === "red";

  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
        isWinner
          ? isRed
            ? "bg-red-500/10 ring-1 ring-inset ring-red-500/30"
            : "bg-blue-500/10 ring-1 ring-inset ring-blue-500/30"
          : "bg-slate-900/60"
      }`}
    >
      <span
        className={`w-10 shrink-0 text-[11px] font-bold uppercase tracking-wider ${
          isRed ? "text-red-400" : "text-blue-400"
        }`}
      >
        {isRed ? "Red" : "Blue"}
      </span>

      <div className="flex flex-1 flex-wrap gap-1.5">
        {teams.map((team) => (
          <TeamBadge
            key={team.team}
            team={team.team}
            alliance={alliance}
            favorite={team.favorite}
          />
        ))}
      </div>

      {showScore && (
        <span
          className={`shrink-0 text-base font-bold tabular-nums ${
            isWinner ? "text-white" : "text-slate-500"
          }`}
        >
          {score}
        </span>
      )}
    </div>
  );
}

export default function MatchRow({
  match,
  status,
  red,
  blue,
  matchKey,
  redScore,
  blueScore,
}: MatchRowProps) {
  const showScore = redScore != null && blueScore != null;
  const redWins = showScore && (redScore as number) > (blueScore as number);
  const blueWins = showScore && (blueScore as number) > (redScore as number);

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">

      {/* Line 1 — match label + status, link at the end */}
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-bold text-white">
          {match}
        </h3>

        {status && (
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[status]}`}
          >
            {STATUS_LABEL[status]}
          </span>
        )}

        {matchKey && (
          <Link
            href={`https://www.thebluealliance.com/match/${matchKey}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open this match on The Blue Alliance"
            title="Open on The Blue Alliance"
            className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-300"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {/* Line 2 — both alliances */}
      <div className="mt-3 space-y-1.5">
        <AllianceRow
          alliance="red"
          teams={red}
          score={redScore}
          showScore={showScore}
          isWinner={redWins}
        />

        <AllianceRow
          alliance="blue"
          teams={blue}
          score={blueScore}
          showScore={showScore}
          isWinner={blueWins}
        />
      </div>

    </div>
  );
}