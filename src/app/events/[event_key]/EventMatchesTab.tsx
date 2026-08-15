/**
 * EventMatchesTab
 *
 * Matches tab for `/events/[event_key]`. Splits `matches` into
 * Qualification / Playoff brackets (via `getMatchBracket`, based on TBA's
 * `comp_level`) behind a toggle — that toggle used to be two static,
 * non-interactive pills; it's now real state. Within the active bracket,
 * matches are sorted into the order they're actually run
 * (`sortMatchesByExecutionOrder`).
 */
"use client";

import { useMemo, useState } from "react";
import { Swords } from "lucide-react";
import { EventMatch } from "@/types/events";
import { getMatchBracket, sortMatchesByExecutionOrder, MatchBracket } from "@/utils/match";
import MatchesList from "@/components/events/event/matches/MatchesList";
import EmptyTabState from "./EmptyTabState";

interface EventMatchesTabProps {
    matches?: EventMatch[];
    loading?: boolean;
}

const BRACKETS: { value: MatchBracket; label: string }[] = [
    { value: "qualification", label: "Qualification" },
    { value: "playoff", label: "Playoffs" },
];

export default function EventMatchesTab({ matches = [], loading = true }: EventMatchesTabProps) {
    const [bracket, setBracket] = useState<MatchBracket>("qualification");

    const { qualification, playoff } = useMemo(() => {
        const grouped: Record<MatchBracket, EventMatch[]> = {
            qualification: [],
            playoff: [],
        };

        for (const match of matches) {
            grouped[getMatchBracket(match.compLevel)].push(match);
        }

        return {
            qualification: sortMatchesByExecutionOrder(grouped.qualification),
            playoff: sortMatchesByExecutionOrder(grouped.playoff),
        };
    }, [matches]);

    const visibleMatches = bracket === "qualification" ? qualification : playoff;
    const isEmpty = !loading && matches.length === 0;
    const isBracketEmpty = !loading && !isEmpty && visibleMatches.length === 0;

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
                        {BRACKETS.map(({ value, label }) => {
                            const isActive = bracket === value;
                            const count = value === "qualification" ? qualification.length : playoff.length;

                            return (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setBracket(value)}
                                    aria-pressed={isActive}
                                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                                        isActive
                                            ? "bg-blue-600/20 text-blue-400"
                                            : "text-slate-500 hover:text-slate-300"
                                    }`}
                                >
                                    {label}
                                    {!loading && !isEmpty && (
                                        <span className="ml-1.5 text-slate-500">
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {!isEmpty && (
                    <div className="mt-5">
                        {isBracketEmpty ? (
                            <p className="rounded-lg border border-dashed border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
                                {bracket === "qualification"
                                    ? "No qualification matches yet."
                                    : "The playoff bracket hasn't started yet."}
                            </p>
                        ) : (
                            <MatchesList matches={visibleMatches} loading={loading} />
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
