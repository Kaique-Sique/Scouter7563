import EventsPageClient from "./EventsPageClient";
import { getEventList } from "@/lib/api/events";
import { groupEventsByWeek } from "@/utils/groupEventsByWeek";

// Server Component: roda no servidor, então tem acesso a TBA_KEY / TBA_BASE_URL
// (essas env vars não têm prefixo NEXT_PUBLIC_, logo não existem no bundle do
// cliente — buscar no browser sempre resultaria em lista vazia).
export default async function EventsPage() {

    const list = await getEventList();

    // grouped/sections são montados dinamicamente a partir dos dados: se uma
    // temporada tiver mais ou menos semanas, mais ou menos seções aparecem
    // automaticamente — não há mais uma lista fixa de "week1..week7".
    const { grouped: initialEvents, sections: initialSections } = list
        ? groupEventsByWeek(list)
        : { grouped: {}, sections: [] };

    return (
        <EventsPageClient
            initialEvents={initialEvents}
            initialSections={initialSections}
        />
    );
}
