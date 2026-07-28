import { getEventOptions } from "@/lib/api/events";
import ScoutPageClient from "./scoutPageClient";
import { getMatchOptions } from "@/lib/api/match";


interface Props {
  searchParams: Promise<{
    event?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const events = await getEventOptions();

  const selectedEvent =
    (await searchParams).event ?? events?.[0]?.key ?? null;

  const matches =
    selectedEvent ? await getMatchOptions(selectedEvent) : null;

  //const alliances =
  //  selectedEvent ? await getAlliance(selectedEvent) : null;

  return (
    <ScoutPageClient
      eventsList={events}
      selectedEvent={selectedEvent}
      matches={matches}
      redAlliance={[]}
      blueAlliance={[]}
    />
  );
}