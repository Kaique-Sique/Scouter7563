import TeamsPageClient from "./TeamsPageClient";
import { getTeamListItem } from "@/lib/api/teams";

export default async function TeamsPage() {

    const teams = await getTeamListItem();

    return (
        <TeamsPageClient
            initialTeams={teams ?? []}
        />
    );
}
