/**
 * EventAwardsTab
 *
 * Awards tab for `/events/[event_key]`. Defaults to `loading = true`
 * (skeleton) since there's no real data source wired up yet — once
 * the TBA awards endpoint is adapted into `EventAward[]`
 * (`src/types/events.ts`), pass it in:
 *
 *   <EventAwardsTab awards={event.awards} loading={false} />
 */
import { Trophy } from "lucide-react";
import { EventAward } from "@/types/events";
import AwardsList from "@/components/events/event/awards/AwardsList";
import EmptyTabState from "./EmptyTabState";

interface EventAwardsTabProps {
    awards?: EventAward[];
    loading?: boolean;
}

export default function EventAwardsTab({ awards = [], loading = true }: EventAwardsTabProps) {
    const isEmpty = !loading && awards.length === 0;

    return (
        <div className="space-y-6">
            {(loading || isEmpty) && (
                <EmptyTabState
                    icon={Trophy}
                    title={loading ? "Awards not announced yet" : "No awards yet"}
                    description={
                        loading
                            ? "Award winners will be listed here once they're announced at the event."
                            : "This event doesn't have any awards recorded yet."
                    }
                />
            )}

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="text-lg font-semibold text-white">
                    Awards
                </h2>

                {!isEmpty && (
                    <div className="mt-5">
                        <AwardsList awards={awards} loading={loading} />
                    </div>
                )}
            </section>
        </div>
    );
}
