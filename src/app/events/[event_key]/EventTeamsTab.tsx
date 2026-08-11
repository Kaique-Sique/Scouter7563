/**
 * EventTeamsTab
 *
 * Design-only mockup for the "Teams" tab. Lays out the roster grid
 * the real team list will use once `event.teamsKeys` is resolved
 * against the teams endpoint — currently rendered as skeleton cards.
 */
import { Users } from "lucide-react";
import EmptyTabState from "./EmptyTabState";

const SKELETON_CARDS = 9;

export default function EventTeamsTab() {
    return (
        <div className="space-y-6">
            <EmptyTabState
                icon={Users}
                title="Team list not available yet"
                description="The full roster of participating teams will show up here once the event data syncs."
            />

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="text-lg font-semibold text-white">
                    Teams
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: SKELETON_CARDS }).map((_, i) => (
                        <div
                            key={i}
                            className="flex animate-pulse items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 p-4"
                        >
                            <div className="h-10 w-10 shrink-0 rounded-full bg-slate-800" />

                            <div className="flex-1 space-y-2">
                                <div className="h-3.5 w-16 rounded bg-slate-800" />
                                <div className="h-3 w-24 rounded bg-slate-800/70" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
