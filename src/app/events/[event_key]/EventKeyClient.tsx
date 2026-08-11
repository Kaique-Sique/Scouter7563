"use client";

/**
 * EventKeyClient
 *
 * Client shell for `/events/[event_key]`. Renders the header/tab nav
 * and then swaps in a per-tab content block based on the `tab` prop
 * that `page.tsx` already validated against `EventTab`.
 *
 * Scope note: this only wires up the TAB STRUCTURE + DESIGN. Every
 * tab besides "Overview" and "Scout" (which just deep-links into the
 * existing `/scout` flow) renders a design-finished skeleton mockup
 * of its future layout — hooking each one up to real TBA data
 * (matches, teams, rankings, awards) is deliberately left for a
 * follow-up so this change stays focused on the screen's visuals,
 * not the API layer.
 */

import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";
import EventHeader from "@/components/events/event/EventHeader";
import { EventFull, EventRankingRow, EventTab, EventTeamSummary, EventWebcastType, WebcastUrl} from "@/types/events";
import EventOverview from "./EventOverviewTab";
import EventMatchesTab from "./EventMatchesTab";
import EventTeamsTab from "./EventTeamsTab";
import EventRankingsTab from "./EventRankingsTab";
import EventAwardsTab from "./EventAwardsTab";
import { EventInfoProps } from "@/components/events/event/EventInfo";
import { getTeamSummary } from "@/lib/api/teams";


export const mockInformation: EventInfoProps = {
    location: "São Paulo",
    venue: "SESI Vila Leopoldina",
    date: "Mar 12–15",
    country: "Brazil",
    week: "Week 2",
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
    teams: EventTeamSummary[] | null;
    rankings: EventRankingRow[] | null;
}

async function EventTabContent({ eventKey, tab, event, teams, rankings }: EventKeyProps) {
    switch (tab) {
        case EventTab.Overview:
            return <EventOverview event={event} />

        case EventTab.Matches:
            return <EventMatchesTab  />;

        case EventTab.Teams:
            return <EventTeamsTab teams={teams ? teams : []} loading={false} />;

        case EventTab.Rankings:
            return <EventRankingsTab rankings={rankings ? rankings : []} loading={false}/>;

        case EventTab.Awards:
            return <EventAwardsTab />;

        case EventTab.Scout:
            // This one doesn't need TBA data at all — it just hands the
            // scouter off to the existing scout-prep flow with the
            // current event pre-selected via the `?event=` search param
            // that `scoutPageClient.tsx` already reads.
            return (
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 px-6 py-12 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                        <ClipboardList className="h-6 w-6" />
                    </div>

                    <div>
                        <p className="text-base font-medium text-white">
                            Ready to scout this event?
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Jump into the scouting flow with this event already selected.
                        </p>
                    </div>

                    <Link
                        href={`/scout?event=${eventKey}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
                    >
                        Go to Scout Preparation
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            );

        default:
            return null;
    }
}

export default function EventKeyClient({ eventKey, tab, event, teams, rankings}: EventKeyProps) {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 overflow-x-hidden px-4 py-6 sm:px-6">
            <EventHeader eventKey={eventKey} activeTab={tab} event={event} />
            <EventTabContent eventKey={eventKey} tab={tab} event={event} teams={teams} rankings={rankings} />
        </main>
    );
}
