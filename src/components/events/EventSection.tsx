/**
 * EventSection
 *
 * One labeled group of events on `/events` (e.g. "Week 3",
 * "Championship"). `sectionRef` registers the rendered `<section>`'s
 * DOM node back into `EventsPageClient`'s ref map so `EventFilters`
 * can scroll to / observe it — see the callback-ref usage in
 * `EventsPageClient.tsx`.
 */
import EventCard from "@/components/events/EventCard";
import { EventListItem } from "@/types/events";

interface EventSectionProps {
    id: string;
    title: string;
    events: EventListItem[] | null;
    sectionRef?: (el: HTMLElement | null) => void;
    onToggleFavorite?: (eventKey: string) => void;
}

export default function EventSection({
    id,
    title,
    events,
    sectionRef,
    onToggleFavorite,
}: EventSectionProps) {

    return (
        <section
            ref={sectionRef}
            id={id}
            className="scroll-mt-60 space-y-4"
        >

            {/* Section Header */}
            <div className="flex items-center gap-4">

                <h2
                    className="
                        text-lg
                        font-semibold
                        text-white
                        whitespace-nowrap
                    "
                >
                    {title}
                </h2>


                <div
                    className="
                        h-px
                        flex-1
                        bg-slate-800
                    "
                />

            </div>


            {/* Events */}
            <div
                className="
                    space-y-3
                "
            >

                {events ? events.map((event) => (

                    <EventCard
                        key={event.event_key}
                        event={event}
                        onToggleFavorite={onToggleFavorite}
                    />

                )) : null
                }

            </div>

        </section>
    );
}
