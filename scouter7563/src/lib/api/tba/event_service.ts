/**
 * TBA Event Endpoints
 *
 * Typed wrappers around every read-only `/event*` and `/events*` route
 * exposed by The Blue Alliance API (v3).
 *
 * @see https://www.thebluealliance.com/apidocs/v3
 */

import { _get } from "./tba_service";
import {
  TBAAward,
  TBAEvent,
  TBAEventAlliance,
  TBAEventDistrictPoints,
  TBAEventOPRs,
  TBAEventRankings,
  TBAEventSimple,
  TBAMatch,
  TBAMatchSimple,
  TBAMatchTimeseries,
  TBATeam,
  TBATeamEventStatus,
  TBATeamSimple,
} from "@/types/tba";

/* -------------------------------------------------------------------------- */
/*                                Event listing                               */
/* -------------------------------------------------------------------------- */

/** GET `/events/{year}` — every event held in a given season. */
export const getEventsByYear = (year: number) => _get<TBAEvent[]>(`/events/${year}`);

/** GET `/events/{year}/simple` */
export const getEventsByYearSimple = (year: number) =>
  _get<TBAEventSimple[]>(`/events/${year}/simple`);

/** GET `/events/{year}/keys` */
export const getEventsByYearKeys = (year: number) =>
  _get<string[]>(`/events/${year}/keys`);

/* -------------------------------------------------------------------------- */
/*                                Single event                                */
/* -------------------------------------------------------------------------- */

/** GET `/event/{event_key}` — full event profile (e.g. `2026sao`). */
export const getEvent = (eventKey: string) => _get<TBAEvent>(`/event/${eventKey}`);

/** GET `/event/{event_key}/simple` */
export const getEventSimple = (eventKey: string) =>
  _get<TBAEventSimple>(`/event/${eventKey}/simple`);

/** GET `/event/{event_key}/alliances` — playoff alliance selections. */
export const getEventAlliances = (eventKey: string) =>
  _get<TBAEventAlliance[]>(`/event/${eventKey}/alliances`);

/** GET `/event/{event_key}/insights` — season-specific insights blob. */
export const getEventInsights = (eventKey: string) =>
  _get<Record<string, unknown>>(`/event/${eventKey}/insights`);

/** GET `/event/{event_key}/oprs` — OPR / DPR / CCWM per team. */
export const getEventOPRs = (eventKey: string) =>
  _get<TBAEventOPRs>(`/event/${eventKey}/oprs`);

/** GET `/event/{event_key}/predictions` — match prediction data (unofficial). */
export const getEventPredictions = (eventKey: string) =>
  _get<Record<string, unknown>>(`/event/${eventKey}/predictions`);

/** GET `/event/{event_key}/rankings` — qualification rankings. */
export const getEventRankings = (eventKey: string) =>
  _get<TBAEventRankings>(`/event/${eventKey}/rankings`);

/** GET `/event/{event_key}/district_points` — district points awarded, if applicable. */
export const getEventDistrictPoints = (eventKey: string) =>
  _get<TBAEventDistrictPoints | null>(`/event/${eventKey}/district_points`);

/** GET `/event/{event_key}/awards` */
export const getEventAwards = (eventKey: string) =>
  _get<TBAAward[]>(`/event/${eventKey}/awards`);

/* -------------------------------------------------------------------------- */
/*                              Event → Teams                                 */
/* -------------------------------------------------------------------------- */

/** GET `/event/{event_key}/teams` */
export const getEventTeams = (eventKey: string) =>
  _get<TBATeam[]>(`/event/${eventKey}/teams`);

/** GET `/event/{event_key}/teams/simple` */
export const getEventTeamsSimple = (eventKey: string) =>
  _get<TBATeamSimple[]>(`/event/${eventKey}/teams/simple`);

/** GET `/event/{event_key}/teams/keys` */
export const getEventTeamsKeys = (eventKey: string) =>
  _get<string[]>(`/event/${eventKey}/teams/keys`);

/** GET `/event/{event_key}/teams/statuses` — status of every team at the event. */
export const getEventTeamsStatuses = (eventKey: string) =>
  _get<Record<string, TBATeamEventStatus>>(`/event/${eventKey}/teams/statuses`);

/* -------------------------------------------------------------------------- */
/*                             Event → Matches                                */
/* -------------------------------------------------------------------------- */

/** GET `/event/{event_key}/matches` */
export const getEventMatches = (eventKey: string) =>
  _get<TBAMatch[]>(`/event/${eventKey}/matches`);

/** GET `/event/{event_key}/matches/simple` */
export const getEventMatchesSimple = (eventKey: string) =>
  _get<TBAMatchSimple[]>(`/event/${eventKey}/matches/simple`);

/** GET `/event/{event_key}/matches/keys` */
export const getEventMatchesKeys = (eventKey: string) =>
  _get<string[]>(`/event/${eventKey}/matches/keys`);

/** GET `/event/{event_key}/matches/timeseries` — live match timeseries keys (if supported). */
export const getEventMatchesTimeseries = (eventKey: string) =>
  _get<TBAMatchTimeseries[]>(`/event/${eventKey}/matches/timeseries`);
