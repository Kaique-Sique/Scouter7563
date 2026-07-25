<div align="center">

# TBA API Client

**Internal TypeScript client for The Blue Alliance API (v3)**

</div>

This folder replaces the old FastAPI TBA proxy. It talks to [The Blue Alliance](https://www.thebluealliance.com/apidocs/v3) directly from the server (Server Components, Route Handlers, Server Actions) — there is no HTTP layer to deploy or maintain separately, and nothing here is ever called from the browser.

## Usage

```ts
import { getTeam, getEventMatches, getEventRankings } from "@/lib/api/tba";

const team = await getTeam("frc7563");
const matches = await getEventMatches("2026sao");
const rankings = await getEventRankings("2026sao");
```

Every function returns a `Promise` of a typed model from [`src/types/tba`](../../../types/tba). All requests go through the shared [`_get`](./tba_service.ts) helper, which:

- Prefixes calls with `TBA_BASE_URL`
- Attaches the `X-TBA-Auth-Key` header from `TBA_KEY`
- Throws on any non-2xx response

Both variables are validated on boot by [`src/lib/config/config.ts`](../../config/config.ts) — see the [root README](../../../../README.md#environment-variables) for setup.

## File Layout

| File | Contents |
|---|---|
| `tba_service.ts` | Low-level `_get<T>()` fetch helper — auth header, error handling |
| `team_service.ts` | `/team*` and `/teams*` endpoints |
| `event_service.ts` | `/event*` and `/events*` endpoints |
| `match_service.ts` | `/match*` endpoints |
| `district_service.ts` | `/district*` and `/districts*` endpoints |
| `status_service.ts` | `/status` endpoint |
| `index.ts` | Barrel — import everything from `@/lib/api/tba` |

## Endpoint Reference

`{team_key}` looks like `frc7563`. `{event_key}` looks like `2026sao`. `{match_key}` looks like `2026sao_qm12`. `{district_key}` looks like `2026fim`.

### Teams

| Function | TBA Route |
|---|---|
| `getTeams(pageNum)` | `GET /teams/{page_num}` |
| `getTeamsSimple(pageNum)` | `GET /teams/{page_num}/simple` |
| `getTeamsKeys(pageNum)` | `GET /teams/{page_num}/keys` |
| `getTeamsByYear(year, pageNum)` | `GET /teams/{year}/{page_num}` |
| `getTeamsByYearSimple(year, pageNum)` | `GET /teams/{year}/{page_num}/simple` |
| `getTeamsByYearKeys(year, pageNum)` | `GET /teams/{year}/{page_num}/keys` |
| `getTeam(teamKey)` | `GET /team/{team_key}` |
| `getTeamSimple(teamKey)` | `GET /team/{team_key}/simple` |
| `getTeamYearsParticipated(teamKey)` | `GET /team/{team_key}/years_participated` |
| `getTeamDistricts(teamKey)` | `GET /team/{team_key}/districts` |
| `getTeamRobots(teamKey)` | `GET /team/{team_key}/robots` |
| `getTeamSocialMedia(teamKey)` | `GET /team/{team_key}/social_media` |
| `getTeamEvents(teamKey)` | `GET /team/{team_key}/events` |
| `getTeamEventsSimple(teamKey)` | `GET /team/{team_key}/events/simple` |
| `getTeamEventsKeys(teamKey)` | `GET /team/{team_key}/events/keys` |
| `getTeamEventsByYear(teamKey, year)` | `GET /team/{team_key}/events/{year}` |
| `getTeamEventsByYearSimple(teamKey, year)` | `GET /team/{team_key}/events/{year}/simple` |
| `getTeamEventsByYearKeys(teamKey, year)` | `GET /team/{team_key}/events/{year}/keys` |
| `getTeamEventStatus(teamKey, eventKey)` | `GET /team/{team_key}/event/{event_key}/status` |
| `getTeamEventAwards(teamKey, eventKey)` | `GET /team/{team_key}/event/{event_key}/awards` |
| `getTeamEventMatches(teamKey, eventKey)` | `GET /team/{team_key}/event/{event_key}/matches` |
| `getTeamEventMatchesSimple(teamKey, eventKey)` | `GET /team/{team_key}/event/{event_key}/matches/simple` |
| `getTeamEventMatchesKeys(teamKey, eventKey)` | `GET /team/{team_key}/event/{event_key}/matches/keys` |
| `getTeamMatchesByYear(teamKey, year)` | `GET /team/{team_key}/matches/{year}` |
| `getTeamMatchesByYearSimple(teamKey, year)` | `GET /team/{team_key}/matches/{year}/simple` |
| `getTeamMatchesByYearKeys(teamKey, year)` | `GET /team/{team_key}/matches/{year}/keys` |
| `getTeamAwards(teamKey)` | `GET /team/{team_key}/awards` |
| `getTeamAwardsByYear(teamKey, year)` | `GET /team/{team_key}/awards/{year}` |
| `getTeamMediaByYear(teamKey, year)` | `GET /team/{team_key}/media/{year}` |

### Events

| Function | TBA Route |
|---|---|
| `getEventsByYear(year)` | `GET /events/{year}` |
| `getEventsByYearSimple(year)` | `GET /events/{year}/simple` |
| `getEventsByYearKeys(year)` | `GET /events/{year}/keys` |
| `getEvent(eventKey)` | `GET /event/{event_key}` |
| `getEventSimple(eventKey)` | `GET /event/{event_key}/simple` |
| `getEventAlliances(eventKey)` | `GET /event/{event_key}/alliances` |
| `getEventInsights(eventKey)` | `GET /event/{event_key}/insights` |
| `getEventOPRs(eventKey)` | `GET /event/{event_key}/oprs` |
| `getEventPredictions(eventKey)` | `GET /event/{event_key}/predictions` |
| `getEventRankings(eventKey)` | `GET /event/{event_key}/rankings` |
| `getEventDistrictPoints(eventKey)` | `GET /event/{event_key}/district_points` |
| `getEventAwards(eventKey)` | `GET /event/{event_key}/awards` |
| `getEventTeams(eventKey)` | `GET /event/{event_key}/teams` |
| `getEventTeamsSimple(eventKey)` | `GET /event/{event_key}/teams/simple` |
| `getEventTeamsKeys(eventKey)` | `GET /event/{event_key}/teams/keys` |
| `getEventTeamsStatuses(eventKey)` | `GET /event/{event_key}/teams/statuses` |
| `getEventMatches(eventKey)` | `GET /event/{event_key}/matches` |
| `getEventMatchesSimple(eventKey)` | `GET /event/{event_key}/matches/simple` |
| `getEventMatchesKeys(eventKey)` | `GET /event/{event_key}/matches/keys` |
| `getEventMatchesTimeseries(eventKey)` | `GET /event/{event_key}/matches/timeseries` |

### Matches

| Function | TBA Route |
|---|---|
| `getMatch(matchKey)` | `GET /match/{match_key}` |
| `getMatchSimple(matchKey)` | `GET /match/{match_key}/simple` |
| `getMatchTimeseries(matchKey)` | `GET /match/{match_key}/timeseries` |
| `getMatchZebra(matchKey)` | `GET /match/{match_key}/zebra_motionworks` |

### Districts

| Function | TBA Route |
|---|---|
| `getDistrictsByYear(year)` | `GET /districts/{year}` |
| `getDistrictEvents(districtKey)` | `GET /district/{district_key}/events` |
| `getDistrictEventsSimple(districtKey)` | `GET /district/{district_key}/events/simple` |
| `getDistrictEventsKeys(districtKey)` | `GET /district/{district_key}/events/keys` |
| `getDistrictRankings(districtKey)` | `GET /district/{district_key}/rankings` |
| `getDistrictTeams(districtKey)` | `GET /district/{district_key}/teams` |
| `getDistrictTeamsSimple(districtKey)` | `GET /district/{district_key}/teams/simple` |
| `getDistrictTeamsKeys(districtKey)` | `GET /district/{district_key}/teams/keys` |

### Status

| Function | TBA Route |
|---|---|
| `getTBAStatus()` | `GET /status` |

## Notes

- **`score_breakdown`** on `TBAMatch`, and the payloads for `getEventInsights` / `getEventPredictions` / `getMatchTimeseries`, are intentionally untyped (`Record<string, unknown>`) — their shape changes every FRC season. Narrow them with a local type where they're actually consumed (e.g. a `2026ScoreBreakdown` type next to whichever component reads it).
- Prefer the `*Simple` / `*Keys` variants over the full payload when you only need a summary or list of keys — they're smaller and TBA computes them faster.
- `_get` throws a plain `Error` on any non-2xx response; wrap calls in `try/catch` (or a Next.js `error.tsx` boundary) rather than letting a single TBA outage crash a whole route.
