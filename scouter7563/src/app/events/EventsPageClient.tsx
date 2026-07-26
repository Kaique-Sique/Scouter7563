"use client";

import { useMemo, useRef, useState } from "react";

import EventFilters from "@/components/events/EventFilters";
import EventSection from "@/components/events/EventSection";
import { Search } from "lucide-react";
import { EventListItem } from "@/types/events";
import type { EventSectionMeta } from "@/utils/groupEventsByWeek";

interface EventsPageClientProps {
    // dados já buscados e agrupados no servidor (ver page.tsx)
    initialEvents: Record<string, EventListItem[]>;
    // metadados das seções (id/label/gold), já na ordem correta, montados
    // dinamicamente a partir dos dados — o número de seções (semanas) varia
    // conforme a temporada, então nada aqui é mais fixo em "week1..week7"
    initialSections: EventSectionMeta[];
}

function matchesQuery(event: EventListItem, query: string): boolean {
    if (!query) return true;

    const needle = query.trim().toLowerCase();
    if (!needle) return true;

    const name = event.name?.toLowerCase() ?? "";
    const key = event.event_key?.toLowerCase() ?? "";

    return name.includes(needle) || key.includes(needle);
}

export default function EventsPageClient({
    initialEvents,
    initialSections,
}: EventsPageClientProps) {

    // objeto mutável com o elemento DOM de cada seção (id -> HTMLElement).
    // Como o número de seções é dinâmico, não dá pra declarar um useRef por
    // semana como antes — cada EventSection registra a si mesma aqui via
    // callback ref.
    const sectionElsRef =
        useRef<Record<string, HTMLElement | null>>({});

    // estado inicializado com o que já veio pronto do servidor —
    // sem fetch nenhum aqui dentro
    const [events, setEvents] =
        useState<Record<string, EventListItem[]>>(initialEvents);

    // as seções em si (id/label/order) já vêm prontas do servidor; só o
    // conteúdo de cada uma (visibleSectionsData) muda no cliente conforme
    // busca/favoritos
    const sections = initialSections;

    const [favoriteOnly, setFavoriteOnly] =
        useState(false);

    const [searchQuery, setSearchQuery] =
        useState("");

    function toggleEventFavorite(eventKey: string) {

        setEvents((old) => {

            const next = { ...old };

            (Object.keys(next) as string[]).forEach((sectionId) => {
                next[sectionId] = next[sectionId].map((event) =>
                    event.event_key === eventKey
                        ? { ...event, favorite: !event.favorite }
                        : event
                );
            });

            return next;

        });

    }

    // aplica favoritos + busca (por nome ou key) e só mantém as seções que
    // sobraram com pelo menos 1 evento -> seções são criadas/removidas
    // dinamicamente conforme o resultado, não só quando o filtro de
    // favoritos está ativo
    const visibleSectionsData = useMemo(() => {

        return sections
            .map((section) => ({
                ...section,
                data: (events[section.id] ?? [])
                    .filter((event) => !favoriteOnly || event.favorite)
                    .filter((event) => matchesQuery(event, searchQuery)),
            }))
            .filter((section) => section.data.length > 0);

    }, [events, sections, favoriteOnly, searchQuery]);

    const visibleSectionsMeta: EventSectionMeta[] = useMemo(
        () => visibleSectionsData.map((section): EventSectionMeta => ({
            id: section.id,
            label: section.label,
            gold: section.gold,
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
                            placeholder="Search events by name or key"
                            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Filters */}
                <EventFilters
                    sectionEls={sectionElsRef}
                    visibleSections={visibleSectionsMeta}
                    favorite={favoriteOnly}
                    onToggleFavorite={() => setFavoriteOnly((old) => !old)}
                />


            </section>


            {/* Events */}

            <div
                className="
                    space-y-12
                "
            >

                {visibleSectionsData.length === 0 ? (

                    <p className="text-center text-sm text-slate-500">
                        No events found.
                    </p>

                ) : visibleSectionsData.map((section) => (

                    <EventSection
                        key={section.id}
                        id={section.id}
                        title={section.label}
                        events={section.data}
                        sectionRef={(el) => {
                            sectionElsRef.current[section.id] = el;
                        }}
                        onToggleFavorite={toggleEventFavorite}
                    />

                ))}

            </div>

        </main>

    );
}
