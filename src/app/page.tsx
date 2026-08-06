import DashboardPageClient from "./dashboardPageClient";
import { getEventDataDashboard, getEventOptions } from "@/lib/api/events";

interface Props {
  searchParams: Promise<{
    event?: string;
  }>;
}

/**
 * `/` — team dashboard (server component).
 *
 * Mirrors the search-param pattern used by `src/app/scout/page.tsx`:
 * the selected event lives in `?event=`, not in client-only state, so
 * every time the scouter picks a different event, `DashboardPageClient`
 * pushes the new param and Next.js re-runs this server component, which
 * re-fetches the event's stats from TBA here. This is required (not just
 * style) since the TBA API key only exists server-side (see `tbaConfig`
 * in src/lib/config/config.ts).
 */
export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  // Every event the scouter can pick from the dashboard's event selector.
  // Falls back to an empty list further down (in DashboardPageClient) if
  // the TBA request failed.
  const events = await getEventOptions();

  // No `?event=` in the URL yet -> default to the first event in the
  // list, so the dashboard isn't empty on first load.
  const selectedEvent = params.event ?? events?.[0]?.key ?? null;

  // Aggregated team/match stats for the selected event (see
  // getEventDataDashboard in src/lib/api/events.ts). This is the single
  // data source the dashboard is allowed to read from.
  const dashboardData = selectedEvent
    ? await getEventDataDashboard(selectedEvent)
    : null;

  return (
    <DashboardPageClient
      eventsList={events ?? []}
      selectedEvent={selectedEvent}
      dashboardData={dashboardData}
    />
  );
}