/**
 * TBA Event Models
 *
 * @see https://www.thebluealliance.com/apidocs/v3
 */

import { EventType, PlayoffType, RankingSortOrderInfo, Webcast } from "./common";

/** Lightweight event payload — returned by `/simple` endpoints. */
export interface TBAEventSimple {
  key: string;
  name: string;
  event_code: string;
  event_type: EventType;
  district: TBADistrictListItem | null;
  city: string | null;
  state_prov: string | null;
  country: string | null;
  start_date: string;
  end_date: string;
  year: number;
}

/** Full event payload — returned by `/event/{event_key}`. */
export interface TBAEvent extends TBAEventSimple {
  short_name: string | null;
  event_type_string: string;
  week: number | null;
  address: string | null;
  postal_code: string | null;
  gmaps_place_id: string | null;
  gmaps_url: string | null;
  lat: number | null;
  lng: number | null;
  location_name: string | null;
  timezone: string | null;
  website: string | null;
  first_event_id: string | null;
  first_event_code: string | null;
  webcasts: Webcast[];
  division_keys: string[];
  parent_event_key: string | null;
  playoff_type: PlayoffType | null;
  playoff_type_string: string | null;
}

/** District pointer embedded in event payloads. */
export interface TBADistrictListItem {
  abbreviation: string;
  display_name: string;
  key: string;
  year: number;
}

/** A single team's ranking row — `/event/{event_key}/rankings`. */
export interface TBAEventRankingRow {
  team_key: string;
  rank: number;
  record?: { wins: number; losses: number; ties: number } | null;
  qual_average?: number | null;
  matches_played: number;
  dq: number;
  sort_orders: number[] | null;
}

/** `/event/{event_key}/rankings` response. */
export interface TBAEventRankings {
  rankings: TBAEventRankingRow[] | null;
  extra_stats_info?: RankingSortOrderInfo[];
  sort_order_info: RankingSortOrderInfo[] | null;
}

/** `/event/{event_key}/oprs` response (OPR/DPR/CCWM per team). */
export interface TBAEventOPRs {
  oprs: Record<string, number>;
  dprs: Record<string, number>;
  ccwms: Record<string, number>;
}

/** A single alliance's picks — `/event/{event_key}/alliances`. */
export interface TBAEventAlliance {
  name: string | null;
  backup: { in: string; out: string } | null;
  declines: string[];
  picks: string[];
  status: {
    playoff_average?: number | null;
    level: string;
    record: { wins: number; losses: number; ties: number } | null;
    current_level_record: { wins: number; losses: number; ties: number } | null;
    status: string;
  } | null;
}

/** District points awarded to a team at an event. */
export interface TBAEventDistrictPoints {
  points: Record<
    string,
    {
      alliance_points: number;
      award_points: number;
      elim_points: number;
      qual_points: number;
      total: number;
    }
  >;
  tiebreakers: Record<string, { highest_qual_scores: number[]; qual_wins: number }>;
}

/** A team's competition status at a specific event — `/team/{key}/event/{key}/status`. */
export interface TBATeamEventStatus {
  qual: {
    num_teams: number | null;
    ranking: TBAEventRankingRow | null;
    sort_order_info: RankingSortOrderInfo[] | null;
    status: string | null;
  } | null;
  alliance: {
    name: string | null;
    number: number | null;
    backup: { in: string; out: string } | null;
    pick: number | null;
  } | null;
  playoff: {
    level: string | null;
    current_level_record: { wins: number; losses: number; ties: number } | null;
    record: { wins: number; losses: number; ties: number } | null;
    status: string | null;
  } | null;
  alliance_status_str: string | null;
  playoff_status_str: string | null;
  overall_status_str: string | null;
  next_match_key: string | null;
  last_match_key: string | null;
}

/** An award earned at an event or by a team — `/event/{key}/awards`. */
export interface TBAAward {
  name: string;
  award_type: number;
  event_key: string;
  recipient_list: { team_key: string | null; awardee: string | null }[];
  year: number;
}
