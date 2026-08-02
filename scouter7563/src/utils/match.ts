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