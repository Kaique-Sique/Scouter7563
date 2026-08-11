/**
 * RankingRow
 *
 * One row of the qualification rankings table: rank, team (linked to
 * its team page), win/loss/tie record, ranking points, and average.
 */
import Link from "next/link";
import { EventRankingRow } from "@/types/events";

interface RankingRowProps {
    row: EventRankingRow;
}

export default function RankingRow({ row }: RankingRowProps) {
    return (
        <tr className="border-b border-slate-800/60 last:border-0 hover:bg-slate-800/20">
            <td className="px-6 py-4 font-medium text-white">
                {row.rank}
            </td>

            <td className="px-6 py-4">
                <Link href={`/teams/frc${row.number}`} className="text-slate-300 hover:text-blue-400">
                    {row.number}
                </Link>
            </td>

            <td className="px-6 py-4 text-slate-300">
                {row.wins}-{row.losses}-{row.ties}
            </td>

            <td className="px-6 py-4 text-slate-300">
                {row.rankingPoints.toFixed(2)}
            </td>

            <td className="px-6 py-4 text-slate-300">
                {row.average.toFixed(1)}
            </td>
        </tr>
    );
}
