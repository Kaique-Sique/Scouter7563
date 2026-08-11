/**
 * EventRankingsTab
 *
 * Rankings tab for `/events/[event_key]`. Defaults to `loading = true`
 * (skeleton) since there's no real data source wired up yet — once
 * the TBA rankings endpoint is adapted into `EventRankingRow[]`
 * (`src/types/events.ts`), pass it in:
 *
 *   <EventRankingsTab rankings={event.rankings} loading={false} />
 */
import { ListOrdered } from "lucide-react";
import { EventRankingRow } from "@/types/events";
import RankingsTable from "@/components/events/event/rankings/RankingsTable";
import EmptyTabState from "./EmptyTabState";

interface EventRankingsTabProps {
    rankings?: EventRankingRow[];
    loading?: boolean;
}

export default function EventRankingsTab({ rankings = [], loading = true }: EventRankingsTabProps) {
    const isEmpty = !loading && rankings.length === 0;

    return (
        <div className="space-y-6">
            {(loading || isEmpty) && (
                <EmptyTabState
                    icon={ListOrdered}
                    title={loading ? "Rankings not available yet" : "No rankings yet"}
                    description={
                        loading
                            ? "Qualification rankings will populate here once matches have been played."
                            : "This event doesn't have qualification rankings yet."
                    }
                />
            )}

            <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="p-6 pb-0">
                    <h2 className="text-lg font-semibold text-white">
                        Rankings
                    </h2>
                </div>

                {!isEmpty && (
                    <div className="mt-5">
                        <RankingsTable rankings={rankings} loading={loading} />
                    </div>
                )}
            </section>
        </div>
    );
}
