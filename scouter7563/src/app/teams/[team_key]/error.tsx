"use client";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex h-[70vh] flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">
        Failed to load team
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