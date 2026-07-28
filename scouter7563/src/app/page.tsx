import DashboardPageClient from "./dashboardPageClient";
import { getEventOptions} from "@/lib/api/events";

export default async function Home() {
  const events = await getEventOptions();

  return (
    <DashboardPageClient
      EventsList={events ?? []}
    />
  );
}