import * as tba from "@/lib/api/tba";
import { Team, TeamListItem } from "@/types/team";
import { TBATeamMedia } from "@/types/tba";

/**
 * Maps a TBA `social_media` entry's `type` to a URL builder. TBA only
 * gives us `{ type, foreign_key }` (e.g. `{ type: "instagram-profile",
 * foreign_key: "megazord7563" }`) — never a ready-made link — so we
 * reconstruct the URL per platform here.
 */
const SOCIAL_URL_BUILDERS: Record<string, (foreignKey: string) => string> = {
  "instagram-profile": (key) => `https://instagram.com/${key}`,
  "youtube-channel": (key) => `https://youtube.com/channel/${key}`,
  "twitter-profile": (key) => `https://twitter.com/${key}`,
  "facebook-profile": (key) => `https://facebook.com/${key}`,
  "github-profile": (key) => `https://github.com/${key}`,
};

/** Finds the first social media entry of a given `type` and builds its URL. */
function findSocialUrl(media: TBATeamMedia[], type: string): string | undefined {
  const entry = media.find((m) => m.type === type);
  if (!entry) return undefined;
  return SOCIAL_URL_BUILDERS[type]?.(entry.foreign_key);
}


/**
 * TBA's team `name` field is really "Sponsor A / Sponsor B / School",
 * slash-separated, and can get long. This keeps only the first two
 * segments for display and collapses the rest into a "+N" suffix
 * (e.g. "Sponsor A / Sponsor B +3") so it fits in cards/headers.
 */
function organizationFormater(organization: string) {
  if (!organization) return organization;

  const sponsors = organization.split("/");

  const visible = sponsors
    .slice(0, 2)
    .join(" / ");

  visible.replace("&", " & ")

  return sponsors.length > 2
    ? `${visible} +${sponsors.length - 2}`
    : visible;
}

/**
 * Fetches a team from The Blue Alliance and adapts it to our app-level
 * `Team` shape (src/types/team.ts).
 *
 * This adapter step exists because `TBATeam` (src/types/tba/team.ts)
 * mirrors the raw TBA response — several fields there are `string | null`
 * or `number | null` since TBA returns `null` for missing data. Our own
 * `Team` type uses optional fields (`field?: string`) instead, which
 * TypeScript does NOT treat as equivalent to `null`. Every `?? undefined`
 * below is bridging that gap.
 *
 * @param team_key TBA team key, e.g. `"frc7563"`.
 * @returns The mapped `Team`, or `null` if the team doesn't exist / the
 * TBA request fails (network error, invalid key, TBA outage, etc).
 */
export async function getTeam(team_key: string): Promise<Team | null> {
  try {
    // Fetch the team profile, its social media links, and its avatar in
    // parallel — three independent TBA requests, no reason to chain them.
    const [team, socialMedia, avatar] = await Promise.all([
      tba.getTeam(team_key),
      tba.getTeamSocialMedia(team_key),
      tba.getTeamAvatar(team_key, 2025),
    ]);

    return {
      team_number: team.team_number,

      // TBA's `nickname` can be null for some inactive/very old teams —
      // fall back to the legal team `name`, which is always present.
      nickname: team.nickname ?? team.name,

      organization: organizationFormater(team.name),

      // `city` / `country` are `string | null` on TBATeam; our `Team`
      // wants `string | undefined`, so swap null -> undefined.
      city: team.city ?? undefined,
      country: team.country ?? undefined,

      rookie_year: team.rookie_year ?? undefined,

      website: team.website ?? undefined,

      // Pulled from TBA's real social_media list — not the team's data
      // if it doesn't have that platform linked on TBA.
      instagram: findSocialUrl(socialMedia, "instagram-profile"),
      youtube: findSocialUrl(socialMedia, "youtube-channel"),

      tba: `https://www.thebluealliance.com/team/${team.team_number}`,
      first: `https://frc-events.firstinspires.org/team/${team.team_number}`,

      // Real avatar pulled from TBA's media endpoint (base64 -> data URI).
      // `null` when the team has no avatar set for that year.
      avatar: avatar ?? undefined,
    };
  } catch {
    // Team not found, invalid key, or TBA request failed — the caller
    // (src/app/teams/[team_key]/page.tsx) already handles a null team.
    return null;
  }
}


/**
 * Fetches every team from The Blue Alliance for a season and adapts them
 * to our app-level `TeamListItem` list shape (src/types/team.ts).
 *
 * This adapter step exists because `TBATeamSimple` (src/types/tba/team.ts)
 * mirrors the raw TBA response — several fields there are `string | null`
 * since TBA returns `null` for missing data. Our own `TeamListItem` type
 * mirrors that nullability directly, so no `?? undefined` bridging is
 * needed here (unlike `getTeam` above).
 *
 * Two things changed from the first version of this function:
 *
 * 1. It used to fetch a single page (`pageNum`) and stop. TBA paginates
 *    `/teams/{year}/{page_num}` in fixed chunks of 500 — with only page 0
 *    fetched, the list silently capped at the first 500 teams. This
 *    now walks pages 0, 1, 2... until TBA returns an empty page.
 * 2. It used to call `tba.getTeamAvatar(team.key, ...)` for every single
 *    team, one at a time, inside the loop — that's hundreds of sequential,
 *    blocking network requests (each downloading a base64 image) before
 *    the page could render at all. That was the actual cause of the slow
 *    load, more than DOM size. Avatars are dropped from the list entirely;
 *    they're only ever fetched for the one team being viewed, on the
 *    team profile page (`getTeam` above).
 *
 * @returns The mapped `TeamListItem[]`, or `null` if the TBA request
 * failed (network error, TBA outage, etc).
 */
export async function getTeamListItem(year: number = 2025): Promise<TeamListItem[] | null> {
  try {
    const teamList: TeamListItem[] = [];

    // Batch a few pages at a time instead of one-by-one so we don't pay a
    // full round-trip latency per page, but still stop as soon as we hit
    // the empty page that marks the end of the list.
    const BATCH_SIZE = 4;
    let pageNum = 0;
    let done = false;

    while (!done) {
      const batchPages = Array.from({ length: BATCH_SIZE }, (_, i) => pageNum + i);

      const batchResults = await Promise.all(
        batchPages.map((page) => tba.getTeamsByYearSimple(year, page))
      );

      for (const pageTeams of batchResults) {
        if (pageTeams.length === 0) {
          done = true;
          break;
        }

        for (const team of pageTeams) {

          teamList.push({
            team_key: team.key,
            team_number: team.team_number,
            nickname: team.nickname,
            organization: organizationFormater(team.name),
            city: team.city,
            country: team.country,
          });
        }
      }

      pageNum += BATCH_SIZE;
    }

    return teamList;
  } catch {
    // Year not valid, or TBA request failed — the caller
    // (src/app/teams/page.tsx) already handles a null list.
    return null;
  }
}