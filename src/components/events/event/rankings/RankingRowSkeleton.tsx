/**
 * RankingRowSkeleton
 *
 * Loading placeholder for one `RankingRow` — same 5-column shape
 * (Rank / Team / Record / RP / Avg) so the table doesn't reflow once
 * real rankings replace it.
 */
const COLUMN_COUNT = 5;

export default function RankingRowSkeleton() {
    return (
        <tr className="animate-pulse border-b border-slate-800/60 last:border-0">
            {Array.from({ length: COLUMN_COUNT }).map((_, i) => (
                <td key={i} className="px-6 py-4">
                    <div className="h-3.5 w-12 rounded bg-slate-800" />
                </td>
            ))}
        </tr>
    );
}
