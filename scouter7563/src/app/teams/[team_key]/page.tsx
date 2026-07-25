import TeamOverviewStats from "@/components/team/stats/TeamOverviewStats";
import StaticStats from "@/components/team/stats/StaticStats";
import TeamHeader from "@/components/team/TeamHeader";
import TeamSidebar from "@/components/team/TeamSideBar";
import { getTeam } from "@/lib/api/teams";
import { notFound } from "next/navigation";
import ScoutStats from "@/components/team/stats/ScoutStats";
import PerformanceChart from "@/components/team/charts/PerformaceChart";
import ScoreBreakdownChart from "@/components/team/charts/ScoringChart";


interface TeamPageProps {
    params: Promise<{
        team_key: string;
    }>;
}


export default async function TeamPage({
    params,
}: TeamPageProps) {

    const { team_key } = await params;

    const team = await getTeam(team_key);

    
    if (!team) {
        notFound();
    }


    return (
        <main className="mx-auto w-full max-w-7xl overflow-x-hidden px-4 py-6 sm:px-6">


            <TeamHeader team={team} />


            {/* Main cards */}
            <div className="mt-6">

                <TeamOverviewStats
                    stats={{
                        static: 119,
                        climbRate: 100,
                        accuracy: 90,
                        epa: 123,
                        winRate: 95,
                        auto: 43,
                        reliable: 88,
                        range: "123-145",
                        driverSkils: 3.4,
                    }}
                />

            </div>



            {/* Page body */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">


                {/* Sidebar */}
                <TeamSidebar team={team} />



                {/* Content */}
                <section className="min-w-0 space-y-6">

                    <PerformanceChart
                        data={[
                            {
                                match: "M1",
                                score: 100
                            },
                            {
                                match: "M2",
                                score: 94
                            },
                            {
                                match: "M3",
                                score: 153
                            },
                            {
                                match: "M4",
                                score: 126
                            },
                            {
                                match: "M5",
                                score: 138
                            },
                            {
                                match: "M6",
                                score: 46
                            },
                            {
                                match: "M7",
                                score: 200
                            }
                        ]}
                    />
                    <ScoreBreakdownChart
                        data={[
                            {
                                match: "M4",
                                auto: 18,
                                teleop: 240,
                            },
                            {
                                match: "M9",
                                auto: 70,
                                teleop: 190,
                            },
                            {
                                match: "M12",
                                auto: 72,
                                teleop: 130,
                            },
                            {
                                match: "M16",
                                auto: 48,
                                teleop: 95,
                            },
                            {
                                match: "M22",
                                auto: 28,
                                teleop: 170,
                            },
                            {
                                match: "M26",
                                auto: 0,
                                teleop: 175,
                            },
                            {
                                match: "M33",
                                auto: 62,
                                teleop: 195,
                            },
                            {
                                match: "M39",
                                auto: 74,
                                teleop: 170,
                            },
                        ]}
                    />

                    {/*
                    <ScoringChart
                        data={[
                            {
                                name: "L1",
                                value: 15
                            },
                            {
                                name: "L2",
                                value: 30
                            },
                            {
                                name: "L3",
                                value: 70
                            },
                            {
                                name: "L4",
                                value: 95
                            }
                        ]}
                    />


                    <EndgameChart
                        data={[
                            {
                                name: "Climbed",
                                value: 78
                            },
                            {
                                name: "Parked",
                                value: 15
                            },
                            {
                                name: "On Field",
                                value: 7
                            }
                        ]}
                    />*/}

                    <ScoutStats
                        stats={{
                            matchesScouted: 86,
                            averageScore: 104.5,

                            auto: {
                                l1: 5,
                                l2: 12,
                                l3: 32,
                                l4: 45,

                                coralPrecision: 87,

                                algaeRemoved: 20,
                                algaeNet: 8,
                                algaeProcessor: 4,
                            },


                            teleop: {
                                l1: 10,
                                l2: 20,
                                l3: 40,
                                l4: 70,

                                coralPrecision: 91,

                                algaeRemoved: 50,
                                algaeNet: 30,
                                algaeProcessor: 15,

                                collection: {
                                    coralFloor: 72,
                                    coralStation: 85,
                                    algaeReef: 64,
                                },

                                defenseRate: 22,
                                driverRating: 8.7,
                            },


                            endgame: {
                                climbSuccessRate: 78,
                            }

                        }}
                    />

                    <StaticStats
                        stats={{
                            epa: {
                                total: 109.4,
                                auto: 31.2,
                                teleop: 65.8,
                            },

                            opr: 98.5,
                            dpr: 42.1,
                            ccwm: 56.4,

                            rank: 142,

                            record: {
                                wins: 42,
                                losses: 12,
                                ties: 2,
                                winRate: 78.5,
                            },
                        }}
                    />

                </section>


            </div>


        </main>
    );
}