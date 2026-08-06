"use client";

/**
 * Error boundary for `/events/[event_key]`.
 *
 * Next.js renders this automatically whenever something throws inside
 * the route (e.g. `getEvent()` in page.tsx rejecting on a TBA outage,
 * as opposed to `notFound()`, which the sibling `not-found.tsx`
 * handles instead). Must be a client component — `reset()` re-runs
 * the segment.
 */
export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex h-[70vh] flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">
        Failed to load event
      </h1>

      <button
        onClick={reset}
        className="rounded-lg bg-blue-600 px-4 py-2"
      >
        Try again
      </button>
    </main>
  );
}