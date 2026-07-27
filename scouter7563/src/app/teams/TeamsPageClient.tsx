"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Star, Search } from "lucide-react";

import TeamCard from "@/components/team/TeamCard";
import { TeamListItem } from "@/types/team";

interface TeamsPageClientProps {
    initialTeams: TeamListItem[];
}

type SortKey = "Team Number" | "Team Name" | "EPA";

const PAGE_SIZE = 500;

function matchesQuery(team: TeamListItem, query: string): boolean {
    if (!query) return true;

    const needle = query.trim().toLowerCase();
    if (!needle) return true;

    const nickname = team.nickname?.toLowerCase() ?? "";
    const organization = team.organization?.toLowerCase() ?? "";
    const number = team.team_number?.toString() ?? "";
    const key = team.team_key?.toLowerCase() ?? "";

    return (
        nickname.includes(needle) ||
        organization.includes(needle) ||
        number.includes(needle) ||
        key.includes(needle)
    );
}

function sortTeams(list: TeamListItem[], sortKey: SortKey): TeamListItem[] {
    const sorted = [...list];

    switch (sortKey) {
        case "Team Name":
            return sorted.sort((a, b) =>
                (a.nickname ?? "").localeCompare(b.nickname ?? "")
            );

        case "EPA":
            return sorted.sort((a, b) => (b.epa ?? 0) - (a.epa ?? 0));

        case "Team Number":
        default:
            return sorted.sort(
                (a, b) => (a.team_number ?? 0) - (b.team_number ?? 0)
            );
    }
}

interface TeamsPageClientProps {
    initialTeams: TeamListItem[];
    searchInitialValue: string;
}

export default function TeamsPageClient({
    initialTeams,
    searchInitialValue,
}: TeamsPageClientProps) {

    const [teams, setTeams] = useState<TeamListItem[]>(initialTeams);

    const [favoriteOnly, setFavoriteOnly] = useState(false);
    const [searchQuery, setSearchQuery] = useState(searchInitialValue);
    const [sortKey, setSortKey] = useState<SortKey>("Team Number");

    function toggleTeamFavorite(teamKey: string) {
        setTeams((old) =>
            old.map((team) =>
                team.team_key === teamKey
                    ? { ...team, favorite: !team.favorite }
                    : team
            )
        );
    }


    const filteredTeams = useMemo(() => {
        const filtered = teams
            .filter((team) => !favoriteOnly || team.favorite)
            .filter((team) => matchesQuery(team, searchQuery));

        return sortTeams(filtered, sortKey);
    }, [teams, favoriteOnly, searchQuery, sortKey]);


    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);


    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [favoriteOnly, searchQuery, sortKey]);

    const visibleTeams = filteredTeams.slice(0, visibleCount);
    const hasMore = visibleCount < filteredTeams.length;

    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!hasMore) return;

        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setVisibleCount((old) => old + PAGE_SIZE);
                }
            },
            { rootMargin: "600px 0px" }
        );

        observer.observe(sentinel);

        return () => observer.disconnect();
    }, [hasMore]);

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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search teams by name or number"
                            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3">

                    {/* Favorite */}
                    <button
                        onClick={() => setFavoriteOnly((old) => !old)}
                        className={[
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-200",

                            favoriteOnly
                                ? "border-amber-400 bg-amber-500/15 text-amber-300 shadow-md shadow-amber-500/20"
                                : "border-slate-700 bg-slate-950 text-slate-400 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-400",
                        ].join(" ")}
                    >
                        <Star
                            size={18}
                            fill={favoriteOnly ? "currentColor" : "none"}
                        />
                    </button>

                    {/* Divider */}
                    <span className="select-none text-lg font-light text-slate-600">
                        |
                    </span>

                    <div className="flex h-11 flex-1 items-center gap-2">
                        <span className="whitespace-nowrap text-sm text-slate-400">
                            Sort by
                        </span>

                        <select
                            value={sortKey}
                            onChange={(e) => setSortKey(e.target.value as SortKey)}
                            className="h-full w-56 rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm text-white outline-none transition focus:border-sky-500"
                        >
                            <option>Team Number</option>
                            <option>Team Name</option>
                            <option>EPA</option>
                        </select>
                    </div>

                </div>

            </section>

            {/* Teams */}
            <section className="scroll-mt-60 space-y-4">

                {/* Section Header */}
                <div className="flex items-center gap-4">

                    <h2 className="text-lg font-semibold text-white whitespace-nowrap">
                        {favoriteOnly ? "Favorite Teams" : "All Teams"}
                    </h2>

                    <div className="h-px flex-1 bg-slate-800" />

                    <span className="whitespace-nowrap text-sm text-slate-500">
                        {visibleTeams.length} / {filteredTeams.length}
                    </span>

                </div>

                {/* Cards */}
                {filteredTeams.length === 0 ? (

                    <p className="text-center text-sm text-slate-500">
                        No teams found.
                    </p>

                ) : (

                    <div className="space-y-3">
                        {visibleTeams.map((team) => (
                            <TeamCard
                                key={team.team_key}
                                team={team}
                                onToggleFavorite={toggleTeamFavorite}
                            />
                        ))}
                    </div>

                )}

                {/* Sentinela de scroll infinito — libera os próximos 500 */}
                {hasMore && (
                    <div
                        ref={sentinelRef}
                        className="flex items-center justify-center py-6 text-sm text-slate-500"
                    >
                        Loading more teams…
                    </div>
                )}

            </section>

        </main>
    );
}
