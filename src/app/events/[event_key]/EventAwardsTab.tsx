/**
 * EventAwardsTab
 *
 * Design-only mockup for the "Awards" tab. Lays out the awards list
 * (trophy icon + award name + recipient) that will be populated from
 * TBA's awards endpoint once the event has announced results.
 */
import { Trophy } from "lucide-react";
import EmptyTabState from "./EmptyTabState";

const SKELETON_AWARDS = 4;

export default function EventAwardsTab() {
    return (
        <div className="space-y-6">
            <EmptyTabState
                icon={Trophy}
                title="Awards not announced yet"
                description="Award winners will be listed here once they're announced at the event."
            />

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="text-lg font-semibold text-white">
                    Awards
                </h2>

                <div className="mt-5 space-y-3">
                    {Array.from({ length: SKELETON_AWARDS }).map((_, i) => (
                        <div
                            key={i}
                            className="flex animate-pulse items-center gap-4 rounded-lg border border-slate-800 bg-slate-950 p-4"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
                                <Trophy className="h-5 w-5" />
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="h-3.5 w-40 rounded bg-slate-800" />
                                <div className="h-3 w-24 rounded bg-slate-800/70" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
