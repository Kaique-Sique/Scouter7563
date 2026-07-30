/**
 * Dashboard Screen Types
 *
 * App-level shapes consumed by `/` (src/app/) — this screen uses datas from event like matchs number, 
 * teams number, and how many matchs was already played showing it visualy
 */

export interface DashboardDataEvent
{
    EventKey: String | null;

    MatchsKeys: String[] | null;
    teamsKeys: String[] | null;

    PlayedMatches: String[] | null;
}