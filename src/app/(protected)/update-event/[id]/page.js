import { EventEditor } from "@/components/events/EventViews";
export default async function UpdatePage({ params }) {
  const { id } = await params;
  return <EventEditor id={id} />;
}
