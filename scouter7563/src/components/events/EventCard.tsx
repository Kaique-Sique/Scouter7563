"use client";

import Link from "next/link";
import { Star, MapPin, Users, CalendarDays } from "lucide-react";
import type { EventsListItem } from "@/types/events";

interface EventCardProps {
    event: EventsListItem;
    onToggleFavorite?: (eventKey: string) => void;
}

export default function EventCard({
    event,
    onToggleFavorite,
}: EventCardProps) {

    return (
        <Link
            href={`/events/${event.event_key}`}
            className="
                group
                flex
                items-center
                justify-between
                gap-4
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-5
                transition-all
                duration-200
                hover:border-slate-700
            "
        >

            {/* Main info */}
            <div className="flex flex-col gap-3">

                <h3
                    className="
                        text-lg
                        font-semibold
                        text-white
                    "
                >
                    {event.name}
                </h3>


                <div
                    className="
                        flex
                        flex-wrap
                        gap-x-5
                        gap-y-2
                        text-sm
                        text-slate-400
                    "
                >

                    <span className="flex items-center gap-2">
                        <MapPin size={15} />
                        {event.city}, {event.country}
                    </span>


                    <span className="flex items-center gap-2">
                        <CalendarDays size={15} />
                        {event.startDate} - {event.endDate}
                    </span>


                    <span className="flex items-center gap-2">
                        <Users size={15} />
                        {event.teams} Teams
                    </span>

                </div>

            </div>


            {/* Favorite */}
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleFavorite?.(event.event_key);
                }}
                className={[
                    "flex",
                    "h-10",
                    "w-10",
                    "shrink-0",
                    "items-center",
                    "justify-center",
                    "rounded-xl",
                    "border",
                    "transition-all",
                    "duration-200",

                    event.favorite
                        ? "border-amber-400 bg-amber-500/10 text-amber-400"
                        : "border-slate-700 text-slate-400 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-400",
                ].join(" ")}
            >

                <Star
                    size={18}
                    fill={
                        event.favorite
                            ? "currentColor"
                            : "none"
                    }
                />

            </button>


        </Link>
    );
}
