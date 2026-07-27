import EventsPageClient from "./EventsPageClient";
import { getEventList } from "@/lib/api/events";
import { groupEventsByWeek } from "@/utils/groupEventsByWeek";

interface searchDefaultInput{
    searchParams: Promise<{
        q: string | null;
    }>;
}


export default async function EventsPage({
  searchParams,
}: searchDefaultInput) {

    const list = await getEventList();

    const params = await searchParams;

    
    const { grouped: initialEvents, sections: initialSections } = list
        ? groupEventsByWeek(list)
        : { grouped: {}, sections: [] };

    return (
        <EventsPageClient
            initialEvents={initialEvents}
            initialSections={initialSections}
            searchDefaultValue={params.q ?? ""}
        />
    );
}
