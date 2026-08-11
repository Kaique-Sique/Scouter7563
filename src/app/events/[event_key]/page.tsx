/**
 * `/events/[event_key]` — server entry point for a single event's page.
 *
 * Responsibilities:
 *  - Resolve the dynamic `event_key` route param and the optional
 *    `?tab=` search param (Next.js 15+ App Router hands both to us as
 *    Promises, so they need to be awaited before use).
 *  - Fetch the event from TBA and 404 (via `notFound()`) when it
 *    doesn't exist.
 *  - Validate `?tab=` against the known `EventTab` values, falling
 *    back to "overview" for anything unrecognized (typos, stale
 *    bookmarks, someone hand-editing the URL, etc).
 *
 * The actual tab UI (header + nav + per-tab content) lives in the
 * client component below — this file only decides *which* tab is
 * active and hands that down as a prop.
 */

import { notFound } from "next/navigation";
import EventKeyClient from "./EventKeyClient";
import { EventTab } from "@/types/events";
import { getEventFull } from "@/lib/api/events";
import { getTeamSummary } from "@/lib/api/teams";

interface EventPageProps {
    params: Promise<{
        event_key: string;
    }>;
    searchParams: Promise<{
        tab?: string;
    }>;
}

export default async function EventPage({
    params,
    searchParams,
}: EventPageProps) {
    const { event_key } = await params;
    const { tab = EventTab.Overview } = await searchParams;

    const event = await getEventFull(event_key);
    const teams = await getTeamSummary(event_key);

    if (!event) {
        notFound();
    }

    // `Object.values` on a string enum includes the string values
    // themselves, so this doubles as a runtime allow-list check.
    const validTab = Object.values(EventTab).includes(tab as EventTab)
        ? (tab as EventTab)
        : EventTab.Overview;

    return (
        <EventKeyClient
            eventKey={event_key}
            event={event}
            tab={validTab}
            teams={teams}
        />
    );
}
