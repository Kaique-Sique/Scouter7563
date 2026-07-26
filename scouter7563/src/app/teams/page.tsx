import TeamCard from "@/components/team/TeamCard";
import { getTeamListItem } from "@/lib/api/teams";
import { TeamListItem } from "@/types/team";
import { Star, Search } from "lucide-react";

export default async function TeamsPage() {
    // TODO: Fetch from the API
    const teams: TeamListItem[] = await getTeamListItem(1) ?? [];

    return (
        <main
            className="
                mx-auto
                max-w-7xl
                space-y-8
                px-6
                py-6
            "
        >

            {/* Search + Filters */}
            <section className="
        sticky
        top-20
        z-30
        mb-8
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/95
        p-4
        backdrop-blur
    ">

                {/* Search */}
                <div className="mb-4">
                    <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 transition-colors focus-within:border-sky-500">
                        <Search className="h-5 w-5 shrink-0 text-slate-400" />

                        <input
                            type="text"
                            placeholder="Search teams by name or number"
                            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3">

                    {/* Favorite */}
                    <button
                        className="
                            flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-200
                            border-slate-700 bg-slate-950 text-slate-400 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-400
                        "
                    >
                        <Star size={18} />
                    </button>

                    {/* Divider */}
                    <span className="select-none text-lg font-light text-slate-600">
                        |
                    </span>

                    <div className="flex h-11 flex-1 items-center gap-2">
                        <span className="whitespace-nowrap text-sm text-slate-400">
                            Sort by
                        </span>

                        <select className="h-full w-56 rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm text-white outline-none transition focus:border-sky-500">
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

            {/* Teams */}
            <section className="scroll-mt-60 space-y-4">

                {/* Section Header */}
                <div className="flex items-center gap-4">

                    <h2 className="text-lg font-semibold text-white whitespace-nowrap">
                        All Teams
                    </h2>

                    <div className="h-px flex-1 bg-slate-800" />

                </div>

                {/* Cards */}
                <div className="space-y-3">
                    {teams.map((teamItem) => (
                        <TeamCard
                            key={teamItem.team_key}
                            team={teamItem}
                        />))
                    }
                </div>

            </section>

        </main>
    );
}
