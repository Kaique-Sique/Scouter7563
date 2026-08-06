/**
 * TBA API — Public Entry Point
 *
 * Re-exports the low-level `_get` client plus every typed endpoint
 * function, grouped by resource. Prefer importing from `@/lib/api/tba`
 * rather than reaching into individual service files.
 */

export { _get } from "./tba_service";

export * from "./team_service";
export * from "./event_service";
export * from "./match_service";
export * from "./district_service";
export * from "./status_service";
