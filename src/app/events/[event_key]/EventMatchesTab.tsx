/**
 * EventMatchesTab
 *
 * Matches tab for `/events/[event_key]`. Defaults to `loading = true`
 * (skeleton) since there's no real data source wired up yet — once
 * the TBA matches endpoint is adapted into `EventMatch[]`
 * (`src/types/events.ts`), pass it in:
 *
 *   <EventMatchesTab matches={event.matches} loading={false} />
 */
import { Swords } from "lucide-react";
import { EventMatch } from "@/types/events";
import MatchesList from "@/components/events/event/matches/MatchesList";
import EmptyTabState from "./EmptyTabState";

interface EventMatchesTabProps {
    matches?: EventMatch[];
    loading?: boolean;
}

export default function EventMatchesTab({ matches = [], loading = true }: EventMatchesTabProps) {
    const isEmpty = !loading && matches.length === 0;

    return (
        <div className="space-y-6">
            {(loading || isEmpty) && (
                <EmptyTabState
                    icon={Swords}
                    title={loading ? "Match schedule not available yet" : "No matches yet"}
                    description={
                        loading
                            ? "Qualification and playoff matches will appear here once the event publishes its schedule."
                            : "This event doesn't have any scheduled matches yet."
                    }
                />
            )}

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold text-white">
                        Matches
                    </h2>

                    <div className="flex gap-2">
                        <span className="rounded-lg bg-blue-600/20 px-3 py-1.5 text-xs font-medium text-blue-400">
                            Qualification
                        </span>

                        <span className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500">
                            Playoffs
                        </span>
                    </div>
                </div>

                {!isEmpty && (
                    <div className="mt-5">
                        <MatchesList matches={matches} loading={loading} />
                    </div>
                )}
            </section>
        </div>
    );
}
