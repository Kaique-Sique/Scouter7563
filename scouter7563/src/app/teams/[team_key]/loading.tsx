/**
 * Loading skeleton for `/teams/[team_key]`, shown automatically by
 * Next.js while the server component (page.tsx) awaits `getTeam()`.
 * Shape roughly mirrors the real layout (header block + sidebar/content
 * columns) so there's no layout shift once real content streams in.
 */
export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-6">
      <div className="h-48 animate-pulse rounded-xl bg-slate-800" />

      <div className="mt-6 grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="h-[700px] animate-pulse rounded-xl bg-slate-800" />

        <div className="h-[700px] animate-pulse rounded-xl bg-slate-800" />
      </div>
    </main>
  );
}