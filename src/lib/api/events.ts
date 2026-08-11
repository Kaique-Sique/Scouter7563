import * as tba from "@/lib/api/tba";
import { DashboardDataEvent } from "@/types/dashboard";
import { EventAward, EventFull, EventListItem, EventOption, EventRankingRow, EventWebcastType, WebcastUrl, } from "@/types/events";
import { TBAEvent } from "@/types/tba/event";

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

const WEBCAST_URLS: Record<EventWebcastType, string> = {
    [EventWebcastType.YouTube]:
        "https://www.youtube.com/watch?v={channel}",

    [EventWebcastType.Twitch]:
        "https://www.twitch.tv/{channel}",

    [EventWebcastType.TwitchChannel]:
        "https://www.twitch.tv/{channel}",

    [EventWebcastType.FacebookLive]:
        "https://www.facebook.com/{channel}",

    [EventWebcastType.Livestream]:
        "https://livestream.com/{channel}",
};


/**
 * this function adds the url to the webcasts array, based on the type and channel
 * @param webcasts 
 * @returns 
 */
function AddWebcastsUrls(
    webcasts: WebcastUrl[] | null): WebcastUrl[] | null {
    if (!webcasts) return null;

    try {

        return webcasts.map((webcast) => ({
            ...webcast,
            url: WEBCAST_URLS[webcast.type].replace(
                "{channel}",
                webcast.channel
            ),
        }));
    } catch {
        return null;
    }

}


/**
 * Fetches all from from The Blue Alliance API and adapts it to our app-level
 * in `Event` list shape (src/types/events.ts).
 *
 * This adapter step exists because `TBAEvent` (src/types/tba/event.ts)
 * mirrors the raw TBA response — several fields there are `string | null`
 * or `number | null` since TBA returns `null` for missing data. Our own
 * `Event` type uses optional fields (`field?: string`) instead, which
 * TypeScript does NOT treat as equivalent to `null`. Every `?? undefined`
 * below is bridging that gap.
 *
 * @returns The mapped `Event`, or `null` if the team doesn't exist / the
 * TBA request fails (network error, invalid key, TBA outage, etc).
 */
export async function getEventFull(event_key: string): Promise<EventFull | null> {
    try {

        /** Fetch all required data in parallel */
        const [teamKeys, matches, event] = await Promise.all([
            tba.getEventTeamsKeys(event_key),
            tba.getEventMatches(event_key),
            tba.getEvent(event_key)
        ]);

        return { // Map TBAEvent to our app-level Event shape
            event_key: event.key,
            name: event.name,
            city: event.city,
            country: event.country,
            startDate: event.start_date,
            endDate: event.end_date,
            teams: teamKeys.length ?? null,
            matchs: matches.length ?? null,
            favorite: null, // TODO - implement favorites using db
            week: WeekCalculator(event), // WeekCalculator returns string | undefined, which is compatible with Event.week
            postalCode: event.postal_code,
            location_name: event.location_name,
            address: event.address,

            teamsKeys: teamKeys,
            matchsKeys: matches.map(match => match.key),

            /** Webcasts for the event*/
            webcasts: AddWebcastsUrls(
                event.webcasts?.map((webcast) => ({
                    type: webcast.type as EventWebcastType,
                    channel: webcast.channel,
                    date: webcast.date ?? null,
                })) ?? null
            )
        }
    } catch {
        return null;
    }
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

/**
 * Fetches a list of available events for selection.
 * 
 * @return A list of event options, or null if the request fails.
 * 
 */
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

export async function getEventRankings(event_key: string): Promise<EventRankingRow[] | null> {
    try {
        const rankings = await tba.getEventRankings(event_key);

        if (!rankings || !rankings.rankings) {
            return null;
        }

        const rankingRows: EventRankingRow[] = [];


        for (const ranking of rankings.rankings) {
            rankingRows.push({
                team_key: ranking.team_key,
                number: ranking.team_key ? parseInt(ranking.team_key.replace("frc", "")) : null,
                rank: ranking.rank,
                wins: ranking.record?.wins ?? 0,
                losses: ranking.record?.losses ?? 0,
                ties: ranking.record?.ties ?? 0,
                rankingPoints: ranking.sort_orders?.[0] ?? 0,   // RP total (era ranking.dq, errado)
                average: ranking.qual_average ?? 0,             // era hardcoded em 0
            });
        }

        return rankingRows;

    } catch {
        return null;
    }

}


export async function getEventAwards(event_key: string): Promise<EventAward[] | null> {
    try {
        const awards = await tba.getEventAwards(event_key);

        if (!awards || !awards.length) {
            return null;
        }

        const EventAwards: EventAward[] = [];


        for (const award of awards) {
            const awardees = award.recipient_list
                ?.map(recipient => recipient.awardee)
                .filter(Boolean)
                .join(" - ");

            const recipientTeamKeys = award.recipient_list
                ?.map(recipient => recipient.team_key)
                .filter(Boolean)
                .join(" - ");

            EventAwards.push({
                id: award.award_type.toString(),
                name: award.name,
                recipientTeamKey: recipientTeamKeys?.replaceAll("frc", "") || null,
                awardee: awardees || null,
            });
        }

        return EventAwards;
    }
    catch {
        return null;
    }
}
