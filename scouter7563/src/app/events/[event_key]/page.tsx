import { notFound } from "next/navigation";
import EventKeyClient from "./EventKeyClient";
import { getEvent } from "@/lib/api/tba";

export enum EventTab {
    Overview = "overview",
    Matches = "matches",
    Teams = "teams",
    Rankings = "rankings",
    Awards = "awards",
    Scout = "scout",
}

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

    const event = await getEvent(event_key);

    if (!event) {
        notFound();
    }

    const validTab = Object.values(EventTab).includes(tab as EventTab)
        ? (tab as EventTab)
        : EventTab.Overview;

    return (
        <EventKeyClient
            eventKey={event_key}
            //event={event}
            tab={validTab}
        />
    );
}