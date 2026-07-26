import { TeamListItem } from "@/types/team";

/** Quantos times cada seção carrega antes de "virar a página" pra próxima. */
const BATCH_SIZE = 500;

/**
 * Metadados de uma seção de times (mesmo formato usado pelas seções de
 * `/events` — id/label/order — só sem o destaque dourado, que não faz
 * sentido aqui).
 */
export interface TeamSectionMeta {
    id: string;
    label: string;
    order: number;
}

/**
 * Agrupa uma lista flat de `TeamListItem` em blocos de até `BATCH_SIZE`
 * (500) times, na mesma ordem em que chegaram (a API já devolve os times
 * ordenados por número).
 *
 * Assim como `groupEventsByWeek`, o número de seções é 100% dinâmico: com
 * 1200 times isso gera 3 seções (500 + 500 + 200); com 400, só 1. Nada é
 * fixo/hardcoded.
 */
export function groupTeamsByBatch(teams: TeamListItem[]): {
    grouped: Record<string, TeamListItem[]>;
    sections: TeamSectionMeta[];
} {
    const grouped: Record<string, TeamListItem[]> = {};
    const sections: TeamSectionMeta[] = [];

    for (let start = 0; start < teams.length; start += BATCH_SIZE) {
        const chunk = teams.slice(start, start + BATCH_SIZE);

        if (chunk.length === 0) continue;

        const id = `batch${sections.length + 1}`;

        const first = chunk[0];
        const last = chunk[chunk.length - 1];

        // Rótulo baseado no range real de números dos times do lote (ex:
        // "1 – 494"), já que nem todo número de 1 a 500 necessariamente
        // existe — mais honesto do que um range fixo tipo "1-500".
        const label =
            first.team_number != null && last.team_number != null
                ? `${first.team_number} – ${last.team_number}`
                : `Teams ${start + 1}–${start + chunk.length}`;

        grouped[id] = chunk;
        sections.push({ id, label, order: sections.length });
    }

    return { grouped, sections };
}
