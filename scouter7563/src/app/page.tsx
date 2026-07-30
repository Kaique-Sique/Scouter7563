import DashboardPageClient from "./dashboardPageClient";
import { getEventDataDashboard, getEventOptions} from "@/lib/api/events";


interface Props {
  searchParams: Promise<{
    event?: string;
  }>;
}
export default async function Home({ searchParams }: Props) {
  const events = await getEventOptions();

  const params = await searchParams;

  const DashboardData = params.event ? await getEventDataDashboard(params.event) : null;
  
  return (
    <DashboardPageClient
      EventsList={events ?? []}
      DashboardData={DashboardData}
    />
  );
}