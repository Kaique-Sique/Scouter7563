import Link from "next/link";
import { ClipboardList } from "lucide-react";

interface PitScoutPageProps {
  searchParams: Promise<{
    event?: string;
    match?: string;
    team?: string;
    number?: string;
    alliance?: string;
    station?: string;
  }>;
}

// TODO: this page, /scout/2025/auto, and /scout/2025/teleop are temporary
// placeholders. They will be merged into a single scouting flow.
export default async function PitScoutPage({
  searchParams,
}: PitScoutPageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
        <ClipboardList className="h-7 w-7 text-blue-500" />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-white">Pit Scouting</h1>
        <p className="mt-2 text-sm text-slate-400">
          This section is under construction. Autonomous, teleop, and pit
          scouting will soon be unified into a single form.
        </p>
      </div>

      {(params.match || params.number) && (
        <div className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4 text-left text-sm text-slate-300">
          <p>
            <span className="text-slate-500">Event:</span> {params.event ?? "-"}
          </p>
          <p>
            <span className="text-slate-500">Match:</span> {params.match ?? "-"}
          </p>
          <p>
            <span className="text-slate-500">Team:</span> {params.number ?? "-"}{" "}
            ({params.alliance ?? "-"} / {params.station ?? "-"})
          </p>
        </div>
      )}

      <Link
        href="/scout"
        className="rounded-lg border border-slate-700 px-4 py-2 text-sm transition hover:bg-slate-800"
      >
        Back to Scout
      </Link>
    </main>
  );
}
