import TeamsPageClient from "./TeamsPageClient";
import { getTeamListItem } from "@/lib/api/teams";
import { groupTeamsByBatch } from "@/utils/groupTeamsByBatch";

// Server Component: roda no servidor, então tem acesso a TBA_KEY / TBA_BASE_URL
// (essas env vars não têm prefixo NEXT_PUBLIC_, logo não existem no bundle do
// cliente — buscar no browser sempre resultaria em lista vazia).
export default async function TeamsPage() {

    const list = await getTeamListItem();

    // grouped/sections são montados dinamicamente a partir dos dados: a cada
    // 500 times uma nova seção nasce (ou some, se não houver dados) — igual
    // ao /events, só que por quantidade em vez de semana.
    const { grouped: initialTeams, sections: initialSections } = list
        ? groupTeamsByBatch(list)
        : { grouped: {}, sections: [] };

    return (
        <TeamsPageClient
            initialTeams={initialTeams}
            initialSections={initialSections}
        />
    );
}
