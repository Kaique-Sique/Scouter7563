/**
 * TBA Team Endpoints
 *
 * Typed wrappers around every read-only `/team*` and `/teams*` route
 * exposed by The Blue Alliance API (v3).
 *
 * @see https://www.thebluealliance.com/apidocs/v3
 */

import { _get } from "./tba_service";
import {
  TBAAward,
  TBADistrictListItem,
  TBAEventSimple,
  TBAEvent,
  TBAMatch,
  TBAMatchSimple,
  TBATeam,
  TBATeamEventStatus,
  TBATeamMedia,
  TBATeamRobot,
  TBATeamSimple,
} from "@/types/tba";

/* -------------------------------------------------------------------------- */
/*                                Team listing                                */
/* -------------------------------------------------------------------------- */

/** GET `/teams/{page_num}` — all teams (paginated, 500 per page). */
export const getTeams = (pageNum: number) => _get<TBATeam[]>(`/teams/${pageNum}`);

/** GET `/teams/{page_num}/simple` */
export const getTeamsSimple = (pageNum: number) =>
  _get<TBATeamSimple[]>(`/teams/${pageNum}/simple`);

/** GET `/teams/{page_num}/keys` */
export const getTeamsKeys = (pageNum: number) =>
  _get<string[]>(`/teams/${pageNum}/keys`);

/** GET `/teams/{year}/{page_num}` — teams that competed in a given year. */
export const getTeamsByYear = (year: number, pageNum: number) =>
  _get<TBATeam[]>(`/teams/${year}/${pageNum}`);

/** GET `/teams/{year}/{page_num}/simple` */
export const getTeamsByYearSimple = (year: number, pageNum: number) =>
  _get<TBATeamSimple[]>(`/teams/${year}/${pageNum}/simple`);

/** GET `/teams/{year}/{page_num}/keys` */
export const getTeamsByYearKeys = (year: number, pageNum: number) =>
  _get<string[]>(`/teams/${year}/${pageNum}/keys`);

/* -------------------------------------------------------------------------- */
/*                                Single team                                 */
/* -------------------------------------------------------------------------- */

/** GET `/team/{team_key}` — full team profile (e.g. `frc7563`). */
export const getTeam = (teamKey: string) => _get<TBATeam>(`/team/${teamKey}`);

/** GET `/team/{team_key}/simple` */
export const getTeamSimple = (teamKey: string) =>
  _get<TBATeamSimple>(`/team/${teamKey}/simple`);

/** GET `/team/{team_key}/years_participated` */
export const getTeamYearsParticipated = (teamKey: string) =>
  _get<number[]>(`/team/${teamKey}/years_participated`);

/** GET `/team/{team_key}/districts` — every district a team has competed in. */
export const getTeamDistricts = (teamKey: string) =>
  _get<TBADistrictListItem[]>(`/team/${teamKey}/districts`);

/** GET `/team/{team_key}/robots` — robot names by year. */
export const getTeamRobots = (teamKey: string) =>
  _get<TBATeamRobot[]>(`/team/${teamKey}/robots`);

/** GET `/team/{team_key}/social_media` */
export const getTeamSocialMedia = (teamKey: string) =>
  _get<TBATeamMedia[]>(`/team/${teamKey}/social_media`);

/* -------------------------------------------------------------------------- */
/*                              Team → Events                                 */
/* -------------------------------------------------------------------------- */

/** GET `/team/{team_key}/events` — every event a team has ever attended. */
export const getTeamEvents = (teamKey: string) =>
  _get<TBAEvent[]>(`/team/${teamKey}/events`);

/** GET `/team/{team_key}/events/simple` */
export const getTeamEventsSimple = (teamKey: string) =>
  _get<TBAEventSimple[]>(`/team/${teamKey}/events/simple`);

/** GET `/team/{team_key}/events/keys` */
export const getTeamEventsKeys = (teamKey: string) =>
  _get<string[]>(`/team/${teamKey}/events/keys`);

/** GET `/team/{team_key}/events/{year}` */
export const getTeamEventsByYear = (teamKey: string, year: number) =>
  _get<TBAEvent[]>(`/team/${teamKey}/events/${year}`);

/** GET `/team/{team_key}/events/{year}/simple` */
export const getTeamEventsByYearSimple = (teamKey: string, year: number) =>
  _get<TBAEventSimple[]>(`/team/${teamKey}/events/${year}/simple`);

/** GET `/team/{team_key}/events/{year}/keys` */
export const getTeamEventsByYearKeys = (teamKey: string, year: number) =>
  _get<string[]>(`/team/${teamKey}/events/${year}/keys`);

/** GET `/team/{team_key}/event/{event_key}/status` — team's status at one event. */
export const getTeamEventStatus = (teamKey: string, eventKey: string) =>
  _get<TBATeamEventStatus>(`/team/${teamKey}/event/${eventKey}/status`);

/** GET `/team/{team_key}/event/{event_key}/awards` */
export const getTeamEventAwards = (teamKey: string, eventKey: string) =>
  _get<TBAAward[]>(`/team/${teamKey}/event/${eventKey}/awards`);

/* -------------------------------------------------------------------------- */
/*                              Team → Matches                                */
/* -------------------------------------------------------------------------- */

/** GET `/team/{team_key}/event/{event_key}/matches` */
export const getTeamEventMatches = (teamKey: string, eventKey: string) =>
  _get<TBAMatch[]>(`/team/${teamKey}/event/${eventKey}/matches`);

/** GET `/team/{team_key}/event/{event_key}/matches/simple` */
export const getTeamEventMatchesSimple = (teamKey: string, eventKey: string) =>
  _get<TBAMatchSimple[]>(`/team/${teamKey}/event/${eventKey}/matches/simple`);

/** GET `/team/{team_key}/event/{event_key}/matches/keys` */
export const getTeamEventMatchesKeys = (teamKey: string, eventKey: string) =>
  _get<string[]>(`/team/${teamKey}/event/${eventKey}/matches/keys`);

/** GET `/team/{team_key}/matches/{year}` — all of a team's matches in a season. */
export const getTeamMatchesByYear = (teamKey: string, year: number) =>
  _get<TBAMatch[]>(`/team/${teamKey}/matches/${year}`);

/** GET `/team/{team_key}/matches/{year}/simple` */
export const getTeamMatchesByYearSimple = (teamKey: string, year: number) =>
  _get<TBAMatchSimple[]>(`/team/${teamKey}/matches/${year}/simple`);

/** GET `/team/{team_key}/matches/{year}/keys` */
export const getTeamMatchesByYearKeys = (teamKey: string, year: number) =>
  _get<string[]>(`/team/${teamKey}/matches/${year}/keys`);

/* -------------------------------------------------------------------------- */
/*                              Team → Awards                                 */
/* -------------------------------------------------------------------------- */

/** GET `/team/{team_key}/awards` — every award a team has ever won. */
export const getTeamAwards = (teamKey: string) =>
  _get<TBAAward[]>(`/team/${teamKey}/awards`);

/** GET `/team/{team_key}/awards/{year}` */
export const getTeamAwardsByYear = (teamKey: string, year: number) =>
  _get<TBAAward[]>(`/team/${teamKey}/awards/${year}`);

/** GET `/team/{team_key}/media/{year}` — photos, CAD, videos, etc. */
export const getTeamMediaByYear = (teamKey: string, year: number) =>
  _get<TBATeamMedia[]>(`/team/${teamKey}/media/${year}`);
