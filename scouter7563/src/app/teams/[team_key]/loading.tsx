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