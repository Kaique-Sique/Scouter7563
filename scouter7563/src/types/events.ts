/**
 * Events Screen Types
 *
 * App-level shapes consumed by `/events` and `/events/[event_key]`.
 * Adapted from raw `TBAEvent*` payloads by `src/lib/api/events.ts`.
 */

export interface EventWebcast {
    type: string;
    channel: string;
    date?: string | null;
}

export interface Event {
    event_key?: string | null;
    name?: string | null;
    city?: string | null;
    country?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    teams?: number | null;
    favorite?: boolean | null;
    week?: string | null;
    postalCode?: string | null;
    location_name?: string | null;
    address?: string | null;

    teamsKeys?: string[] | null;
    matchsKeys?: string[] | null;

    webcasts?: EventWebcast[] | null;
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