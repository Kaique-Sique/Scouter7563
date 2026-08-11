/**
 * MatchesSkeleton
 *
 * Loading placeholder for the Matches tab. Mirrors the exact shape of
 * the real `MatchRow` cards (status pill + red/blue alliance chips)
 * so the layout doesn't jump once real match data replaces it.
 */
const SKELETON_ROWS = 5;

export default function MatchesSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                <div
                    key={i}
                    className="animate-pulse rounded-lg border border-slate-800 bg-slate-950 p-4"
                >
                    <div className="flex items-center justify-between gap-3">
                        <div className="h-4 w-24 rounded bg-slate-800" />
                        <div className="h-5 w-16 rounded-full bg-slate-800" />
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                        <span className="w-12 text-xs font-semibold text-red-400/60">
                            RED
                        </span>

                        <div className="flex flex-wrap gap-2">
                            <div className="h-7 w-14 rounded-md bg-red-500/10" />
                            <div className="h-7 w-14 rounded-md bg-red-500/10" />
                            <div className="h-7 w-14 rounded-md bg-red-500/10" />
                        </div>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                        <span className="w-12 text-xs font-semibold text-blue-400/60">
                            BLUE
                        </span>

                        <div className="flex flex-wrap gap-2">
                            <div className="h-7 w-14 rounded-md bg-blue-500/10" />
                            <div className="h-7 w-14 rounded-md bg-blue-500/10" />
                            <div className="h-7 w-14 rounded-md bg-blue-500/10" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
