/**
 * `/teams` — team list (server component).
 *
 * Fetches every team for the season and hands the raw list + the
 * `?q=` search default down to the client component, which owns
 * favorite-filtering/search/sort + its own client-side infinite
 * scroll (see TeamsPageClient.tsx). Note: `groupTeamsByBatch` /
 * `TeamFilters` exist in the codebase for a batch-navigation UI but
 * aren't currently wired up here — infinite scroll is the mechanism
 * actually in use.
 */
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

    // null when the TBA request failed — TeamsPageClient handles an
    // empty list gracefully rather than throwing.
    const teams = await getTeamListItem();

    return (
        <TeamsPageClient
            initialTeams={teams ?? []}
            searchInitialValue = {params.q ?? ""}
        />
    );
}
