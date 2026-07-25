/**
 * TBA District Models
 *
 * @see https://www.thebluealliance.com/apidocs/v3
 */

/** District list entry — `/districts/{year}`. */
export interface TBADistrict {
  abbreviation: string;
  display_name: string;
  key: string;
  year: number;
}

/** A team's ranking within a district — `/district/{district_key}/rankings`. */
export interface TBADistrictRanking {
  team_key: string;
  rank: number;
  rookie_bonus?: number;
  point_total: number;
  event_points: {
    event_key: string;
    district_cmp: boolean;
    total: number;
    alliance_points: number;
    elim_points: number;
    award_points: number;
    qual_points: number;
  }[];
}
