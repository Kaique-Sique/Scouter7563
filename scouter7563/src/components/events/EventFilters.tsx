"use client";

import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type FilterType =
    | "preseason"
    | "week1"
    | "week2"
    | "week3"
    | "week4"
    | "week5"
    | "week6"
    | "week7"
    | "championship"
    | "offseason";

interface EventFiltersProps {
    sections: Record<FilterType, React.RefObject<HTMLElement | null>>;
    visibleSections: FilterType[];
    favorite: boolean;
    onToggleFavorite: () => void;
}

interface Filter {
    id: FilterType;
    label: string;
    gold?: boolean;
}

const ALL_FILTERS: Filter[] = [
    { id: "preseason", label: "Preseason" },
    { id: "week1", label: "Week 1" },
    { id: "week2", label: "Week 2" },
    { id: "week3", label: "Week 3" },
    { id: "week4", label: "Week 4" },
    { id: "week5", label: "Week 5" },
    { id: "week6", label: "Week 6" },
    { id: "week7", label: "Week 7" },
    {
        id: "championship",
        label: "Championship",
        gold: true,
    },
    {
        id: "offseason",
        label: "Offseason",
    },
];



export default function EventFilters({
    sections,
    visibleSections,
    favorite,
    onToggleFavorite,
}: EventFiltersProps) {

    // só mostra pills das seções que estão de fato renderizadas agora
    // (ex: quando o filtro de favoritos esconde semanas sem eventos favoritados)
    const filters = ALL_FILTERS.filter((filter) =>
        visibleSections.includes(filter.id)
    );

    const [activeSection, setActiveSection] =
        useState<FilterType>("preseason");

    // se a seção ativa não estiver mais visível (ex: favoritos escondeu ela),
    // cai pra primeira seção visível só pra fins de renderização —
    // sem disparar setState dentro de efeito
    const effectiveActiveSection: FilterType =
        visibleSections.includes(activeSection)
            ? activeSection
            : visibleSections[0] ?? activeSection;

    const scrollRef =
        useRef<HTMLDivElement>(null);

    const refs =
        useRef<Record<FilterType, HTMLButtonElement | null>>(
            {} as Record<FilterType, HTMLButtonElement | null>
        );

    function scrollToSection(id: FilterType) {

    const section =
        sections[id];

    if (!section?.current)
        return;


    section.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });

}

    useEffect(() => {
        const container = scrollRef.current;
        const button = refs.current[effectiveActiveSection];

        if (!container || !button)
            return;

        const buttonLeft = button.offsetLeft;
        const buttonRight = buttonLeft + button.offsetWidth;

        const scrollLeft = container.scrollLeft;
        const scrollRight = scrollLeft + container.clientWidth;

        const padding = 12;

        // botão está escondido para esquerda
        if (buttonLeft < scrollLeft) {
            container.scrollTo({
                left: buttonLeft - padding,
                behavior: "smooth",
            });
        }

        // botão está escondido para direita
        else if (buttonRight > scrollRight) {
            container.scrollTo({
                left: buttonRight - container.clientWidth + padding,
                behavior: "smooth",
            });
        }

    }, [effectiveActiveSection]);

    useEffect(() => {

        const observer = new IntersectionObserver(
            (entries) => {

                const visible =
                    entries
                        .filter(
                            (entry) => entry.isIntersecting
                        )
                        .sort(
                            (a, b) =>
                                b.intersectionRatio -
                                a.intersectionRatio
                        )[0];


                if (!visible)
                    return;


                setActiveSection(
                    visible.target.id as FilterType
                );

            },
            {
                rootMargin: "-40% 0px -50% 0px",
                threshold: 0,
            }
        );


        visibleSections.forEach((id) => {

            const section = sections[id];

            if (section?.current) {

                observer.observe(section.current);

            }

        });


        return () => observer.disconnect();


    }, [sections, visibleSections]);

    return (
        <div className="relative flex items-center">

            {/* Favorite */}
            <button
                onClick={onToggleFavorite}
                className={[
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-200",

                    favorite
                        ? "border-amber-400 bg-amber-500/15 text-amber-300 shadow-md shadow-amber-500/20"
                        : "border-slate-700 bg-slate-950 text-slate-400 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-400",
                ].join(" ")}
            >
                <Star
                    size={18}
                    fill={favorite ? "currentColor" : "none"}
                />
            </button>

            {/* Divider */}
            <span className="mx-3 shrink-0 select-none text-lg font-light text-slate-600">
                |
            </span>

            {/* Left Fade */}
            <div className="pointer-events-none absolute left-[74px] top-0 z-10 h-full w-5 bg-gradient-to-r from-slate-900 to-transparent" />

            {/* Right Fade */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-slate-900 to-transparent" />

            {/* Weeks */}
            <div
                ref={scrollRef}
                className="
        flex flex-1 gap-2 overflow-x-auto pb-1 pl-2
        scroll-smooth
        scrollbar-thin
        scrollbar-track-transparent
        scrollbar-thumb-slate-700
        hover:scrollbar-thumb-slate-600
    "
            >
                {filters.map((filter) => {

                    const active =
                        effectiveActiveSection === filter.id;

                    const gold =
                        filter.gold;

                    return (

                        <button
                            key={filter.id}
                            ref={(el) => {
                                refs.current[filter.id] = el;
                            }}
                            onClick={() => {
                                scrollToSection(filter.id);
                            }}
                            className={[
                                "shrink-0",
                                "h-11",
                                "rounded-xl",
                                "border",
                                "px-4",
                                "text-sm",
                                "font-medium",
                                "transition-all",
                                "duration-200",

                                active
                                    ? gold
                                        ? "border-amber-400 bg-amber-500/15 text-amber-300 shadow-md shadow-amber-500/20 scale-[1.02]"
                                        : "border-sky-500 bg-sky-500/15 text-sky-300 shadow-md shadow-sky-500/10 scale-[1.02]"

                                    : gold
                                        ? "border-slate-700 bg-slate-950 text-slate-300 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-400"

                                        : "border-slate-700 bg-slate-950 text-slate-300 hover:border-sky-500 hover:bg-sky-500/10 hover:text-sky-300",

                            ].join(" ")}
                        >
                            {filter.label}
                        </button>

                    );

                })}
            </div>

        </div>
    );

}
