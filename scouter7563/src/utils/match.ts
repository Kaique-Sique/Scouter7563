import { CompetitionLevel } from "@/types/enums/CompetitionLevel";

export function formatMatchLabel(
  competitionLevel: CompetitionLevel,
  matchNumber: number
): string {
  switch (competitionLevel) {
    case CompetitionLevel.Qualification:
      return `Q${matchNumber}`;

    case CompetitionLevel.EighthFinal:
      return `EF${matchNumber}`;

    case CompetitionLevel.Quarterfinal:
      return `QF${matchNumber}`;

    case CompetitionLevel.Semifinal:
      return `SF${matchNumber}`;

    case CompetitionLevel.Final:
      return `F${matchNumber}`;

    default:
      return `${matchNumber}`;
  }
}

export function formatCompetitionLevel(
  competitionLevel: CompetitionLevel
): string {
  switch (competitionLevel) {
    case CompetitionLevel.Qualification:
      return "Qualification";

    case CompetitionLevel.EighthFinal:
      return "Eighth Final";

    case CompetitionLevel.Quarterfinal:
      return "Quarterfinal";

    case CompetitionLevel.Semifinal:
      return "Semifinal";

    case CompetitionLevel.Final:
      return "Final";

    default:
      return "";
  }
}