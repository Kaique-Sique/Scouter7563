import { CompetitionLevel } from "@/types/tba/common";

export function formatMatchLabel(
  competitionLevel: CompetitionLevel | null | undefined,
  matchNumber: number | null | undefined,
  key: string | null | undefined
): string {
  if (matchNumber == null) {
    return "";
  }

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