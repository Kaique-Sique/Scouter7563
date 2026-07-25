/**
 * TBA District Endpoints
 *
 * Typed wrappers around every read-only `/district*` and `/districts*`
 * route exposed by The Blue Alliance API (v3).
 *
 * @see https://www.thebluealliance.com/apidocs/v3
 */

import { _get } from "./tba_service";
import {
  TBADistrict,
  TBADistrictRanking,
  TBAEvent,
  TBAEventSimple,
  TBATeam,
  TBATeamSimple,
} from "@/types/tba";

/** GET `/districts/{year}` — every district active in a given season. */
export const getDistrictsByYear = (year: number) =>
  _get<TBADistrict[]>(`/districts/${year}`);

/** GET `/district/{district_key}/events` (e.g. `2026fim`). */
export const getDistrictEvents = (districtKey: string) =>
  _get<TBAEvent[]>(`/district/${districtKey}/events`);

/** GET `/district/{district_key}/events/simple` */
export const getDistrictEventsSimple = (districtKey: string) =>
  _get<TBAEventSimple[]>(`/district/${districtKey}/events/simple`);

/** GET `/district/{district_key}/events/keys` */
export const getDistrictEventsKeys = (districtKey: string) =>
  _get<string[]>(`/district/${districtKey}/events/keys`);

/** GET `/district/{district_key}/rankings` — district points standings. */
export const getDistrictRankings = (districtKey: string) =>
  _get<TBADistrictRanking[]>(`/district/${districtKey}/rankings`);

/** GET `/district/{district_key}/teams` */
export const getDistrictTeams = (districtKey: string) =>
  _get<TBATeam[]>(`/district/${districtKey}/teams`);

/** GET `/district/{district_key}/teams/simple` */
export const getDistrictTeamsSimple = (districtKey: string) =>
  _get<TBATeamSimple[]>(`/district/${districtKey}/teams/simple`);

/** GET `/district/{district_key}/teams/keys` */
export const getDistrictTeamsKeys = (districtKey: string) =>
  _get<string[]>(`/district/${districtKey}/teams/keys`);
