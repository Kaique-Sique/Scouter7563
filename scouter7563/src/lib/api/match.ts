import * as tba from "@/lib/api/tba";
import { AllianceTeam, MatchAlliances, MatchOption } from "@/types/scout";

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

/**
 * Station labels in TBA's `team_keys` array order. TBA guarantees this
 * ordering — index 0 of an alliance is always station 1, index 1 is
 * station 2, index 2 is station 3 — it is never re-sorted by team number
 * or anything else, so a plain positional lookup is safe here.
 */
const RED_STATIONS = ["R1", "R2", "R3"] as const;
const BLUE_STATIONS = ["B1", "B2", "B3"] as const;

/* -------------------------------------------------------------------------- */
/*                                Match listing                               */
/* -------------------------------------------------------------------------- */

/**
 * Fetches every match of an event from The Blue Alliance and adapts it to
 * our app-level `MatchOption` list shape (src/types/scout.ts), for use in
 * the match dropdown on `/scout`.
 *
 * Each `MatchOption` carries `redTeamKeys` / `blueTeamKeys` straight from
 * TBA's `alliances` block. We keep them here — even though the dropdown
 * itself doesn't render them — so that once the scouter picks a match,
 * `getMatchAlliances` below can fetch team details directly without a
 * second "get this match" round-trip to TBA.
 *
 * @param event_key TBA event key, e.g. `"2025sao"`.
 * @returns The mapped `MatchOption[]`, or `null` if the event doesn't
 * exist / the TBA request fails (network error, invalid key, TBA outage,
 * etc). The caller (src/app/scout/page.tsx) handles `null` by showing no
 * matches for the event.
 */
export async function getMatchOptions(
  event_key: string
): Promise<MatchOption[] | null> {
  try {
    // Fetch the date from tba
    const MatchsListTBA = await tba.getEventMatchesSimple(event_key);

    const MatchList: MatchOption[] = [];

    for (const match of MatchsListTBA) {
      MatchList.push({
        // NOTE: this used to read `match.event_key` (the *event's* key,
        // identical for every match) instead of `match.key` (the match's
        // own key, e.g. "2025sao_qm12"). That collapsed every option in
        // the dropdown onto the same value and broke selection entirely.
        key: match.key,
        matchNumber: match.match_number,
        competitionLevel: match.comp_level,

        redTeamKeys: match.alliances.red.team_keys,
        blueTeamKeys: match.alliances.blue.team_keys,
      });
    }

    return MatchList;
  } catch {
    // Event key not valid, or TBA request failed — the caller
    // (src/app/scout/page.tsx) handles with null showing no matches.
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                              Match → Alliances                             */
/* -------------------------------------------------------------------------- */

/**
 * Fetches the six teams (three red, three blue) playing in a given match
 * and adapts them to the app-level `AllianceTeam` shape (src/types/scout.ts)
 * used by the alliance panels on `/scout`.
 *
 * Team keys come from the already-fetched `MatchOption` (see
 * `getMatchOptions` above) rather than being looked up again — the match
 * payload TBA gives us for the whole event already contains every match's
 * `alliances.{red,blue}.team_keys`, so re-fetching the match here would
 * just repeat work we've already done.
 *
 * @param redTeamKeys TBA team keys for the red alliance, in station order
 * (e.g. `["frc7563", "frc254", "frc1114"]` -> R1, R2, R3).
 * @param blueTeamKeys TBA team keys for the blue alliance, in station order.
 * @param year Season year, used to look up each team's avatar for that year
 * (avatars are stored per-season on TBA, same as in `getTeam` in teams.ts).
 * @returns The mapped `MatchAlliances`, or `null` if any of the six TBA
 * team lookups fails (network error, TBA outage, etc). The caller
 * (src/app/scout/page.tsx) handles `null` by showing empty alliance
 * panels rather than a half-populated match.
 */
export async function getMatchAlliances(
  redTeamKeys: string[],
  blueTeamKeys: string[],
  year: number
): Promise<MatchAlliances | null> {
  try {
    const [red, blue] = await Promise.all([
      getAllianceTeams(redTeamKeys, RED_STATIONS, year),
      getAllianceTeams(blueTeamKeys, BLUE_STATIONS, year),
    ]);

    return { red, blue };
  } catch {
    return null;
  }
}

/**
 * Fetches team number / nickname / avatar for one alliance's three teams
 * in parallel — three independent TBA requests per team, none of them
 * depend on each other — and pairs each team with its station label by
 * array position (see `RED_STATIONS` / `BLUE_STATIONS` above).
 */
async function getAllianceTeams(
  teamKeys: string[],
  stations: readonly string[],
  year: number
): Promise<AllianceTeam[]> {
  return Promise.all(
    teamKeys.map(async (teamKey, index) => {
      const [team, avatar] = await Promise.all([
        tba.getTeamSimple(teamKey),
        tba.getTeamAvatar(teamKey, year),
      ]);

      return {
        key: team.key,
        number: team.team_number,

        // TBA's `nickname` can be null for some inactive/very old teams —
        // fall back to the legal team `name`, which is always present.
        nickname: team.nickname ?? team.name,

        // `getTeamAvatar` resolves to `""` when the team has no avatar
        // set for that year — `TeamCard` already renders a number badge
        // fallback for a falsy `avatar`, so no extra `??` needed here.
        avatar: avatar ?? "",

        station: stations[index] ?? "",
      };
    })
  );
}
