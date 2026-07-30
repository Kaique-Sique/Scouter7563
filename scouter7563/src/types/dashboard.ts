/**
 * Dashboard Screen Types
 *
 * App-level shapes consumed by `/` (src/app/page.tsx + dashboardPageClient.tsx).
 * This screen aggregates event-level data (how many teams, how many matches,
 * how many were already played) to render the stat cards and progress bar.
 */

/** Aggregated event data used to feed the dashboard's stat cards. */
export interface DashboardDataEvent {
  eventKey: string;

  /** Every match key that belongs to the event. */
  matchKeys: string[];

  /** Every team key that belongs to the event. */
  teamKeys: string[];

  /** Subset of `matchKeys` that already have a result (`post_result_time` set). */
  playedMatchKeys: string[];
}