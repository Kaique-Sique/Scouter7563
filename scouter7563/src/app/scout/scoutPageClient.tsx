"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import EventSelector from "@/components/dashboard/EventSelector";
import AlliancePanel from "@/components/scout/AlliancePanel";
import StartScoutButton from "@/components/scout/StartScoutButton";
import { EventOption } from "@/types/events";
import { MatchOption } from "@/types/scout";
import MatchSelector from "@/components/scout/MatchSelector";

export interface ScoutPageProps {
  eventsList: EventOption[] | null;

  selectedEvent: string | null;

  matches: MatchOption[] | null;

  redAlliance: AllianceTeam[] | null;
  blueAlliance: AllianceTeam[] | null;
}

interface AllianceTeam {
  key: string;
  number: number;
  nickname: string;
  avatar: string;
  station: string;
}

export default function ScoutPageClient({
  eventsList,
  selectedEvent,
  matches,
  redAlliance,
  blueAlliance,
}: ScoutPageProps) {
  const router = useRouter();

  const events = eventsList ?? [];
  const matchList = matches ?? [];
  const redTeams = redAlliance ?? [];
  const blueTeams = blueAlliance ?? [];

  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const teamEntry = [
    ...redTeams.map((team) => ({ ...team, alliance: "red" as const })),
    ...blueTeams.map((team) => ({ ...team, alliance: "blue" as const })),
  ].find((team) => team.key === selectedTeam);

  const canStartScout =
    selectedEvent !== null &&
    selectedMatch !== "" &&
    teamEntry !== undefined;

  function handleEventChange(eventKey: string) {
    const params = new URLSearchParams();

    params.set("event", eventKey);

    router.replace(`?${params.toString()}`);
  }

  function handleStartScout() {
    if (!teamEntry || !selectedEvent) return;

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
      <section>
        <h1 className="text-3xl font-bold text-white">
          Scout Preparation
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Prepare and start a new scouting session.
        </p>
      </section>

      <section>
        <EventSelector
          events={events}
          selectedEvent={selectedEvent ?? ""}
          onChange={handleEventChange}
        />
      </section>

      <section>
        <MatchSelector
          matches={matchList}
          selectedMatch={selectedMatch}
          onChange={setSelectedMatch}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <AlliancePanel
          title="Red Alliance"
          alliance="red"
          teams={redTeams}
          selectedTeam={selectedTeam}
          onSelectTeam={setSelectedTeam}
        />

        <AlliancePanel
          title="Blue Alliance"
          alliance="blue"
          teams={blueTeams}
          selectedTeam={selectedTeam}
          onSelectTeam={setSelectedTeam}
        />
      </section>

      <section className="flex justify-center pt-2">
        <StartScoutButton
          disabled={!canStartScout}
          onClick={handleStartScout}
        />
      </section>
    </main>
  );
}