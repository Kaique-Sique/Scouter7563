import TeamsPageClient from "./TeamsPageClient";
import { getTeamListItem } from "@/lib/api/teams";

interface searchDefaultInput{
    searchParams: Promise<{
        q: string | null;
    }>;
}


export default async function TeamsPage({
  searchParams,
}: searchDefaultInput) {

    const params = await searchParams;

    const teams = await getTeamListItem();

    return (
        <TeamsPageClient
            initialTeams={teams ?? []}
            searchInitialValue = {params.q ?? ""}
        />
    );
}
