export interface Event { // /events/[event_key]
    // TODO: add real values to this interface waiting /events/[event_key] screen
    name?: string | null;

    city?: string | null;
    country?: string | null;
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