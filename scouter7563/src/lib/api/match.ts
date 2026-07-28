import { MatchOption } from "@/types/scout";
import * as tba from "@/lib/api/tba";

export async function getMatchOptions(event_key: string): Promise<MatchOption[] | null> 
{
    try {
        // Fetch the date from tba 
        const MatchsListTBA = await tba.getEventMatchesSimple(event_key)

        const MatchList: MatchOption[] = [];

        for (const match of MatchsListTBA) {
            MatchList.push({
                key: match.event_key,
                matchNumber: match.match_number,
                competitionLevel: match.comp_level
            });
        }

        return MatchList;

    } catch {
        // year not valid, or TBA request failed — the caller
        return null;
    }
}