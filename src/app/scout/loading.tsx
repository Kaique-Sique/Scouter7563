/**
 * Loading skeleton for `/scout`, shown while `page.tsx` awaits
 * `getEventOptions()` -> `getMatchOptions()` -> `getMatchAlliances()`
 * (a naturally sequential chain, since each step depends on the
 * previous selection). Mirrors `ScoutPageClient`'s layout: event
 * selector, match selector, red/blue alliance panels.
 */
export default function Loading() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
            <div className="h-9 w-52 animate-pulse rounded bg-slate-800" />

            <div className="mt-6 h-11 w-full animate-pulse rounded-lg bg-slate-800" />
            <div className="mt-3 h-11 w-full animate-pulse rounded-lg bg-slate-800" />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <div className="h-4 w-16 animate-pulse rounded bg-red-500/20" />
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-14 animate-pulse rounded-lg border border-slate-800 bg-slate-900"
                        />
                    ))}
                </div>

                <div className="space-y-2">
                    <div className="h-4 w-16 animate-pulse rounded bg-blue-500/20" />
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-14 animate-pulse rounded-lg border border-slate-800 bg-slate-900"
                        />
                    ))}
                </div>
            </div>

            <div className="mt-6 h-12 w-full animate-pulse rounded-lg bg-slate-800" />
        </main>
    );
}
