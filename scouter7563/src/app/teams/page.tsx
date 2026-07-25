import TeamCard from "@/components/team/TeamCard";
import { Star, Search } from "lucide-react";

export default async function TeamsPage() {
    // TODO: Fetch from the API
    const teams = [
        {
            team_key: "frc7563",
            team_number: 7563,
            nickname: "Megazord",
            organization: "SESI SENAI Robotics",
            city: "São Paulo",
            country: "Brazil",
            epa: 109.4,
            registered: true,
            favorite: true,
            avatar: "/logo.png",
        },
        {
            team_key: "frc1114",
            team_number: 1114,
            nickname: "Simbotics",
            organization: "St. Clement CSS",
            city: "Ontario",
            country: "Canada",
            epa: 104.2,
            registered: false,
            favorite: false,
        },
        {
            team_key: "frc2056",
            team_number: 2056,
            nickname: "OP Robotics",
            organization: "St. Clair College",
            city: "Ontario",
            country: "Canada",
            epa: 118.9,
            registered: false,
            favorite: false,
        },
    ];

    return (
        <main className="mx-auto max-w-7xl px-6 py-6">

            <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-4">

                {/* Search */}
                <div className="mb-4">
                    <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 transition-colors focus-within:border-sky-500">
                        <Search className="h-5 w-5 shrink-0 text-slate-400" />

                        <input
                            type="text"
                            placeholder="Search teams"
                            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center justify-between">

                    <button className="flex h-11 w-32 items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 transition hover:bg-slate-800">
                        <Star size={18} />
                        Favorites
                    </button>

                    <div className="flex h-11 w-56 items-center gap-2">
                        <span className="whitespace-nowrap text-sm text-slate-400">
                            Sort by
                        </span>

                        <select className="h-full w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm text-white outline-none transition focus:border-sky-500">
                            <option>Team Number</option>
                            <option>Team Name</option>
                            <option>EPA</option>
                            <option>Auto EPA</option>
                            <option>Teleop EPA</option>
                            <option>Rookie Year</option>
                        </select>
                    </div>

                </div>

            </section>

            <section className="space-y-4">
                {teams.map((team) => (
                    <TeamCard
                        key={team.team_key}
                        team={team}
                    />
                ))}
            </section>

        </main>
    );
}