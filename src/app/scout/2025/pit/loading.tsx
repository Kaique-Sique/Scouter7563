/**
 * Loading skeleton for `/scout/2025/pit`. This page only reads
 * `searchParams` today (no TBA fetch yet), so this mostly guards
 * against future data-fetching being added here without a loading
 * state — keeps the placeholder screens consistent with the rest.
 */
export default function Loading() {
    return (
        <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
            <div className="h-8 w-56 animate-pulse rounded bg-slate-800" />
            <div className="mt-6 h-64 animate-pulse rounded-xl border border-slate-800 bg-slate-900" />
        </main>
    );
}
