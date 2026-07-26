import { EventListItem } from "@/types/events";

/**
 * Mapeia os valores de `event_type_string` do TBA (usados pelo WeekCalculator
 * quando `event.week` é null) para os ids de seção do app.
 *
 * Ajuste as chaves conforme os valores reais que a TBA retorna para o seu
 * conjunto de eventos (preseason, offseason, championship etc).
 */
const EVENT_TYPE_TO_FILTER: Record<string, string> = {
    "Preseason": "preseason",
    "Offseason": "offseason",
    "Championship Subdivision": "championship",
    "Championship Division": "championship",
    "Championship Finals": "championship",
    "Festival of Champions": "championship",
};

/**
 * Metadados de uma seção (usados tanto pelos pills de filtro quanto pelo
 * cabeçalho de cada seção na página de eventos).
 *
 * `order` é só um número usado para ordenar as seções na tela — não é
 * persistido em lugar nenhum.
 */
export interface EventSectionMeta {
    id: string;
    label: string;
    gold?: boolean;
    order: number;
}

const WEEK_ID_RE = /^week(\d+)$/;

/**
 * Constrói os metadados (label, ordem, destaque dourado) de uma seção a
 * partir do seu id. Diferente da versão antiga, "weekN" não é mais limitado
 * a N <= 7 — qualquer número de semana presente nos dados gera sua própria
 * seção.
 */
function buildSectionMeta(id: string): EventSectionMeta {
    if (id === "preseason") {
        return { id, label: "Preseason", order: 0 };
    }

    if (id === "championship") {
        return { id, label: "Championship", gold: true, order: 9000 };
    }

    if (id === "offseason") {
        return { id, label: "Offseason", order: 9999 };
    }

    const weekMatch = WEEK_ID_RE.exec(id);
    if (weekMatch) {
        const weekNumber = Number(weekMatch[1]);
        return { id, label: `Week ${weekNumber}`, order: 100 + weekNumber };
    }

    // fallback para tipos de evento não mapeados: ainda cria uma seção,
    // só não sabemos exatamente onde encaixar na ordem
    return { id, label: id, order: 5000 };
}

/**
 * Resolve a string vinda de `WeekCalculator` (EventListItem.week) para
 * um id de seção (ex: "week3", "preseason", "championship", "offseason").
 *
 * - Se for numérica, veio de `event.week` (TBA, 0-indexed) -> soma 1 para
 *   virar "week1", "week2", ... sem limite superior fixo, já que o número
 *   de semanas muda de temporada pra temporada.
 * - Se não for numérica, veio de `event.event_type_string` -> procura no
 *   mapa acima, com fallback para "offseason".
 */
function resolveFilterType(week: string | undefined): string {
    if (!week) return "offseason";

    if (/^\d+$/.test(week)) {
        const weekNumber = Number(week) + 1;
        if (weekNumber >= 1) {
            return `week${weekNumber}`;
        }
        return "offseason";
    }

    return EVENT_TYPE_TO_FILTER[week] ?? "offseason";
}

/**
 * Agrupa uma lista flat de `EventListItem` em duas coisas:
 * - `grouped`: os eventos por id de seção (só ids que de fato têm eventos)
 * - `sections`: os metadados dessas seções, já ordenados para renderização
 *
 * Diferente da versão antiga, o conjunto de seções não é mais fixo
 * (preseason + week1..week7 + championship + offseason): ele é montado
 * dinamicamente a partir dos dados recebidos, então temporadas com mais ou
 * menos semanas simplesmente geram mais ou menos seções, sem precisar mexer
 * em código.
 */
export function groupEventsByWeek(events: EventListItem[]): {
    grouped: Record<string, EventListItem[]>;
    sections: EventSectionMeta[];
} {
    const grouped: Record<string, EventListItem[]> = {};

    for (const event of events) {
        if (event.week === undefined || event.week === null) continue;

        const id = resolveFilterType(event.week);

        if (!grouped[id]) {
            grouped[id] = [];
        }

        grouped[id].push(event);
    }

    const sections = Object.keys(grouped)
        .map(buildSectionMeta)
        .sort((a, b) => a.order - b.order);

    return { grouped, sections };
}
