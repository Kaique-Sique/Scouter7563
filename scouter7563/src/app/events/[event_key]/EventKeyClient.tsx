"use client";

import EventHeader from "@/components/events/event/EventHeader";


interface EventKeyProps {
    eventKey: string;
    tab?: string | null;
}


export default function EventKeyClient({eventKey}: EventKeyProps) {
    return (
        <main className="mx-auto w-full max-w-7xl overflow-x-hidden px-4 py-6 sm:px-6">
            <EventHeader/>
        </main>
        );
}

