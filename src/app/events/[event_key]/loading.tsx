/**
 * Loading skeleton for `/events/[event_key]`, shown automatically by
 * Next.js while `page.tsx` awaits `getEventFull()` + `getTeamSummary()`
 * (the slowest fetch in the app — see the API notes shared with this
 * change). Shape mirrors `EventHeader` (title + tab strip) and the
 * default "Overview" tab layout, so there's no layout shift once real
 * content streams in.
 */
const EVENT_TABS = ["Overview", "Matches", "Teams", "Rankings", "Awards", "Scout"];

export default function Loading() {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 overflow-x-hidden px-4 py-6 sm:px-6">
            {/* Header hero: title + quick facts + tab strip */}
            <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-64 animate-pulse rounded bg-slate-800" />
                        <div className="h-6 w-16 animate-pulse rounded-full bg-slate-800" />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-4 w-28 animate-pulse rounded bg-slate-800" />
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto border-t border-slate-800 px-8 py-3">
                    {EVENT_TABS.map((tab) => (
                        <div
                            key={tab}
                            className="h-8 w-24 shrink-0 animate-pulse rounded-lg bg-slate-800"
                        />
                    ))}
                </div>
            </section>

            {/* Overview tab: sidebar info card + main content */}
            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
                <aside className="h-64 animate-pulse rounded-xl border border-slate-800 bg-slate-900" />

                <main className="space-y-6">
                    <div className="h-40 animate-pulse rounded-xl border border-slate-800 bg-slate-900" />
                    <div className="h-56 animate-pulse rounded-xl border border-slate-800 bg-slate-900" />
                </main>
            </div>
        </main>
    );
}
