/**
 * TBA API Status Model
 *
 * @see https://www.thebluealliance.com/apidocs/v3
 */

/** `/status` response — current TBA API health and season info. */
export interface TBAStatus {
  current_season: number;
  max_season: number;
  is_datafeed_down: boolean;
  down_events: string[];
  ios: { min_app_version: number; latest_app_version: number };
  android: { min_app_version: number; latest_app_version: number };
}
