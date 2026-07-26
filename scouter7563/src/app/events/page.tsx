import EventsPageClient from "./EventsPageClient";
import { getEventList } from "@/lib/api/events";
import { groupEventsByWeek } from "@/utils/groupEventsByWeek";
import type { FilterType } from "@/components/events/EventFilters";
import type { EventListItem } from "@/types/events";

// Server Component: roda no servidor, então tem acesso a TBA_KEY / TBA_BASE_URL
// (essas env vars não têm prefixo NEXT_PUBLIC_, logo não existem no bundle do
// cliente — buscar no browser sempre resultaria em lista vazia).
export default async function EventsPage() {

    const list = await getEventList();

    const initialEvents: Record<FilterType, EventListItem[]> = list
        ? groupEventsByWeek(list)
        : {
            preseason: [],
            week1: [],
            week2: [],
            week3: [],
            week4: [],
            week5: [],
            week6: [],
            week7: [],
            championship: [],
            offseason: [],
        };

    return <EventsPageClient initialEvents={initialEvents} />;
}
