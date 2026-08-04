import UpcomingMatches from "@/components/dashboard/UpcomingMatches";
import EventInfo, { EventInfoProps } from "@/components/events/event/EventInfo";
import EventLiveStreams from "@/components/events/event/EventLiveStreams";
import { WebcastUrl } from "@/types/events";

interface EventOverviewProps {
    information: EventInfoProps;
    webcasts: WebcastUrl[];
}

export default function EventOverview({
    information,
    webcasts,
}: EventOverviewProps) {
    return (
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">

                <EventInfo
                    {...information}
                />


            </aside>

            <main>
                <EventLiveStreams
                    webcasts={webcasts}
                />

                {/* Upcoming Matches */}
                <UpcomingMatches className="mt-6" matches={[]} />
            </main>

        </div>
    );
}