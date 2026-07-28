import { getEventOptions } from "@/lib/api/events";
import ScoutPageClient from "./scoutPageClient";


export default async function Home() {
  const events = await getEventOptions();

  return (
    <ScoutPageClient
      EventsList={events ?? []}
    />
  );
}