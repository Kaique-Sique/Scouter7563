/**
 * Mock fixtures for `/events/[event_key]`'s data-ready tabs.
 *
 * These exist purely so the tab components (and their real data
 * sub-components — `MatchesList`, `TeamsGrid`, `RankingsTable`,
 * `AwardsList`) can be exercised with realistic data before the real
 * TBA adapters exist. Each fixture matches its `Event*` type 1:1
 * (`src/types/events.ts`), so wiring the real API later is just a
 * matter of swapping the fixture import for the adapted API response
 * — no shape changes needed downstream.
 *
 * Not imported anywhere by default — the tabs default to `loading`.
 * To preview a tab with data during development:
 *
 *   import { mockMatches } from "./mockData";
 *   <EventMatchesTab matches={mockMatches} loading={false} />
 */
import { EventAward, EventMatch, EventRankingRow, EventTeamSummary } from "@/types/events";

export const mockMatches: EventMatch[] = [
    {
        key: "2026sao_qm1",
        match: "Qualification 1",
        status: "completed",
        red: [{ team: 7563, favorite: true }, { team: 1114 }, { team: 254 }],
        blue: [{ team: 118 }, { team: 2056 }, { team: 33 }],
        redScore: 112,
        blueScore: 98,
        scheduledTime: "2026-03-12T13:00:00-03:00",
    },
    {
        key: "2026sao_qm2",
        match: "Qualification 2",
        status: "live",
        red: [{ team: 1678 }, { team: 195 }, { team: 7563, favorite: true }],
        blue: [{ team: 4613 }, { team: 5172 }, { team: 971 }],
        redScore: null,
        blueScore: null,
        scheduledTime: "2026-03-12T13:12:00-03:00",
    },
    {
        key: "2026sao_qm3",
        match: "Qualification 3",
        status: "on_field",
        red: [{ team: 359 }, { team: 6969 }, { team: 5658 }],
        blue: [{ team: 7563, favorite: true }, { team: 4028 }, { team: 4482 }],
        redScore: null,
        blueScore: null,
        scheduledTime: "2026-03-12T13:24:00-03:00",
    },
    {
        key: "2026sao_qm4",
        match: "Qualification 4",
        status: "scheduled",
        red: [{ team: 6800 }, { team: 3374 }, { team: 172 }],
        blue: [{ team: 525 }, { team: 1746 }, { team: 7563, favorite: true }],
        redScore: null,
        blueScore: null,
        scheduledTime: "2026-03-12T13:36:00-03:00",
    },
];

export const mockTeams: EventTeamSummary[] = [
    { team_key: "frc7563", number: 7563, name: "SESI SENAI Megazord", city: "Jundiaí", country: "Brazil", favorite: true },
    { team_key: "frc1114", number: 1114, name: "Simbotics", city: "St. Catharines", country: "Canada" },
    { team_key: "frc254", number: 254, name: "The Cheesy Poofs", city: "San Jose", country: "USA" },
    { team_key: "frc118", number: 118, name: "Robonauts", city: "Houston", country: "USA" },
    { team_key: "frc2056", number: 2056, name: "OP Robotics", city: "Ontario", country: "Canada" },
    { team_key: "frc33", number: 33, name: "Killer Bees", city: "Rochester Hills", country: "USA" },
    { team_key: "frc1678", number: 1678, name: "Citrus Circuits", city: "Davis", country: "USA" },
    { team_key: "frc195", number: 195, name: "CyberKnights", city: "Cypress", country: "USA" },
    { team_key: "frc4613", number: 4613, name: "Barrage", city: "Windsor", country: "Canada" },
];

export const mockRankings: EventRankingRow[] = [
    { rank: 1, team_key: "frc7563", number: 7563, wins: 8, losses: 1, ties: 0, rankingPoints: 2.44, average: 118.3 },
    { rank: 2, team_key: "frc1114", number: 1114, wins: 7, losses: 2, ties: 0, rankingPoints: 2.22, average: 112.7 },
    { rank: 3, team_key: "frc254", number: 254, wins: 7, losses: 2, ties: 0, rankingPoints: 2.11, average: 109.5 },
    { rank: 4, team_key: "frc118", number: 118, wins: 6, losses: 3, ties: 0, rankingPoints: 1.89, average: 104.2 },
    { rank: 5, team_key: "frc2056", number: 2056, wins: 6, losses: 3, ties: 0, rankingPoints: 1.78, average: 101.8 },
    { rank: 6, team_key: "frc33", number: 33, wins: 5, losses: 4, ties: 0, rankingPoints: 1.56, average: 97.4 },
];

export const mockAwards: EventAward[] = [
    { id: "2026sao_award_0", name: "Chairman's Award", recipientTeamKey: "frc7563", recipientName: "SESI SENAI Megazord (7563)" },
    { id: "2026sao_award_1", name: "Winner", recipientTeamKey: "frc1114", recipientName: "Simbotics (1114)" },
    { id: "2026sao_award_2", name: "Engineering Inspiration Award", recipientTeamKey: "frc254", recipientName: "The Cheesy Poofs (254)" },
    { id: "2026sao_award_3", name: "Woodie Flowers Finalist Award", recipientTeamKey: null, recipientName: null, awardee: "Jane Doe" },
];
