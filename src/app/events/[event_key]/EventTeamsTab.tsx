/**
 * EventTeamsTab
 *
 * Teams tab for `/events/[event_key]`. Defaults to `loading = true`
 * (skeleton) since there's no real data source wired up yet — once
 * the TBA teams endpoint is adapted into `EventTeamSummary[]`
 * (`src/types/events.ts`), pass it in:
 *
 *   <EventTeamsTab teams={event.teams} loading={false} />
 */
import { Users } from "lucide-react";
import { EventTeamSummary } from "@/types/events";
import TeamsGrid from "@/components/events/event/teams/TeamsGrid";
import EmptyTabState from "./EmptyTabState";

interface EventTeamsTabProps {
    teams?: EventTeamSummary[];
    loading?: boolean;
}

export default function EventTeamsTab({ teams = [], loading = true }: EventTeamsTabProps) {
    const isEmpty = !loading && teams.length === 0;

    return (
        <div className="space-y-6">
            {(loading || isEmpty) && (
                <EmptyTabState
                    icon={Users}
                    title={loading ? "Team list not available yet" : "No teams listed"}
                    description={
                        loading
                            ? "The full roster of participating teams will show up here once the event data syncs."
                            : "This event doesn't have any teams registered yet."
                    }
                />
            )}

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="text-lg font-semibold text-white">
                    Teams
                </h2>

                {!isEmpty && (
                    <div className="mt-5">
                        <TeamsGrid teams={teams} loading={loading} />
                    </div>
                )}
            </section>
        </div>
    );
}
