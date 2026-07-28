import { getEventOptions } from "@/lib/api/events";
import { getMatchAlliances, getMatchOptions } from "@/lib/api/match";
import ScoutPageClient from "./scoutPageClient";

interface Props {
  searchParams: Promise<{
    event?: string;
    match?: string;
  }>;
}

/**
 * `/scout` — scouting preparation screen (server component).
 *
 * Both `event` and `match` selection live in the URL search params, not
 * in client-only state. This mirrors the pattern already used by
 * `src/app/teams/page.tsx` (search param `q`): every time the scouter
 * picks a different event or match, `ScoutPageClient` pushes the new
 * params and Next.js re-runs this server component, which re-fetches
 * from TBA here. That's not just style — it's required, since the TBA
 * API key only exists server-side (see `tbaConfig` in
 * src/lib/config/config.ts), so match/alliance data can't be fetched
 * from the client at all.
 */
export default async function ScoutPage({ searchParams }: Props) {
  const params = await searchParams;

  // Every event available to scout. Falls back to an empty list further
  // down (in ScoutPageClient) if the TBA request failed.
  const events = await getEventOptions();

  // No `?event=` in the URL yet -> default to the first event in the
  // list, so the screen isn't empty on first load.
  const selectedEvent = params.event ?? events?.[0]?.key ?? null;

  // Every match of the selected event, each already carrying its own
  // red/blue team keys (see getMatchOptions in src/lib/api/match.ts).
  const matches = selectedEvent ? await getMatchOptions(selectedEvent) : null;

  // No `?match=` in the URL -> nothing selected yet, nothing to look up.
  const selectedMatch = params.match ?? null;

  // The six teams playing in the selected match, resolved to
  // number/nickname/avatar for the alliance panels. Team keys are pulled
  // from the match we already fetched above (`matches`) instead of
  // hitting TBA again for the match itself.
  const selectedMatchOption = selectedMatch
    ? matches?.find((match) => match.key === selectedMatch) ?? null
    : null;

  const alliances = selectedMatchOption
    ? await getMatchAlliances(
        selectedMatchOption.redTeamKeys,
        selectedMatchOption.blueTeamKeys,
        // Season year, needed for the team avatar lookup. Every event key
        // is prefixed with its year (e.g. "2025sao"), so it's pulled from
        // there instead of hardcoding a season.
        parseInt(selectedEvent!.slice(0, 4), 10)
      )
    : null;

  return (
    <ScoutPageClient
      eventsList={events}
      selectedEvent={selectedEvent}
      matches={matches}
      selectedMatch={selectedMatch}
      redAlliance={alliances?.red ?? []}
      blueAlliance={alliances?.blue ?? []}
    />
  );
}
