export interface Team {
  key: string;
  number: number;
  nickname: string;
  avatar: string;
  station: "R1" | "R2" | "R3" | "B1" | "B2" | "B3";
}

export interface Match {
  key: string;
  name: string;
}