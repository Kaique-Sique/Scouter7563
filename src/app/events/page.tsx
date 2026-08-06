/**
 * `/events` — event list (server component).
 *
 * Fetches every event for the season, groups it by week/section on
 * the server (see `groupEventsByWeek`), and hands the pre-grouped
 * data + the `?q=` search default down to the client component,
 * which owns filtering/search/favorites from there.
 */
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

    // `list` is null when the TBA request failed — fall back to no
    // events/sections instead of throwing, same pattern as `/teams`.
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
