/**
 * Loading skeleton for `/events`, shown while `page.tsx` awaits
 * `getEventList()`. Mirrors the search bar + week-grouped sections
 * layout that `EventsPageClient` renders once data arrives.
 */
const SECTIONS = 3;
const CARDS_PER_SECTION = 4;

export default function Loading() {
    return (
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <div className="h-9 w-40 animate-pulse rounded bg-slate-800" />

            {/* Search + favorite filter */}
            <div className="mt-6 flex gap-3">
                <div className="h-11 flex-1 animate-pulse rounded-lg bg-slate-800" />
                <div className="h-11 w-11 animate-pulse rounded-lg bg-slate-800" />
            </div>

            <div className="mt-8 space-y-10">
                {Array.from({ length: SECTIONS }).map((_, sectionIdx) => (
                    <section key={sectionIdx} className="space-y-4">
                        <div className="h-6 w-32 animate-pulse rounded bg-slate-800" />

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: CARDS_PER_SECTION }).map((_, cardIdx) => (
                                <div
                                    key={cardIdx}
                                    className="h-32 animate-pulse rounded-xl border border-slate-800 bg-slate-900"
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}
