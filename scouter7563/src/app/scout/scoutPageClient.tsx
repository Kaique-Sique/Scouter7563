"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import EventSelector from "@/components/dashboard/EventSelector";
import AlliancePanel from "@/components/scout/AlliancePanel";
import StartScoutButton from "@/components/scout/StartScoutButton";
import MatchSelector from "@/components/scout/MatchSelector";
import { EventOption } from "@/types/events";
import { AllianceTeam, MatchOption } from "@/types/scout";

export interface ScoutPageProps {
  eventsList: EventOption[] | null;

  selectedEvent: string | null;

  matches: MatchOption[] | null;
  selectedMatch: string | null;

  redAlliance: AllianceTeam[] | null;
  blueAlliance: AllianceTeam[] | null;
}

export default function ScoutPageClient({
  eventsList,
  selectedEvent,
  matches,
  selectedMatch,
  redAlliance,
  blueAlliance,
}: ScoutPageProps) {
  const router = useRouter();

  // `isPending` covers the gap between the scouter picking an event/match
  // and the server component above (src/app/scout/page.tsx) finishing its
  // TBA re-fetch and streaming the new props down — both selectors and
  // the start button get disabled during that window so the scouter
  // can't act on stale data mid-navigation.
  const [isPending, startTransition] = useTransition();

  const events = eventsList ?? [];
  const matchList = matches ?? [];
  const redTeams = redAlliance ?? [];
  const blueTeams = blueAlliance ?? [];

  // Which of the six teams on the field the scouter has tapped. This is
  // the only piece of state that stays purely client-side — it never
  // needs to survive a page reload or be shareable via URL.
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  // Alliance data is re-fetched from scratch every time `selectedMatch`
  // changes (new server props), so a team picked under the previous
  // match can no longer be valid — drop the selection instead of leaving
  // a stale highlight on screen. Adjusted during render (React's
  // recommended way to reset state on a prop change) rather than in a
  // useEffect, which would cause an extra render pass.
  const [prevMatch, setPrevMatch] = useState(selectedMatch);
  if (selectedMatch !== prevMatch) {
    setPrevMatch(selectedMatch);
    setSelectedTeam(null);
  }

  // Tag each team with which alliance it belongs to, then find the one
  // the scouter picked. Needed because `AlliancePanel` only tracks a
  // team key internally — the alliance color has to be re-derived here
  // before it can be sent along to the scouting form.
  const teamEntry = [
    ...redTeams.map((team) => ({ ...team, alliance: "red" as const })),
    ...blueTeams.map((team) => ({ ...team, alliance: "blue" as const })),
  ].find((team) => team.key === selectedTeam);

  const canStartScout =
    selectedEvent !== null &&
    selectedMatch !== null &&
    teamEntry !== undefined &&
    !isPending;

  /** Picking a new event resets the match — a match key from one event is meaningless for another. */
  function handleEventChange(eventKey: string) {
    const params = new URLSearchParams({ event: eventKey });

    startTransition(() => {
      router.replace(`?${params.toString()}`);
    });
  }

  /**
   * Picking a match writes `?match=` alongside the current event and lets
   * the server component re-fetch that match's two alliances from TBA —
   * alliance data can't be fetched client-side (no TBA key in the
   * browser), so this round-trip through the URL is the only way to get
   * fresh team data in.
   */
  function handleMatchChange(matchKey: string) {
    const params = new URLSearchParams({
      event: selectedEvent ?? "",
      match: matchKey,
    });

    startTransition(() => {
      router.replace(`?${params.toString()}`);
    });
  }

  function handleStartScout() {
    if (!teamEntry || !selectedEvent || !selectedMatch) return;

    const params = new URLSearchParams({
      event: selectedEvent,
      match: selectedMatch,
      team: teamEntry.key,
      number: teamEntry.number.toString(),
      alliance: teamEntry.alliance,
      station: teamEntry.station,
    });

    // 2025 is hardcoded here the same way it is in getEventOptions
    // (src/lib/api/events.ts) — the auto/teleop/pit routes are season-
    // specific stubs, not yet driven by the event's own year.
    router.push(`/scout/2025/auto?${params.toString()}`);
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8">
      <section>
        <h1 className="text-3xl font-bold text-white">Scout Preparation</h1>

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
          onChange={handleMatchChange}
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
