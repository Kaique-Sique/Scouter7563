/**
 * TBA Team Models
 *
 * @see https://www.thebluealliance.com/apidocs/v3
 */

/** Lightweight team payload — returned by `/simple` endpoints. */
export interface TBATeamSimple {
  key: string;
  team_number: number;
  nickname: string | null;
  name: string;
  city: string | null;
  state_prov: string | null;
  country: string | null;
}

/** Full team payload — returned by `/team/{team_key}`. */
export interface TBATeam extends TBATeamSimple {
  address: string | null;
  postal_code: string | null;
  gmaps_place_id: string | null;
  gmaps_url: string | null;
  lat: number | null;
  lng: number | null;
  location_name: string | null;
  website: string | null;
  rookie_year: number | null;
  motto: string | null;
  home_championship: Record<string, string> | null;
}

/** A single season/year a team competed in a district. */
export interface TBATeamDistrictHistory {
  district_key: string;
}

/** Robot name/year entry — `/team/{team_key}/robots`. */
export interface TBATeamRobot {
  year: number;
  robot_name: string;
  key: string;
  team_key: string;
}

/** Social media / other links — `/team/{team_key}/social_media`. */
export interface TBATeamMedia {
  type: string;
  foreign_key: string;
  details?: Record<string, unknown>;
  preferred?: boolean;
}

export interface TBAAvatarDetails {
  base64Image: string;
}