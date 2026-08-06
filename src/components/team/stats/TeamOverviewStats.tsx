"use client";

import {
    Trophy,
    Target,
    Medal,
    Activity,
    Percent,
    CarFront,
    BookOpenCheck,
    ChartNetwork,
    Bot
    } from "lucide-react";
import TeamStatCard from "./TeamStatCard";


interface TeamOverviewStatsProps {
    stats: {
        reliable: number;
        static: number;
        climbRate: number;
        accuracy: number;
        epa: number;
        winRate: number;
        auto:number;
        range: string;
        driverSkils: number;
    };
}


export default function TeamOverviewStats({
    stats,
}: TeamOverviewStatsProps) {

    return (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            <TeamStatCard
                title="EPA"
                value={stats.epa}
                subtitle="Overall performance"
                icon={Trophy}
            />

            <TeamStatCard
                title="StaticBotics"
                value={stats.static}
                subtitle="Performace by static"
                icon={Activity}
            />

            <TeamStatCard
                title="Auto Points"
                value={stats.auto}
                subtitle="autonomous"
                icon={Bot}
            />


            <TeamStatCard
                title="Coral Accuracy"
                value={`${stats.accuracy}%`}
                subtitle="Precision"
                icon={Target}
            />


            <TeamStatCard
                title="Climb Rate"
                value={`${stats.climbRate}%`}
                subtitle="Precision"
                icon={Medal}
            />

            <TeamStatCard
                title="Range"
                value={stats.range}
                subtitle="Min/max points"
                icon={ChartNetwork}
            />

            <TeamStatCard
                title="Driver"
                value={stats.driverSkils}
                subtitle="Driver Skils"
                icon={CarFront}
            />

            <TeamStatCard
                title="Reliable"
                value={`${stats.reliable}%`}
                subtitle="malfunction/matchs"
                icon={BookOpenCheck}
            />


            <TeamStatCard
                title="Win Rate"
                value={`${stats.winRate}%`}
                subtitle="Historical"
                icon={Percent}
            />

        </section>
    );
}