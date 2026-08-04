import UpcomingMatches from "@/components/dashboard/UpcomingMatches";
import EventInfo, { EventInfoProps } from "@/components/events/event/EventInfo";
import EventLiveStreams from "@/components/events/event/EventLiveStreams";
import { EventFull,} from "@/types/events";
import { formatEventDateRange } from "@/utils/formatDates";

interface EventOverviewProps {
    event: EventFull;
}

export default function EventOverview({
    event,
}: EventOverviewProps) {

    const information = {
        location: event.city ?? null,
        venue: event.location_name ?? null,
        date: formatEventDateRange(event.startDate ?? null, event.endDate ?? null),
        country: event.country ?? null,
        week: event.week ?? null,
    } as EventInfoProps;

    return (
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">

                <EventInfo
                    {...information}
                />


            </aside>

            <main>
                <EventLiveStreams
                    webcasts={event.webcasts ?? []}
                />

                {/* Upcoming Matches */}
                <UpcomingMatches className="mt-6" matches={[]} />
            </main>

        </div>
    );
}