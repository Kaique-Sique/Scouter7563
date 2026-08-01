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