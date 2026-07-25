import EventCard from "@/components/events/EventCard";
import type { EventItem } from "@/components/events/types";

interface EventSectionProps {
    title: string;
    events: EventItem[];
    sectionRef?: React.RefObject<HTMLElement | null>;
    onToggleFavorite?: (eventKey: string) => void;
}

export default function EventSection({
    title,
    events,
    sectionRef,
    onToggleFavorite,
}: EventSectionProps) {

    return (
        <section
            ref={sectionRef}
            id={title.toLowerCase().replace(" ", "")}
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

                {events.map((event) => (

                    <EventCard
                        key={event.event_key}
                        event={event}
                        onToggleFavorite={onToggleFavorite}
                    />

                ))}

            </div>

        </section>
    );
}
