"use client";

import { useMemo, useRef, useState } from "react";

import TeamFilters from "@/components/team/TeamFilters";
import TeamSection from "@/components/team/TeamSection";
import { Search } from "lucide-react";
import { TeamListItem } from "@/types/team";
import type { TeamSectionMeta } from "@/utils/groupTeamsByBatch";

interface TeamsPageClientProps {
    // dados já buscados e agrupados no servidor (ver page.tsx)
    initialTeams: Record<string, TeamListItem[]>;
    // metadados das seções (id/label), já na ordem correta, montados
    // dinamicamente a cada 500 times — o número de seções varia conforme
    // quantos times existem no ano, nada aqui é fixo
    initialSections: TeamSectionMeta[];
}

function matchesQuery(team: TeamListItem, query: string): boolean {
    if (!query) return true;

    const needle = query.trim().toLowerCase();
    if (!needle) return true;

    const name = team.nickname?.toLowerCase() ?? "";
    const number = team.team_number?.toString() ?? "";
    const key = team.team_key?.toLowerCase() ?? "";

    return name.includes(needle) || number.includes(needle) || key.includes(needle);
}

export default function TeamsPageClient({
    initialTeams,
    initialSections,
}: TeamsPageClientProps) {

    const sectionElsRef =
        useRef<Record<string, HTMLElement | null>>({});

        
    const [teams, setTeams] =
        useState<Record<string, TeamListItem[]>>(initialTeams);

    const sections = initialSections;

    const [favoriteOnly, setFavoriteOnly] =
        useState(false);

    const [searchQuery, setSearchQuery] =
        useState("");

    const [sortBy, setSortBy] =
        useState("Team Number");

    function toggleTeamFavorite(teamKey: string) {

        setTeams((old) => {

            const next = { ...old };

            (Object.keys(next) as string[]).forEach((sectionId) => {
                next[sectionId] = next[sectionId].map((team) =>
                    team.team_key === teamKey
                        ? { ...team, favorite: !team.favorite }
                        : team
                );
            });

            return next;

        });

    }

    function sortTeams(list: TeamListItem[]): TeamListItem[] {

        const sorted = [...list];

        switch (sortBy) {
            case "Team Name":
                return sorted.sort((a, b) =>
                    (a.nickname ?? "").localeCompare(b.nickname ?? "")
                );

            case "EPA":
                return sorted.sort((a, b) => (b.epa ?? 0) - (a.epa ?? 0));

            default:
                return sorted.sort(
                    (a, b) => (a.team_number ?? 0) - (b.team_number ?? 0)
                );
        }

    }

    // aplica favoritos + busca (por nome, número ou key) e só mantém as
    // seções que sobraram com pelo menos 1 time -> seções são
    // criadas/removidas dinamicamente conforme o resultado
    const visibleSectionsData = useMemo(() => {

        return sections
            .map((section) => ({
                ...section,
                data: sortTeams(
                    (teams[section.id] ?? [])
                        .filter((team) => !favoriteOnly || team.favorite)
                        .filter((team) => matchesQuery(team, searchQuery))
                ),
            }))
            .filter((section) => section.data.length > 0);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teams, sections, favoriteOnly, searchQuery, sortBy]);

    const visibleSectionsMeta: TeamSectionMeta[] = useMemo(
        () => visibleSectionsData.map((section): TeamSectionMeta => ({
            id: section.id,
            label: section.label,
            order: section.order,
        })),
        [visibleSectionsData]
    );

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
                <TeamFilters
                    sectionEls={sectionElsRef}
                    visibleSections={visibleSectionsMeta}
                    favorite={favoriteOnly}
                    onToggleFavorite={() => setFavoriteOnly((old) => !old)}
                />

                {/* Sort */}
                <div className="mt-3 flex items-center justify-end gap-2">
                    <span className="whitespace-nowrap text-sm text-slate-400">
                        Sort by
                    </span>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-10 w-48 rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm text-white outline-none transition focus:border-sky-500"
                    >
                        <option>Team Number</option>
                        <option>Team Name</option>
                        <option>EPA</option>
                        <option>Auto EPA</option>
                        <option>Teleop EPA</option>
                        <option>Rookie Year</option>
                    </select>
                </div>

            </section>


            {/* Teams */}

            <div
                className="
                    space-y-12
                "
            >

                {visibleSectionsData.length === 0 ? (

                    <p className="text-center text-sm text-slate-500">
                        No teams found.
                    </p>

                ) : visibleSectionsData.map((section) => (

                    <TeamSection
                        key={section.id}
                        id={section.id}
                        title={section.label}
                        teams={section.data}
                        sectionRef={(el) => {
                            sectionElsRef.current[section.id] = el;
                        }}
                        onToggleFavorite={toggleTeamFavorite}
                    />

                ))}

            </div>

        </main>

    );
}
