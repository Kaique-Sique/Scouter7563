/**
 * RankingsTable
 *
 * Rankings tab content: renders the table header, then either
 * `SKELETON_ROWS` worth of `RankingRowSkeleton` while `loading`, or
 * the real `EventRankingRow[]` as `RankingRow`s once this is wired up
 * to real TBA data.
 */
import { EventRankingRow } from "@/types/events";
import RankingRow from "./RankingRow";
import RankingRowSkeleton from "./RankingRowSkeleton";

const COLUMNS = ["Rank", "Team", "Record", "RP", "Avg"];
const SKELETON_ROWS = 8;

interface RankingsTableProps {
    rankings: EventRankingRow[];
    loading: boolean;
}

export default function RankingsTable({ rankings, loading }: RankingsTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-y border-slate-800 text-xs uppercase tracking-wide text-slate-500">
                        {COLUMNS.map((col) => (
                            <th key={col} className="px-6 py-3 font-medium">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {loading
                        ? Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                            <RankingRowSkeleton key={i} />
                        ))
                        : rankings.map((row) => (
                            <RankingRow key={row.team_key} row={row} />
                        ))}
                </tbody>
            </table>
        </div>
    );
}
