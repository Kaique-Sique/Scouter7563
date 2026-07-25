/**
 * TBA Match Endpoints
 *
 * Typed wrappers around every read-only `/match*` route exposed by
 * The Blue Alliance API (v3).
 *
 * @see https://www.thebluealliance.com/apidocs/v3
 */

import { _get } from "./tba_service";
import { TBAMatch, TBAMatchSimple, TBAMatchTimeseries, TBAMatchZebra } from "@/types/tba";

/** GET `/match/{match_key}` — full match payload (e.g. `2026sao_qm12`). */
export const getMatch = (matchKey: string) => _get<TBAMatch>(`/match/${matchKey}`);

/** GET `/match/{match_key}/simple` */
export const getMatchSimple = (matchKey: string) =>
  _get<TBAMatchSimple>(`/match/${matchKey}/simple`);

/** GET `/match/{match_key}/timeseries` — live per-second data (rare, season-specific). */
export const getMatchTimeseries = (matchKey: string) =>
  _get<TBAMatchTimeseries[]>(`/match/${matchKey}/timeseries`);

/** GET `/match/{match_key}/zebra_motionworks` — on-field robot tracking, if recorded. */
export const getMatchZebra = (matchKey: string) =>
  _get<TBAMatchZebra | null>(`/match/${matchKey}/zebra_motionworks`);
