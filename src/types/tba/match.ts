/**
 * TBA Match Models
 *
 * @see https://www.thebluealliance.com/apidocs/v3
 */

import { AllianceColor, CompetitionLevel } from "./common";

/** One color's alliance data within a match. */
export interface TBAMatchAlliance {
  score: number | null;
  team_keys: string[];
  surrogate_team_keys: string[];
  dq_team_keys: string[];
}

/** `alliances` block shared by simple and full match payloads. */
export interface TBAMatchAlliances {
  red: TBAMatchAlliance;
  blue: TBAMatchAlliance;
}

/** Lightweight match payload — returned by `/simple` endpoints. */
export interface TBAMatchSimple {
  key: string;
  comp_level: CompetitionLevel;
  set_number: number;
  match_number: number;
  alliances: TBAMatchAlliances;
  winning_alliance: AllianceColor | "" | null;
  event_key: string;
  time: number | null;
  predicted_time: number | null;
  actual_time: number | null;
}

/**
 * Full match payload — returned by `/match/{match_key}`.
 *
 * `score_breakdown` is game-specific (its shape changes every season), so it
 * is intentionally left as an untyped record. Narrow it per-season where consumed.
 */
export interface TBAMatch extends TBAMatchSimple {
  post_result_time: number | null;
  score_breakdown: Record<string, unknown> | null;
  videos: { type: string; key: string }[];
}

/** A single frame of `/match/{match_key}/timeseries` data (season-specific shape). */
export type TBAMatchTimeseries = Record<string, unknown>;

/** Zebra MotionWorks tracking data — `/match/{match_key}/zebra_motionworks`. */
export interface TBAMatchZebra {
  key: string;
  times: number[];
  alliances: {
    red: TBAZebraTeam[];
    blue: TBAZebraTeam[];
  };
}

export interface TBAZebraTeam {
  team_key: string;
  xs: (number | null)[];
  ys: (number | null)[];
}
