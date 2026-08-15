/**
 * MatchesList
 *
 * Matches tab content: shows `MatchesSkeleton` while `loading`, or the
 * real `EventMatch[]` rendered with the same `MatchRow` card already
 * used on the dashboard — so matches look identical everywhere in the
 * app once this is wired up to real TBA data.
 */
import MatchRow from "@/components/cards/MatchRowCard";
import { EventMatch } from "@/types/events";
import MatchesSkeleton from "./MatchesSkeleton";

interface MatchesListProps {
    matches: EventMatch[];
    loading: boolean;
}

export default function MatchesList({ matches, loading }: MatchesListProps) {
    if (loading) {
        return <MatchesSkeleton />;
    }

    return (
        <div className="space-y-4">
            {matches.map((match) => (
                <MatchRow
                    matchKey={match.key}
                    match={match.match}
                    status={match.status}
                    red={match.red ?? []}
                    blue={match.blue ?? []}
                    blueScore={match.blueScore ?? null}
                    redScore={match.redScore ?? null}
                />
            ))}
        </div>
    );
}
