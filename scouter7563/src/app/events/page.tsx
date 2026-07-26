"use client";

import { useMemo, useRef, useState } from "react";

import EventFilters from "@/components/events/EventFilters";
import EventSection from "@/components/events/EventSection";
import type { FilterType } from "@/components/events/EventFilters";
import type { EventItem } from "@/components/events/types";
import { Search } from "lucide-react";

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


    const [events, setEvents] = useState<Record<FilterType, EventItem[]>>({

        preseason: [
            {
                event_key: "2026casf",
                name: "Preseason Test Event",
                city: "São Paulo",
                country: "Brazil",
                startDate: "Jan 10",
                endDate: "Jan 12",
                teams: 24,
                favorite: true,
            },
        ],


        week1: [
            {
                event_key: "2026sao",
                name: "São Paulo Regional",
                city: "São Paulo",
                country: "Brazil",
                startDate: "Mar 6",
                endDate: "Mar 9",
                teams: 36,
                favorite: true,
            },

            {
                event_key: "2026arli",
                name: "Arkansas Regional",
                city: "Little Rock",
                country: "USA",
                startDate: "Mar 7",
                endDate: "Mar 10",
                teams: 42,
            },
        ],


        week2: [
            {
                event_key: "2026miova",
                name: "Miami Valley Regional",
                city: "Dayton",
                country: "USA",
                startDate: "Mar 13",
                endDate: "Mar 16",
                teams: 40,
            },
        ],


        week3: [
            {
                event_key: "2026arli2",
                name: "Arkansas Regional",
                city: "Little Rock",
                country: "USA",
                startDate: "Mar 7",
                endDate: "Mar 10",
                teams: 42,
            },
        ],

        week4: [
            {
                event_key: "2026arli3",
                name: "Arkansas Regional",
                city: "Little Rock",
                country: "USA",
                startDate: "Mar 7",
                endDate: "Mar 10",
                teams: 42,
            },
        ],

        week5: [
            {
                event_key: "2026arli4",
                name: "Arkansas Regional",
                city: "Little Rock",
                country: "USA",
                startDate: "Mar 7",
                endDate: "Mar 10",
                teams: 42,
            },
        ],

        week6: [
            {
                event_key: "2026arli5",
                name: "Arkansas Regional",
                city: "Little Rock",
                country: "USA",
                startDate: "Mar 7",
                endDate: "Mar 10",
                teams: 42,
            },
        ],

        week7: [
            {
                event_key: "2026arli6",
                name: "Arkansas Regional",
                city: "Little Rock",
                country: "USA",
                startDate: "Mar 7",
                endDate: "Mar 10",
                teams: 42,
            },
        ],


        championship: [
            {
                event_key: "2026cmptx",
                name: "FIRST Championship",
                city: "Houston",
                country: "USA",
                startDate: "Apr 29",
                endDate: "May 2",
                teams: 600,
                favorite: true,
            },
        ],


        offseason: [
            {
                event_key: "2026spoff",
                name: "Offseason Competition",
                city: "São Paulo",
                country: "Brazil",
                startDate: "Aug 15",
                endDate: "Aug 17",
                teams: 30,
            },
        ],

    });

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

                {visibleWeeks.map((section) => (

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
