export interface EventItem {
    event_key: string;
    name: string;
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    teams: number;
    favorite?: boolean;
}
