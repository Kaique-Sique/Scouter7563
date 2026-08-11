/**
 * EventRankingsTab
 *
 * Design-only mockup for the "Rankings" tab. Lays out the qual
 * standings table (rank / team / record / RP / avg) that will be
 * populated from TBA's rankings endpoint — currently skeleton rows.
 */
import { ListOrdered } from "lucide-react";
import EmptyTabState from "./EmptyTabState";

const SKELETON_ROWS = 8;
const COLUMNS = ["Rank", "Team", "Record", "RP", "Avg"];

export default function EventRankingsTab() {
    return (
        <div className="space-y-6">
            <EmptyTabState
                icon={ListOrdered}
                title="Rankings not available yet"
                description="Qualification rankings will populate here once matches have been played."
            />

            <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="p-6 pb-0">
                    <h2 className="text-lg font-semibold text-white">
                        Rankings
                    </h2>
                </div>

                <div className="mt-5 overflow-x-auto">
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
                            {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                                <tr
                                    key={i}
                                    className="animate-pulse border-b border-slate-800/60 last:border-0"
                                >
                                    {COLUMNS.map((col) => (
                                        <td key={col} className="px-6 py-4">
                                            <div className="h-3.5 w-12 rounded bg-slate-800" />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
