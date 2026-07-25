"use client";

import { useState } from "react";

import {
  Users,
  Trophy,
  Flag,
  RefreshCw,
} from "lucide-react";

import EventSelector from "@/components/dashboard/EventSelector";
import StatCard from "@/components/cards/StatCard";
import ProgressCard from "@/components/cards/ProgressCard";
import UpcomingMatches, {
  Match,
} from "@/components/dashboard/UpcomingMatches";

export default function Home() {
  const [event, setEvent] = useState("2026brbri");

  // Temporary data
  const totalTeams = 42;
  const totalMatches = 78;
  const playedMatches = 55;
  const scoutedMatches = 5;

  const matches: Match[] = [
  {
    key: "2026brbri_qm56",
    match: "Qual 56",
    status: "live",

    red: [
      { team: 7563, favorite: true },
      { team: 1156, favorite: true },
      { team: 1772 },
    ],

    blue: [
      { team: 1153 },
      { team: 7565 },
      { team: 9163 },
    ],
  },
  {
    key: "2026brbri_qm57",
    match: "Qual 57",
    status: "on_field",

    red: [
      { team: 5985 },
      { team: 7565 },
      { team: 1156, favorite: true },
    ],

    blue: [
      { team: 7563, favorite: true },
      { team: 1772 },
      { team: 1153 },
    ],
  },
  {
    key: "2026brbri_qm58",
    match: "Qual 58",
    status: "scheduled",

    red: [
      { team: 9163 },
      { team: 1772 },
      { team: 1153 },
    ],

    blue: [
      { team: 7563, favorite: true },
      { team: 5985 },
      { team: 7565 },
    ],
  },
  ];

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8">

      {/* Title */}
      <h1 className="text-3xl font-bold text-white">
        Dashboard
      </h1>

      {/* Event */}
      <div className="mt-6">
        <EventSelector
          selectedEvent={event}
          onChange={setEvent}
        />
      </div>

      {/* Statistics */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard
          title="Teams"
          value={totalTeams.toString()}
          icon={<Users />}
        />

        <StatCard
          title="Matches"
          value={totalMatches.toString()}
          icon={<Trophy />}
        />

        <StatCard
          title="Played"
          value={`${playedMatches}/${totalMatches}`}
          icon={<Flag />}
        />

        <StatCard
          title="Sync"
          value="ON"
          icon={<RefreshCw />}
        />

      </section>

      {/* Progress */}
      <div className="mt-6">
        <ProgressCard
          title="Scouting Progress"
          subtitle={`${playedMatches - scoutedMatches} played matches still need scouting.`}
          current={scoutedMatches}
          total={playedMatches}
        />
      </div>

      {/* Upcoming Matches */}
      <UpcomingMatches
        className="mt-6"
        matches={matches}
      />

    </div>
  );
}
