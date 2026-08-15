import { CompetitionLevel } from "@/types/tba/common";

/**
 * Builds the short label shown for a match (match selector dropdown,
 * match cards, etc), e.g. "Q12", "QF2", "SF1", "F1".
 *
 * Prefers the numeric suffix baked into the TBA match `key`
 * (`"2025sao_qm12"` -> `"12"`, `"2025sao_sf1m2"` -> `"1m2"`) over the
 * plain `matchNumber`, since playoff keys can carry extra info (like
 * which match of a best-of-3 set) that `matchNumber` alone doesn't.
 */
export function formatMatchLabel(
  competitionLevel: CompetitionLevel | null | undefined,
  matchNumber: number | null | undefined,
  key: string | null | undefined
): string {
  if (matchNumber == null) {
    return "";
  }

  // `key` looks like "2025sao_qm12" — slice past the underscore to get
  // "qm12", then drop the 2-letter level prefix to get just "12".
  let adition = key ? key.slice(key.indexOf("_") + 1) : null;
  adition = adition ? adition.slice(2) : null;
  adition = adition ? adition.replace("m1", "") : null;

  switch (competitionLevel) {
    case "qm":
      return `Q${adition ? adition : matchNumber}`;

    case "ef":
      return `EF${adition ? adition : matchNumber}`;

    case "qf":
      return `QF${adition ? adition : matchNumber}`;

    case "sf":
      return `SF${adition ? adition : matchNumber}`;

    case "f":
      return `F${adition ? adition : matchNumber}`;

    default:
      return `${adition ? adition : matchNumber}`;
  }
}

/** Expands a TBA `comp_level` code ("qm", "ef", "qf", "sf", "f") into
 *  its full human-readable name for display. */
export function formatCompetitionLevel(
  competitionLevel: CompetitionLevel | null | undefined
): string {
  switch (competitionLevel) {
    case "qm":
      return "Qualification";

    case "ef":
      return "Eighth Final";

    case "qf":
      return "Quarterfinal";

    case "sf":
      return "Semifinal";

    case "f":
      return "Final";

    default:
      return "";
  }
}

/**
 * `comp_level` codes in the order they're actually played within an event
 * — qualifications first, then the playoff bracket rounds.
 */
const COMP_LEVEL_ORDER: Record<CompetitionLevel, number> = {
  qm: 0,
  ef: 1,
  qf: 2,
  sf: 3,
  f: 4,
};

/** The two groups the Matches tab splits into: everything that isn't a
 *  qualification match ("qm") is a playoff match ("ef" / "qf" / "sf" / "f"). */
export type MatchBracket = "qualification" | "playoff";

export function getMatchBracket(
  compLevel: CompetitionLevel | null | undefined
): MatchBracket {
  return compLevel === "qm" ? "qualification" : "playoff";
}

/**
 * Sorts matches in the order they're actually run at the event: by
 * `scheduledTime` first (the real chronological order TBA predicts/records
 * for the match), falling back to comp level + match number for matches
 * that don't have a time yet (so a freshly-generated playoff bracket still
 * renders in bracket order instead of jumping around).
 */
export function sortMatchesByExecutionOrder<T extends {
  key: string;
  compLevel: CompetitionLevel | null;
  scheduledTime: string | null;
}>(matches: T[]): T[] {
  return [...matches].sort((a, b) => {
    const aTime = a.scheduledTime ? Number(a.scheduledTime) : null;
    const bTime = b.scheduledTime ? Number(b.scheduledTime) : null;

    const aValid = aTime !== null && !Number.isNaN(aTime);
    const bValid = bTime !== null && !Number.isNaN(bTime);

    if (aValid && bValid && aTime !== bTime) {
      return (aTime as number) - (bTime as number);
    }

    // No usable time on one/both sides — fall back to bracket order.
    if (aValid !== bValid) {
      return aValid ? -1 : 1;
    }

    const aLevel = a.compLevel ? COMP_LEVEL_ORDER[a.compLevel] : 0;
    const bLevel = b.compLevel ? COMP_LEVEL_ORDER[b.compLevel] : 0;

    if (aLevel !== bLevel) {
      return aLevel - bLevel;
    }

    return matchNumberFromKey(a.key) - matchNumberFromKey(b.key);
  });
}

/** Pulls the trailing numeric part out of a match key (`"...qm12"` -> `12`,
 *  `"...sf1m2"` -> `2`) for use as a last-resort sort tiebreaker. */
function matchNumberFromKey(key: string | null | undefined): number {
  if (!key) return 0;
  const digits = key.match(/(\d+)(?!.*\d)/);
  return digits ? Number(digits[1]) : 0;
}