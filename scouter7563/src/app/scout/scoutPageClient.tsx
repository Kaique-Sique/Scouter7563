"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import EventSelector from "@/components/dashboard/EventSelector";
import MatchSelector, {
  Match,
} from "@/components/scout/MatchSelector";
import AlliancePanel from "@/components/scout/AlliancePanel";
import StartScoutButton from "@/components/scout/StartScoutButton";
import { CompetitionLevel } from "@/types/enums/CompetitionLevel";
import { EventOption } from "@/types/events";

const events = [
  {
    key: "2026brsp",
    name: "2026 Brazil Regional",
  },
  {
    key: "2026miket",
    name: "2026 Kettering University District",
  },
  {
    key: "2026gadal",
    name: "2026 Dalton District",
  },
];

const matches: Match[] = [
  {
    key: "2026brsp_qm1",
    matchNumber: 1,
    competitionLevel: CompetitionLevel.Qualification,
  },
  {
    key: "2026brsp_qm2",
    matchNumber: 2,
    competitionLevel: CompetitionLevel.Qualification,
  },
  {
    key: "2026brsp_qm3",
    matchNumber: 3,
    competitionLevel: CompetitionLevel.Qualification,
  },
];

const redAlliance = [
  {
    key: "frc7563",
    number: 7563,
    nickname: "Red",
    avatar: "",
    station: "R1",
  },
  {
    key: "frc1156",
    number: 1156,
    nickname: "Red",
    avatar: "",
    station: "R2",
  },
  {
    key: "frc6328",
    number: 6328,
    nickname: "Red",
    avatar: "",
    station: "R3",
  },
];

const blueAlliance = [
  {
    key: "frc7565",
    number: 7565,
    nickname: "Blue",
    avatar: "",
    station: "B1",
  },
  {
    key: "frc1884",
    number: 1884,
    nickname: "Blue",
    avatar: "",
    station: "B2",
  },
  {
    key: "frc1323",
    number: 1323,
    nickname: "Blue",
    avatar: "",
    station: "B3",
  },
];


export interface ScoutPageProps{
    EventsList: EventOption[] | null;

}

export default function ScoutPageClient({
    EventsList,
}: ScoutPageProps) {
  const router = useRouter();
  const events = EventsList ?? [];

  const [selectedEvent, setSelectedEvent] = useState(events[0].key);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const teamEntry = [
    ...redAlliance.map((team) => ({ ...team, alliance: "red" as const })),
    ...blueAlliance.map((team) => ({ ...team, alliance: "blue" as const })),
  ].find((team) => team.key === selectedTeam);

  const canStartScout = Boolean(selectedMatch && teamEntry);

  function handleStartScout() {
    if (!teamEntry) return;

    const params = new URLSearchParams({
      event: selectedEvent,
      match: selectedMatch,
      team: teamEntry.key,
      number: teamEntry.number.toString(),
      alliance: teamEntry.alliance,
      station: teamEntry.station,
    });

    router.push(`/scout/2025/auto?${params.toString()}`);
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-white">
          Scout Preparation
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Prepare and start a new scouting session.
        </p>
      </section>

      {/* Event */}
      <section>
        <EventSelector
          events={events}
          selectedEvent={selectedEvent}
          onChange={setSelectedEvent}
        />
      </section>

      {/* Match */}
      <section>
        <MatchSelector
          matches={matches}
          selectedMatch={selectedMatch}
          onChange={setSelectedMatch}
        />
      </section>

      {/* Alliances */}
      <section className="grid gap-6 lg:grid-cols-2">
        <AlliancePanel
          title="Red Alliance"
          alliance="red"
          teams={redAlliance}
          selectedTeam={selectedTeam}
          onSelectTeam={setSelectedTeam}
        />

        <AlliancePanel
          title="Blue Alliance"
          alliance="blue"
          teams={blueAlliance}
          selectedTeam={selectedTeam}
          onSelectTeam={setSelectedTeam}
        />
      </section>

      {/* Action */}
      <section className="flex justify-center pt-2">
        <StartScoutButton
          disabled={!canStartScout}
          onClick={handleStartScout}
        />
      </section>
    </main>
  );
}