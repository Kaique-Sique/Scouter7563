/**
 * TeamCardSkeleton
 *
 * Loading placeholder for one `TeamCard` — same avatar + two-line
 * shape so the grid doesn't reflow once real teams replace it.
 */
export default function TeamCardSkeleton() {
    return (
        <div className="flex animate-pulse items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 p-4">
            <div className="h-10 w-10 shrink-0 rounded-full bg-slate-800" />

            <div className="flex-1 space-y-2">
                <div className="h-3.5 w-16 rounded bg-slate-800" />
                <div className="h-3 w-24 rounded bg-slate-800/70" />
            </div>
        </div>
    );
}
