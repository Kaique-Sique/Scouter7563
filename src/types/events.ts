/**
 * Events Screen Types
 *
 * App-level shapes consumed by `/events` and `/events/[event_key]`.
 * Adapted from raw `TBAEvent*` payloads by `src/lib/api/events.ts`.
 */
export enum EventWebcastType {
    YouTube = "youtube",
    Twitch = "twitch",
    TwitchChannel = "twitch_channel",
    FacebookLive = "facebook_live",
    Livestream = "livestream",
}


export interface WebcastUrl {
    type: EventWebcastType;
    channel: string;
    date?: string | null;
    url?: string | null;
}


export interface EventFull {
    event_key?: string | null;
    name?: string | null;
    city?: string | null;
    country?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    teams?: number | null;
    matchs?: number | null;
    favorite?: boolean | null;
    week?: string | null;
    postalCode?: string | null;
    location_name?: string | null;
    address?: string | null;

    teamsKeys?: string[] | null;
    matchsKeys?: string[] | null;

    webcasts?: WebcastUrl[] | null;
}

export interface EventListItem {// /events
    event_key?: string | null;
    name?: string | null;
    city?: string | null;
    country?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    teams?: number | null;
    favorite?: boolean | null;
    week?: string | null;
}

export interface EventOption {
  key: string;
  name: string;
}

/**
 * Tabs available on the `/events/[event_key]` page.
 *
 * Lives here (instead of inside `page.tsx`) so both the server page
 * (validates the `?tab=` search param) and the client components
 * (render the tab nav / switch content) can import the same enum
 * without reaching into a `page.tsx` file.
 */
export enum EventTab {
    Overview = "overview",
    Matches = "matches",
    Teams = "teams",
    Rankings = "rankings",
    Awards = "awards",
    Scout = "scout",
}

/**
 * Data-shape types for the `/events/[event_key]` sub-tabs (Matches /
 * Teams / Rankings / Awards).
 *
 * These are app-level shapes — same spirit as `EventFull` above — meant
 * to be produced by future adapters in `src/lib/api` from the raw
 * `TBAEventRankingRow` / `TBAAward` / `TBAMatchSimple` payloads
 * (`src/types/tba/event.ts`, `src/types/tba/match.ts`). Until that
 * wiring exists, each tab renders its loading skeleton and these types
 * only back local mock fixtures (see `mockData.ts` next to the tabs).
 */

/** One team's badge within a match alliance. Mirrors `MatchRowCard`'s team shape. */
export interface EventAllianceTeam {
    team: number;
    favorite?: boolean;
}

/** Match status shown as the pill on a match row. */
export type MatchStatus = "scheduled" | "on_field" | "live" | "completed";

/** A single match row for the Matches tab — ready for `MatchRowCard`. */
export interface EventMatch {
    key: string;
    match: string;
    status: MatchStatus;
    red: EventAllianceTeam[];
    blue: EventAllianceTeam[];
    redScore?: number | null;
    blueScore?: number | null;
    scheduledTime?: string | null;
}

/** A single team entry for the Teams tab grid. */
export interface EventTeamSummary {
    team_key: string | null;
    number: number | null;
    name: string | null;
    city: string | null;
    country: string | null;
    favorite: boolean;
}

/** A single row of the qualification rankings table. */
export interface EventRankingRow {
    rank: number;
    team_key: string;
    number: number;
    wins: number;
    losses: number;
    ties: number;
    rankingPoints: number;
    average: number;
}

/** A single award entry for the Awards tab. */
export interface EventAward {
    id: string;
    name: string;
    recipientTeamKey?: string | null;
    recipientName?: string | null;
    awardee?: string | null;
}