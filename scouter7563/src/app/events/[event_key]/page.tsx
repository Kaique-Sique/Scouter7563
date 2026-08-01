import { notFound } from "next/navigation";
import EventKeyClient from "./EventKeyClient";
import { getEvent } from "@/lib/api/tba";

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
    const { tab = "overview" } = await searchParams;

    const event = await getEvent(event_key);

    if (event_key !== "2025brba") {
        notFound();
    }

    return (
        <EventKeyClient
            eventKey={event_key}
        />
    );
}