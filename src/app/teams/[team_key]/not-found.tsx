import Link from "next/link";

/** Route-specific 404 for `/teams/[team_key]`, shown when `getTeam()`
 *  returns null for an unknown/invalid team key. */
export default function NotFound() {
  return (
    <main className="flex h-[70vh] flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        Team not found
      </h1>

      <Link
        href="/teams"
        className="rounded-lg bg-blue-600 px-4 py-2"
      >
        Back to teams
      </Link>
    </main>
  );
}