/**
 * EmptyTabState
 *
 * Small banner used at the top of the tabs that don't have real TBA
 * data wired up yet (Matches / Teams / Rankings / Awards). Sits above
 * a skeleton mockup of that tab's future layout so the screen reads
 * as "finished, waiting on data" instead of "unfinished".
 */
import { LucideIcon } from "lucide-react";

interface EmptyTabStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function EmptyTabState({ icon: Icon, title, description }: EmptyTabStateProps) {
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Icon className="h-5 w-5" />
            </div>

            <div>
                <p className="text-sm font-medium text-white">
                    {title}
                </p>

                <p className="mt-0.5 text-sm text-slate-400">
                    {description}
                </p>
            </div>
        </div>
    );
}
