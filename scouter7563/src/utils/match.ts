import { CompetitionLevel } from "@/types/tba/common";

export function formatMatchLabel(
  competitionLevel: CompetitionLevel | null | undefined,
  matchNumber: number | null | undefined
): string {
  if (matchNumber == null) {
    return "";
  }

  switch (competitionLevel) {
    case "qm":
      return `Q${matchNumber}`;

    case "ef":
      return `EF${matchNumber}`;

    case "qf":
      return `QF${matchNumber}`;

    case "sf":
      return `SF${matchNumber}`;

    case "f":
      return `F${matchNumber}`;

    default:
      return `${matchNumber}`;
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