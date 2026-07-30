import * as tba from "@/lib/api/tba";
import { DashboardDataEvent } from "@/types/dashboard";
import { Event, EventListItem, EventOption, } from "@/types/events";
import { TBAEvent } from "@/types/tba/event";

/** TODO: implement api on /teams using this function below */
export async function getEvent(event_key: string): Promise<Event | null> { return null; }


/**
 * test if week is null
 * case null return -> event_type
 * case true return -> week
 * 
 * @param event TBA event
 * @returns 
 */
function WeekCalculator(event: TBAEvent): string | undefined {
    if (!event) return undefined;

    // event.week é 0-indexed (semana 0 = Week 1), então `0` é um valor
    // válido e não pode ser tratado como falsy — senão eventos da Week 1
    // caem incorretamente no event_type_string.
    if (event.week === null || event.week === undefined) {
        return event.event_type_string;
    }
    return `${event.week}`;
}


/**
 * Fetches all from from The Blue Alliance API and adapts it to our app-level
 * in `EventListItem` list shape (src/types/events.ts).
 *
 * This adapter step exists because `TBAEvent` (src/types/tba/event.ts)
 * mirrors the raw TBA response — several fields there are `string | null`
 * or `number | null` since TBA returns `null` for missing data. Our own
 * `EventListItem` type uses optional fields (`field?: string`) instead, which
 * TypeScript does NOT treat as equivalent to `null`. Every `?? undefined`
 * below is bridging that gap.
 *
 * @returns The mapped `EventListItem[]`, or `null` if the team doesn't exist / the
 * TBA request fails (network error, invalid key, TBA outage, etc).
 */
export async function getEventList(): Promise<EventListItem[] | null> {
    try {
        // Fetch the date from tba 
        const eventsListTBA = await tba.getEventsByYear(2025);

        const eventList: EventListItem[] = [];

        for (const event of eventsListTBA) {
            eventList.push({
                event_key: event.key,
                name: event.name,
                city: event.city,
                country: event.country,
                startDate: event.start_date,
                endDate: event.end_date,
                week: WeekCalculator(event)
            });
        }

        return eventList

    } catch {
        // year not valid, or TBA request failed — the caller
        // (src/app/events/page.tsx) handles with null showing no events.
        return null;
    }
}

export async function getEventOptions(): Promise<EventOption[] | null> {
    try {
        // Fetch the date from tba 
        const eventsListTBA = await tba.getEventsByYearSimple(2025);

        const eventList: EventOption[] = [];

        for (const event of eventsListTBA) {
            eventList.push({
                key: event.key,
                name: event.name,
            });
        }

        return eventList;

    } catch {
        // year not valid, or TBA request failed — the caller
        return null;
    }
}

/**
 * Fetches the aggregated stats the dashboard needs for a single event:
 * every team key, every match key, and which of those matches already
 * have a result. This is the only data source `/` is allowed to read
 * from — the dashboard screen never calls TBA directly, it goes through
 * this function (see `DashboardDataEvent` in src/types/dashboard.ts).
 *
 * @param event_key TBA event key (e.g. "2025sao").
 * @returns Aggregated `DashboardDataEvent`, or `null` if the key is
 * invalid or the TBA request fails — the caller (src/app/page.tsx)
 * falls back to an empty dashboard in that case.
 */
export async function getEventDataDashboard(event_key: string): Promise<DashboardDataEvent | null> {
    try {
        // Fetch teams and matches in parallel — independent TBA endpoints.
        const [teamKeys, matches] = await Promise.all([
            tba.getEventTeamsKeys(event_key),
            tba.getEventMatches(event_key)
        ]);

        // A match only counts as "played" once TBA has a post-result
        // timestamp for it — `null` still means scheduled/in-progress.
        const playedMatchKeys = matches
            .filter(match => match.post_result_time !== null)
            .map(match => match.key);

        return {
            eventKey: event_key,

            matchKeys: matches.map(match => match.key),
            teamKeys: teamKeys,

            playedMatchKeys: playedMatchKeys,
        };

    } catch {
        // key not valid, or TBA request failed — the caller
        return null;
    }
}