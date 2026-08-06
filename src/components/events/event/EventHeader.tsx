/**
 * EventHeader
 *
 * Hero block for `/events/[event_key]`: event title/status/quick-facts
 * on top, and the tab navigation (Overview / Matches / Teams /
 * Rankings / Awards / Scout) underneath.
 *
 * NOTE: the hero facts (title, location, dates, team/match counts)
 * are still hardcoded placeholders. `getEvent()` is already wired up
 * in `page.tsx` but intentionally not threaded through here yet —
 * swapping in real TBA data is a follow-up, kept separate from this
 * tab-navigation change so the two land as independent, reviewable
 * steps.
 *
 * The tabs themselves ARE fully functional: each is a plain `<Link>`
 * to `/events/{eventKey}?tab={tab}`, so tab state lives in the URL
 * (shareable, back-button friendly, no client JS required to switch
 * tabs — this stays a server-renderable component).
 */

import Link from "next/link";
import { Calendar, MapPin, Swords, Users } from "lucide-react";
import { EventFull, EventTab } from "@/types/events";
import { formatEventDateRange } from "@/utils/formatDates";

/** Order + labels for the tab strip. Single source of truth so the
 *  nav can't drift out of sync with the `EventTab` enum. */
const EVENT_TABS: { tab: EventTab; label: string }[] = [
    { tab: EventTab.Overview, label: "Overview" },
    { tab: EventTab.Matches, label: "Matches" },
    { tab: EventTab.Teams, label: "Teams" },
    { tab: EventTab.Rankings, label: "Rankings" },
    { tab: EventTab.Awards, label: "Awards" },
    { tab: EventTab.Scout, label: "Scout" },
];

interface EventHeaderProps {
    /** Event key from the route (`2026sao`, etc) — used to build each tab's href. */
    eventKey: string;
    /** Currently active tab, already validated server-side in `page.tsx`. */
    activeTab: EventTab;

    event: EventFull | null;
}

export default function EventHeader({ eventKey, activeTab, event }: EventHeaderProps) {
    return (
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">

            <div className="p-8">
                <div className="flex items-center gap-2">
                    <h1 className="text-4xl font-bold tracking-tight">
                        {event?.name || " ? "}
                    </h1>

                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Live
                    </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <MapPin className="h-4 w-4" />
                        {event?.city}, {event?.country}
                    </div>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-slate-400">
                    <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatEventDateRange(event?.startDate ?? null, event?.endDate ?? null)}
                    </span>

                    <span className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {event?.teams ?? " ? "}
                    </span>

                    <span className="flex items-center gap-2">
                        <Swords className="h-4 w-4" />
                        {event?.matchs ?? " ? "}
                    </span>
                </div>
            </div>

            {/* Tab navigation — plain links to `?tab=`, active tab styled via
                the already-validated `activeTab` prop from the server page. */}
            <div className="border-t border-slate-800 px-8">
                <nav className="flex gap-8 overflow-x-auto">
                    {EVENT_TABS.map(({ tab, label }) => {
                        const isActive = tab === activeTab;

                        return (
                            <Link
                                key={tab}
                                href={`/events/${eventKey}?tab=${tab}`}
                                // `scroll={false}` keeps the page from jumping back
                                // to the top every time the scouter switches tabs.
                                scroll={false}
                                className={`border-b-2 py-4 text-sm font-medium transition ${
                                    isActive
                                        ? "border-blue-500 text-white"
                                        : "border-transparent text-slate-400 hover:text-white"
                                }`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

        </section>
    );
}
