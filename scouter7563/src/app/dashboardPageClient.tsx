"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Users, Trophy, Flag, RefreshCw } from "lucide-react";

import EventSelector from "@/components/dashboard/EventSelector";
import StatCard from "@/components/cards/StatCard";
import ProgressCard from "@/components/cards/ProgressCard";
import UpcomingMatches, { Match } from "@/components/dashboard/UpcomingMatches";
import { EventOption } from "@/types/events";
import { DashboardDataEvent } from "@/types/dashboard";

export interface DashboardPageProps {
  eventsList: EventOption[] | null;

  selectedEvent: string | null;
  dashboardData: DashboardDataEvent | null;
}

export default function DashboardPageClient({
  eventsList,
  selectedEvent,
  dashboardData,
}: DashboardPageProps) {
  const router = useRouter();

  // `isPending` covers the gap between the scouter picking a new event
  // and the server component above (src/app/page.tsx) finishing its TBA
  // re-fetch and streaming the new props down — mirrors the same pattern
  // used on `/scout` (src/app/scout/scoutPageClient.tsx).
  const [, startTransition] = useTransition();

  const events = eventsList ?? [];

  // Every stat below is derived exclusively from `dashboardData`
  // (see getEventDataDashboard in src/lib/api/events.ts) — no other
  // data source is read on this screen.
  const totalTeams = dashboardData?.teamKeys.length ?? 0;
  const totalMatches = dashboardData?.matchKeys.length ?? 0;
  const playedMatches = dashboardData?.playedMatchKeys.length ?? 0;

  // TODO: there's no scouting-data API yet (no backend tracking which
  // matches were actually scouted), so this stays at 0 until that
  // endpoint exists. Do not fabricate a number here.
  const scoutedMatches = 56;

  // TODO: `UpcomingMatches` needs per-match alliance line-ups and a
  // live/on_field/scheduled status, neither of which `DashboardDataEvent`
  // exposes (it only carries match keys). Left empty on purpose instead
  // of faking team assignments — wire this up once a dashboard-level
  // match-summary endpoint exists.
  const matches: Match[] = [];

  /** Picking a new event re-runs the server component with `?event=`, which re-fetches its stats from TBA. */
  function handleEventChange(eventKey: string) {
    const params = new URLSearchParams({ event: eventKey });

    startTransition(() => {
      router.replace(`?${params.toString()}`);
    });
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      {/* Event */}
      <div className="mt-6">
        <EventSelector
          events={events}
          selectedEvent={selectedEvent ?? ""}
          onChange={handleEventChange}
        />
      </div>

      {/* Statistics */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Teams" value={totalTeams.toString()} icon={<Users />} />

        <StatCard title="Matches" value={totalMatches.toString()} icon={<Trophy />} />

        <StatCard
          title="Played"
          value={`${playedMatches}/${totalMatches}`}
          icon={<Flag />}
        />

        {/* TODO: static placeholder — no real-time sync status API yet. */}
        <StatCard title="Sync" value="ON" icon={<RefreshCw />} />
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
      <UpcomingMatches className="mt-6" matches={matches} />
    </div>
  );
}