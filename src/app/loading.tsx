/**
 * Loading skeleton for `/` (dashboard), shown while `page.tsx` awaits
 * `getEventOptions()` + `getEventDataDashboard()`. Mirrors
 * `DashboardPageClient`'s layout: title, event selector, stat cards,
 * progress card, upcoming matches.
 */
export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-950 px-6 py-8">
            <div className="h-9 w-40 animate-pulse rounded bg-slate-800" />

            <div className="mt-6 h-11 w-full max-w-sm animate-pulse rounded-lg bg-slate-800" />

            <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-24 animate-pulse rounded-xl border border-slate-800 bg-slate-900"
                    />
                ))}
            </section>

            <div className="mt-6 h-28 animate-pulse rounded-xl border border-slate-800 bg-slate-900" />

            <div className="mt-6 h-64 animate-pulse rounded-xl border border-slate-800 bg-slate-900" />
        </div>
    );
}
