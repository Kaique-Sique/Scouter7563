/**
 * EventMatchesTab
 *
 * Design-only mockup for the "Matches" tab. Mirrors the layout the
 * real qual/playoff schedule will use (status pill + red/blue alliance
 * rows, same shape as `MatchRowCard`) but rendered as skeleton content
 * — wiring this up to `/scout` match data is a follow-up.
 */
import { Swords } from "lucide-react";
import EmptyTabState from "./EmptyTabState";

const SKELETON_ROWS = 5;

export default function EventMatchesTab() {
    return (
        <div className="space-y-6">
            <EmptyTabState
                icon={Swords}
                title="Match schedule not available yet"
                description="Qualification and playoff matches will appear here once the event publishes its schedule."
            />

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

                <div className="mt-5 space-y-4">
                    {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse rounded-lg border border-slate-800 bg-slate-950 p-4"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="h-4 w-24 rounded bg-slate-800" />
                                <div className="h-5 w-16 rounded-full bg-slate-800" />
                            </div>

                            <div className="mt-3 flex items-center gap-3">
                                <span className="w-12 text-xs font-semibold text-red-400/60">
                                    RED
                                </span>

                                <div className="flex flex-wrap gap-2">
                                    <div className="h-7 w-14 rounded-md bg-red-500/10" />
                                    <div className="h-7 w-14 rounded-md bg-red-500/10" />
                                    <div className="h-7 w-14 rounded-md bg-red-500/10" />
                                </div>
                            </div>

                            <div className="mt-3 flex items-center gap-3">
                                <span className="w-12 text-xs font-semibold text-blue-400/60">
                                    BLUE
                                </span>

                                <div className="flex flex-wrap gap-2">
                                    <div className="h-7 w-14 rounded-md bg-blue-500/10" />
                                    <div className="h-7 w-14 rounded-md bg-blue-500/10" />
                                    <div className="h-7 w-14 rounded-md bg-blue-500/10" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
