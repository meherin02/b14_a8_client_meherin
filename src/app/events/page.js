import { EventList } from "@/components/events/EventViews";
export default function EventsPage() {
  return (
    <section>
      <p className="eyebrow">Find your next good deed</p>
      <h1 className="page-title">Upcoming events</h1>
      <p className="page-intro">
        A little of your time can mean a lot to your community.
      </p>
      <EventList />
    </section>
  );
}
