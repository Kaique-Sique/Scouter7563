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
 * Fetches all from from The Blue Alliance API and adapts it to our app-level
 * in `TeamListItem` list shape (src/types/teams.ts).
 *
 * This adapter step exists because `TBATeams` (src/types/tba/teams.ts)
 * mirrors the raw TBA response — several fields there are `string | null`
 * or `number | null` since TBA returns `null` for missing data. Our own
 * `TeamsListItem` type uses optional fields (`field?: string`) instead, which
 * TypeScript does NOT treat as equivalent to `null`. Every `?? undefined`
 * below is bridging that gap.
 *
 * TBA paginates `/teams/{year}/{page_num}` at 500 teams per page, returning
 * `[]` once `page_num` goes past the last page. We walk every page (0, 1,
 * 2, ...) until that happens, so the caller gets the full team list for the
 * year in one call — this is also what lets `/teams` split into sections
 * of 500 teams each (see `groupTeamsByBatch`).
 *
 * @returns The mapped `TeamListItem[]`, or `null` if the team doesn't exist / the
 * TBA request fails (network error, TBA outage, etc).
 */
export async function getTeamListItem(): Promise<TeamListItem[] | null> {
  try {
    const teamList: TeamListItem[] = [];

    // Teto de segurança pra nunca dar loop infinito caso a TBA nunca
    // devolva `[]` por algum motivo — bem acima de qualquer quantidade
    // real de páginas hoje (~4-5 pra ~2000 times/ano).
    const MAX_PAGES = 50;

    for (let pageNum = 0; pageNum < MAX_PAGES; pageNum++) {
      const teamsTba = await tba.getTeamsByYearSimple(2025, pageNum);

      if (!teamsTba || teamsTba.length === 0) break;

      for (const team of teamsTba) {
        teamList.push({
          team_key: team.key,
          team_number: team.team_number,
          nickname: team.nickname,
          city: team.city,
          country: team.country,

          //epa?: 256.7,

          //registered?: boolean | null;
          //favorite?: boolean | null;

          avatar: await tba.getTeamAvatar(team.key, 2025),
        });
      }
    }

    return teamList;
  } catch {
    // Team not found,  or TBA request failed — the caller
    // (src/app/teams//page.tsx) already handles a null team.
    return null;
  }
}