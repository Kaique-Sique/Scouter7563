/**
 * TeamsGrid
 *
 * Teams tab content: shows `SKELETON_CARDS` worth of `TeamCardSkeleton`
 * while `loading`, or the real `EventTeamSummary[]` as `TeamCard`s
 * once this is wired up to real TBA data.
 */
import { EventTeamSummary } from "@/types/events";
import TeamCard from "./TeamCard";
import TeamCardSkeleton from "./TeamCardSkeleton";

const SKELETON_CARDS = 9;

interface TeamsGridProps {
    teams: EventTeamSummary[];
    loading: boolean;
}

export default function TeamsGrid({ teams, loading }: TeamsGridProps) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {loading
                ? Array.from({ length: SKELETON_CARDS }).map((_, i) => (
                    <TeamCardSkeleton key={i} />
                ))
                : teams.map((team) => (
                    <TeamCard key={team.team_key} team={team} />
                ))}
        </div>
    );
}
