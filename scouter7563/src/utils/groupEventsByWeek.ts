import { FilterType } from "@/components/events/EventFilters";
import { EventListItem } from "@/types/events";

/**
 * Mapeia os valores de `event_type_string` do TBA (usados pelo WeekCalculator
 * quando `event.week` é null) para os FilterType do app.
 *
 * Ajuste as chaves conforme os valores reais que a TBA retorna para o seu
 * conjunto de eventos (preseason, offseason, championship etc).
 */
const EVENT_TYPE_TO_FILTER: Record<string, FilterType> = {
    "Preseason": "preseason",
    "Offseason": "offseason",
    "Championship Subdivision": "championship",
    "Championship Division": "championship",
    "Championship Finals": "championship",
    "Festival of Champions": "championship",
};

/**
 * Resolve a string vinda de `WeekCalculator` (EventListItem.week) para
 * um `FilterType` válido.
 *
 * - Se for numérica, veio de `event.week` (TBA, 0-indexed) -> soma 1 para
 *   bater com "week1"..."week7". Fora desse range cai em "offseason".
 * - Se não for numérica, veio de `event.event_type_string` -> procura no
 *   mapa acima, com fallback para "offseason".
 */
function resolveFilterType(week: string | undefined): FilterType {
    if (!week) return "offseason";

    if (/^\d+$/.test(week)) {
        const weekNumber = Number(week) + 1;
        if (weekNumber >= 1 && weekNumber <= 7) {
            return `week${weekNumber}` as FilterType;
        }
        return "offseason";
    }

    return EVENT_TYPE_TO_FILTER[week] ?? "offseason";
}

/**
 * Agrupa uma lista flat de `EventListItem` no shape
 * `Record<FilterType, EventListItem[]>` esperado pelo estado da EventsPage.
 */
export function groupEventsByWeek(
    events: EventListItem[]
): Record<FilterType, EventListItem[]> {
    const grouped: Record<FilterType, EventListItem[]> = {
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

    for (const event of events) {
        if(event.week !== undefined && event.week !== null)
        {
            grouped[resolveFilterType(event.week)].push(event);
        }
    }

    return grouped;
}