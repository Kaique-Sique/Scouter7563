/**
 * TBA Common Types
 *
 * Shared primitives reused across multiple TBA (The Blue Alliance) API v3
 * resources: teams, events, matches and districts.
 *
 * @see https://www.thebluealliance.com/apidocs/v3
 */

/**
 * Numeric event type as returned by TBA.
 * Mirrors `event_type` in the TBA v3 `Event` model.
 */
export enum EventType {
  Regional = 0,
  District = 1,
  DistrictChampionship = 2,
  ChampionshipDivision = 3,
  ChampionshipFinals = 4,
  DistrictChampionshipDivision = 5,
  FoC = 6,
  Remote = 7,
  Offseason = 99,
  Preseason = 100,
  Unlabeled = -1,
}

/** Playoff bracket type, as returned by TBA (`playoff_type`). */
export enum PlayoffType {
  Bracket8Team = 0,
  Bracket16Team = 1,
  Bracket4Team = 2,
  AvgScore8Team = 3,
  RoundRobin6Team = 4,
  DoubleElim8Team = 5,
  BestOf3Final = 6,
  BestOf5Final = 7,
  Custom = 8,
}

/** Competition level for a match, matches `comp_level` in TBA. */
export type CompetitionLevel = "qm" | "ef" | "qf" | "sf" | "f";

/** Alliance color used throughout TBA match/alliance payloads. */
export type AllianceColor = "red" | "blue";

/** `[lat, lng]` style webcast/location pair used by TBA `Event.webcasts`. */
export interface Webcast {
  type: string;
  channel: string;
  date?: string | null;
  file?: string | null;
}

/** Ranking sort order entry, as used in `EventRanking.sort_order_info`. */
export interface RankingSortOrderInfo {
  name: string;
  precision: number;
}
