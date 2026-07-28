/**
 * Scout Screen Types
 *
 * App-level shapes consumed by `/scout` (src/app/scout) — the pre-match
 * screen where a scouter picks an event, a match, and which of the six
 * competing teams they're about to scout.
 *
 * These are adapted from raw TBA payloads by `src/lib/api/match.ts`, the
 * same way `src/types/team.ts` / `src/types/events.ts` are adapted by
 * their own `lib/api/*` files.
 */

import { CompetitionLevel } from "./tba/common";

/** The two alliance colors a team can be assigned to for a match. */
export type AllianceColor = "red" | "blue";

/**
 * A single team as it appears inside an alliance panel on `/scout`:
 * enough to render `TeamCard` (number, nickname, avatar) and to know
 * which driver station it's in ("R1"..."R3", "B1"..."B3").
 *
 * `station` mirrors TBA's `team_keys` ordering — index 0 of an alliance
 * is always station 1, index 1 is station 2, index 2 is station 3.
 */
export interface AllianceTeam {
  key: string;
  number: number;
  nickname: string;
  avatar: string;
  station: string;
}

/** Both alliances competing in a single match, ready to render. */
export interface MatchAlliances {
  red: AllianceTeam[];
  blue: AllianceTeam[];
}

/**
 * One selectable entry in the match dropdown (`MatchSelector`).
 *
 * `redTeamKeys` / `blueTeamKeys` are carried along from the TBA match
 * payload so that once the user actually picks a match, we already know
 * which six teams to fetch details for — no second "get this match"
 * round-trip is needed, only the per-team lookups (see
 * `getMatchAlliances` in `src/lib/api/match.ts`).
 */
export interface MatchOption {
  key: string | null;
  matchNumber: number | null;
  competitionLevel: CompetitionLevel | null;
  redTeamKeys: string[];
  blueTeamKeys: string[];
}
