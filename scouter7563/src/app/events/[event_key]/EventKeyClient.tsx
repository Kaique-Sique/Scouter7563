"use client";

/**
 * EventKeyClient
 *
 * Client shell for `/events/[event_key]`. Renders the header/tab nav
 * and then swaps in a per-tab content block based on the `tab` prop
 * that `page.tsx` already validated against `EventTab`.
 *
 * Scope note: this only wires up the TAB STRUCTURE. Every tab besides
 * "Scout" (which just deep-links into the existing `/scout` flow) is
 * a placeholder — hooking each one up to real TBA data (matches,
 * teams, rankings, awards) is deliberately left for a follow-up so
 * this change stays focused on navigation, not the API layer.
 */

import Link from "next/link";
import EventHeader from "@/components/events/event/EventHeader";
import { EventFull, EventTab, EventWebcastType, WebcastUrl} from "@/types/events";
import EventOverview from "./EventOverviewTab";
import { EventInfoProps } from "@/components/events/event/EventInfo";


export const mockInformation: EventInfoProps = {
    location: "São Paulo",
    venue: "SESI Vila Leopoldina",
    date: "Mar 12–15",
    country: "Brazil",
    week: "Week 2",
    teams: 64,
    matches: 90,
    awards: 14,
};

export const mockWebcasts: WebcastUrl[] = [
    {
        type: EventWebcastType.YouTube,
        channel: "Official FIRST Broadcast",
        date: "Mar 12",
        url: "https://youtube.com",
    },
    {
        type: EventWebcastType.YouTube,
        channel: "Official FIRST Broadcast",
        date: "Mar 13",
        url: "https://youtube.com",
    },
    {
        type: EventWebcastType.Twitch,
        channel: "FIRSTinspires",
        date: "Mar 14",
        url: "https://twitch.tv/firstinspires",
    },
];

interface EventKeyProps {
    eventKey: string;
    tab: EventTab;
    event: EventFull;
}

/** Simple placeholder shown for tabs that aren't wired to real data yet. */
function ComingSoon({ label }: { label: string }) {
    return (
        <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-800 text-slate-500">
            <p className="text-sm font-medium">
                {label} — coming soon
            </p>

            <p className="text-xs text-slate-600">
                This tab will be wired up to TBA data in a follow-up.
            </p>
        </div>
    );
}

function EventTabContent({ eventKey, tab, }: EventKeyProps) {
    switch (tab) {
        case EventTab.Overview:
            return <EventOverview information={mockInformation} webcasts={mockWebcasts} />

        case EventTab.Matches:
            return <ComingSoon label="Matches" />;

        case EventTab.Teams:
            return <ComingSoon label="Teams" />;

        case EventTab.Rankings:
            return <ComingSoon label="Rankings" />;

        case EventTab.Awards:
            return <ComingSoon label="Awards" />;

        case EventTab.Scout:
            // This one doesn't need TBA data at all — it just hands the
            // scouter off to the existing scout-prep flow with the
            // current event pre-selected via the `?event=` search param
            // that `scoutPageClient.tsx` already reads.
            return (
                <div className="flex h-48 flex-col items-center justify-center gap-4 rounded-2xl border border-slate-800 text-slate-400">
                    <p className="text-sm">
                        Ready to scout this event?
                    </p>

                    <Link
                        href={`/scout?event=${eventKey}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
                    >
                        Go to Scout Preparation
                    </Link>
                </div>
            );

        default:
            return null;
    }
}

export default function EventKeyClient({ eventKey, tab, event }: EventKeyProps) {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 overflow-x-hidden px-4 py-6 sm:px-6">
            <EventHeader eventKey={eventKey} activeTab={tab} event={event} />
            <EventTabContent eventKey={eventKey} tab={tab} event={event} />
        </main>
    );
}
