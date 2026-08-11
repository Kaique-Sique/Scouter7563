/**
 * AwardRowSkeleton
 *
 * Loading placeholder for one `AwardRow` — same trophy-icon + two-line
 * shape so the list doesn't reflow once real awards replace it.
 */
import { Trophy } from "lucide-react";

export default function AwardRowSkeleton() {
    return (
        <div className="flex animate-pulse items-center gap-4 rounded-lg border border-slate-800 bg-slate-950 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
                <Trophy className="h-5 w-5" />
            </div>

            <div className="flex-1 space-y-2">
                <div className="h-3.5 w-40 rounded bg-slate-800" />
                <div className="h-3 w-24 rounded bg-slate-800/70" />
            </div>
        </div>
    );
}
