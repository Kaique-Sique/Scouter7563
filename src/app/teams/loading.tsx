/**
 * Loading skeleton for `/teams`, shown while `page.tsx` awaits
 * `getTeamListItem()`. Reuses the same card shape as `TeamCardSkeleton`
 * (see `/events/[event_key]`'s Teams tab) so the two stay visually
 * consistent.
 */
const CARD_COUNT = 12;

export default function Loading() {
    return (
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <div className="h-9 w-32 animate-pulse rounded bg-slate-800" />

            {/* Search + sort + favorite filter */}
            <div className="mt-6 flex flex-wrap gap-3">
                <div className="h-11 flex-1 animate-pulse rounded-lg bg-slate-800" />
                <div className="h-11 w-40 animate-pulse rounded-lg bg-slate-800" />
                <div className="h-11 w-11 animate-pulse rounded-lg bg-slate-800" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: CARD_COUNT }).map((_, i) => (
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
        </main>
    );
}
