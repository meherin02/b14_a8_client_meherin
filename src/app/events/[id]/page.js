import { EventDetails } from "@/components/events/EventViews";
export default async function DetailsPage({ params }) {
  const { id } = await params;
  return <EventDetails id={id} />;
}
