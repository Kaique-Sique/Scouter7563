import * as tba from "@/lib/api/tba";
import { Team } from "@/types/team";
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

    return organization
        .split("/")
        .slice(0, 2)
        .join(" / ")
        .replace("&", " & ");
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
    // Fetch the team profile and its social media links in parallel —
    // they're independent requests, no reason to wait on one first.
    const [team, socialMedia] = await Promise.all([
      tba.getTeam(team_key),
      tba.getTeamSocialMedia(team_key),
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

      // NOTE: this URL pattern is not an officially documented TBA
      // endpoint and may not resolve for every team/year. The reliable
      // way to get an avatar is `tba.getTeamMediaByYear(team_key, year)`
      // and filtering for `type === "avatar"` (returns base64 image data).
      avatar: `https://www.thebluealliance.com/avatar/2026/frc${team.team_number}.png`,
    };
  } catch {
    // Team not found, invalid key, or TBA request failed — the caller
    // (src/app/teams/[team_key]/page.tsx) already handles a null team.
    return null;
  }
}