"use client";

/**
 * TeamFilters
 *
 * Batch-navigation pill bar for `/teams` — same pattern as
 * `EventFilters.tsx` (scroll-spy + click-to-scroll), but keyed off
 * `TeamSectionMeta` batches of 500 (see `groupTeamsByBatch`) instead
 * of week sections.
 *
 * NOTE: not currently rendered by `TeamsPageClient.tsx`, which uses
 * client-side infinite scroll instead of batch pagination. Left in
 * place as a ready-to-use alternative UI, not dead code to delete.
 */
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { TeamSectionMeta } from "@/utils/groupTeamsByBatch";

interface TeamFiltersProps {
    // ref mutável com o elemento DOM de cada seção, preenchida pelo
    // TeamsPageClient via callback ref
    sectionEls: React.MutableRefObject<Record<string, HTMLElement | null>>;
    // metadados (id/label) de todas as seções (lotes de 500) atualmente
    // visíveis, já na ordem em que devem aparecer
    visibleSections: TeamSectionMeta[];
    favorite: boolean;
    onToggleFavorite: () => void;
    // avisa o pai qual lote foi escolhido — necessário porque, com a
    // renderização em janela, o lote clicado pode ainda não estar montado
    // no DOM (então ainda não existe em `sectionEls`)
    onSelectSection?: (id: string) => void;
}

export default function TeamFilters({
    sectionEls,
    visibleSections,
    favorite,
    onToggleFavorite,
    onSelectSection,
}: TeamFiltersProps) {

    const visibleIds = visibleSections.map((section) => section.id);

    const [activeSection, setActiveSection] =
        useState<string>(visibleIds[0] ?? "");

    // se a seção ativa não estiver mais visível (ex: favoritos/busca escondeu
    // ela, ou ela deixou de existir porque não sobrou nenhum time), cai pra
    // primeira seção visível só pra fins de renderização —
    // sem disparar setState dentro de efeito
    const effectiveActiveSection: string =
        visibleIds.includes(activeSection)
            ? activeSection
            : visibleIds[0] ?? activeSection;

    const scrollRef =
        useRef<HTMLDivElement>(null);

    const refs =
        useRef<Record<string, HTMLButtonElement | null>>({});

    function scrollToSection(id: string) {

        // deixa o pai carregar o lote se ele ainda não estiver montado
        // (renderização em janela — ver TeamsPageClient)
        onSelectSection?.(id);

        const section = sectionEls.current[id];

        if (!section)
            return;

        section.scrollIntoView({
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

        if (buttonLeft < scrollLeft) {
            container.scrollTo({
                left: buttonLeft - padding,
                behavior: "smooth",
            });
        }

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
                    visible.target.id
                );

            },
            {
                rootMargin: "-40% 0px -50% 0px",
                threshold: 0,
            }
        );


        visibleIds.forEach((id) => {

            const section = sectionEls.current[id];

            if (section) {

                observer.observe(section);

            }

        });


        return () => observer.disconnect();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionEls, visibleIds.join(",")]);

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

            {/* Batches */}
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
                {visibleSections.map((filter) => {

                    const active =
                        effectiveActiveSection === filter.id;

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
                                    ? "border-sky-500 bg-sky-500/15 text-sky-300 shadow-md shadow-sky-500/10 scale-[1.02]"
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
