/**
 * TeamCard
 *
 * One team entry in the event's Teams tab grid: number badge,
 * nickname, city/country, and the same favorite-star treatment used
 * elsewhere (`EventCard`, `TeamBadge`). Links to `/teams/frc{number}`.
 */
import Link from "next/link";
import { Star } from "lucide-react";
import { EventTeamSummary } from "@/types/events";

interface TeamCardProps {
    team: EventTeamSummary;
}

export default function TeamCard({ team }: TeamCardProps) {
    const location = [team.city, team.country].filter(Boolean).join(", ");

    return (
        <Link
            href={`/teams/frc${team.number}`}
            className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-700"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
                {team.number}
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                    {team.name ?? `Team ${team.number}`}
                </p>

                <p className="truncate text-xs text-slate-400">
                    {location || "Location unavailable"}
                </p>
            </div>

            {team.favorite && (
                <Star size={16} className="shrink-0 fill-amber-400 text-amber-400" />
            )}
        </Link>
    );
}
