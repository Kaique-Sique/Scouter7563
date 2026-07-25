import MatchRow from "@/components/cards/MatchRowCard";

interface MatchTeam {
  team: number;
  favorite?: boolean;
}

export interface Match {
  key: string;
  match: string;
  status: "live" | "on_field" | "scheduled";
  red: MatchTeam[];
  blue: MatchTeam[];
}

interface UpcomingMatchesProps {
  matches: Match[];
  className?: string;
}

export default function UpcomingMatches({
  matches,
  className = "",
}: UpcomingMatchesProps) {
  return (
    <section
      className={`rounded-xl border border-slate-800 bg-slate-900 p-6 ${className}`}
    >

      <h2 className="text-lg font-semibold text-white">
        Upcoming Matches
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        The next scheduled qualification matches.
      </p>

      <div className="mt-5 space-y-4">

        {matches.map((match) => (
            <MatchRow
                key={match.key}
                match={match.match}
                status={match.status}
                red={match.red}
                blue={match.blue}
            />))}
      </div>

    </section>
  );
}