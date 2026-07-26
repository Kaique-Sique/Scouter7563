"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import EventFilters from "@/components/events/EventFilters";
import EventSection from "@/components/events/EventSection";
import type { FilterType } from "@/components/events/EventFilters";
import { Search } from "lucide-react";
import { EventListItem } from "@/types/events";
import { getEventList } from "@/lib/api/events";
import { groupEventsByWeek } from "@/utils/groupEventsByWeek";

const SECTION_TITLES: Record<FilterType, string> = {
    preseason: "Preseason",
    week1: "Week 1",
    week2: "Week 2",
    week3: "Week 3",
    week4: "Week 4",
    week5: "Week 5",
    week6: "Week 6",
    week7: "Week 7",
    championship: "Championship",
    offseason: "Offseason",
};

export default function EventsPage() {

    const preseasonRef =
        useRef<HTMLElement>(null);

    const week1Ref =
        useRef<HTMLElement>(null);

    const week2Ref =
        useRef<HTMLElement>(null);

    const week3Ref =
        useRef<HTMLElement>(null);

    const week4Ref =
        useRef<HTMLElement>(null);

    const week5Ref =
        useRef<HTMLElement>(null);

    const week6Ref =
        useRef<HTMLElement>(null);

    const week7Ref =
        useRef<HTMLElement>(null);

    const championshipRef =
        useRef<HTMLElement>(null);

    const offseasonRef =
        useRef<HTMLElement>(null);

    const sectionRefs: Record<FilterType, React.RefObject<HTMLElement | null>> = {
        preseason: preseasonRef,
        week1: week1Ref,
        week2: week2Ref,
        week3: week3Ref,
        week4: week4Ref,
        week5: week5Ref,
        week6: week6Ref,
        week7: week7Ref,
        championship: championshipRef,
        offseason: offseasonRef,
    };


    const [events, setEvents] = useState<Record<FilterType, EventListItem[]>>({
        preseason: [],
        week1: [],
        week2: [],
        week3: [],
        week4: [],
        week5: [],
        week6: [],
        week7: [],
        championship: [],
        offseason: [],
    });

    const [loading, setLoading] = useState(true);

    // busca a lista flat da TBA e agrupa por semana
    useEffect(() => {
        let cancelled = false;

        getEventList().then((list) => {
            if (cancelled) return;

            if (list) {
                setEvents(groupEventsByWeek(list));
            }
            // list === null -> erro/ano inválido, mantém estado vazio

            setLoading(false);
        });

        return () => {
            cancelled = true;
        };
    }, []);


    const [favoriteOnly, setFavoriteOnly] =
        useState(false);

    function toggleEventFavorite(eventKey: string) {

        setEvents((old) => {

            const next = { ...old };

            (Object.keys(next) as FilterType[]).forEach((week) => {
                next[week] = next[week].map((event) =>
                    event.event_key === eventKey
                        ? { ...event, favorite: !event.favorite }
                        : event
                );
            });

            return next;

        });

    }

    // quando o filtro de favoritos está ativo, só sobram as semanas
    // que têm pelo menos um evento favoritado, e só os eventos favoritados nelas
    const visibleWeeks = useMemo(() => {

        return (Object.keys(SECTION_TITLES) as FilterType[])
            .map((week) => ({
                week,
                title: SECTION_TITLES[week],
                data: favoriteOnly
                    ? events[week].filter((event) => event.favorite)
                    : events[week],
            }))
            .filter((section) => !favoriteOnly || section.data.length > 0);

    }, [events, favoriteOnly]);

    // sectionRefs é feito de refs estáveis (useRef), então isso nunca muda de identidade
    const stableSectionRefs = useMemo(() => sectionRefs, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ids das semanas atualmente renderizadas (sem tocar em refs durante o render)
    const visibleWeekIds = useMemo(
        () => visibleWeeks.map((section) => section.week),
        [visibleWeeks]
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
                            placeholder="Search events"
                            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Filters */}
                <EventFilters
                    sections={stableSectionRefs}
                    visibleSections={visibleWeekIds}
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

                {loading ? null : visibleWeeks.map((section) => (

                    <EventSection
                        key={section.week}
                        title={section.title}
                        events={section.data}
                        sectionRef={sectionRefs[section.week]}
                        onToggleFavorite={toggleEventFavorite}
                    />

                ))}

            </div>

        </main>

    );
}