import EventHeader from "@/components/events/event/EventHeader";
import EventKeyClient from "./EventKeyClient";

interface searchDefaultInput{
    searchParams: Promise<{
        tab: string | null;
    }>;
}


export default async function TeamsPage({
    searchParams,
}: searchDefaultInput) {


    return (
        <EventKeyClient />
    );
}
