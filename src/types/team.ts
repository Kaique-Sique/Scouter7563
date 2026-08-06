/**
 * Team Screen Types
 *
 * App-level shapes consumed by `/teams` and `/teams/[team_key]`.
 * Adapted from raw `TBATeam*` payloads by `src/lib/api/teams.ts` —
 * see that file for the null -> undefined bridging rules.
 */

export interface Team { //  /teams/[team_key]
  team_number: number | null;
  nickname: string | null;

  organization?: string | null;

  city?: string | null;
  country?: string | null;

  rookie_year?: number | null;
  members?: number | null;

  website?: string;
  instagram?: string | null;
  youtube?: string | null;

  tba?: string;
  first?: string;

  avatar?: string | null;
  banner?: string | null;
}


export interface TeamListItem { //  /teams
  team_key: string | null;
  team_number: number | null;
  nickname: string | null;
  organization?: string | null;
  city?: string | null;
  country?: string | null;

  epa?: number | null;

  registered?: boolean | null;
  favorite?: boolean | null;

  avatar?: string | null;
}