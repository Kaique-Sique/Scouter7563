import { Team } from "@/types/team";


export async function getTeam(
  team_key: string
): Promise<Team | null> {


  const teamNumber = team_key.replace("frc", "");

    if(Number(teamNumber) !== 7563)
    {
        return null;
    }

  return {
    team_number: Number(teamNumber),

    nickname: "Megazord",

    organization: "SESI SENAI SP",

    city: "São Paulo",
    country: "Brazil",

    rookie_year: 2019,
    members: 42,

    website: "https://megazord7563.com.br",
    instagram: "https://instagram.com/megazord7563",
    youtube: "https://youtube.com/@megazord7563",

    tba: "https://www.thebluealliance.com/team/7563",
    first: "https://frc-events.firstinspires.org/team/7563",

    avatar: "/teams/7563/logo.png",
    banner: "/teams/7563/banner.jpg",
  }
};