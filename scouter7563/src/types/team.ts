export interface Team {
  team_number: number | null;
  nickname: string | null;

  organization?: string | null;

  city?: string | null;
  country?: string | null;

  rookie_year?: number | null;
  members?: number | null;

  website?: string;
  instagram?: string | null;
  youtube?: string | null;

  tba?: string;
  first?: string;

  avatar?: string | null;
  banner?: string | null;
}