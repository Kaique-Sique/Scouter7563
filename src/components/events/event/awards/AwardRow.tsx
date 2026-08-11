/**
 * AwardRow
 *
 * One award entry: trophy icon, award name, and the recipient team or
 * individual awardee.
 */
import { Trophy } from "lucide-react";
import { EventAward } from "@/types/events";

interface AwardRowProps {
    award: EventAward;
}

export default function AwardRow({ award }: AwardRowProps) {
    return (
        <div className="flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-950 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
                <Trophy className="h-5 w-5" />
            </div>

            <div>
                <p className="text-sm font-medium text-white">
                    {award.name}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                    {award.recipientName ?? award.awardee ?? "Recipient TBD"}
                </p>
            </div>
        </div>
    );
}
