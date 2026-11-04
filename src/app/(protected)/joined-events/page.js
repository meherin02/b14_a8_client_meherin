import { EventList } from "@/components/events/EventViews";
export default function JoinedPage() {
  return (
    <section>
      <p className="eyebrow">Thanks for showing up</p>
      <h1 className="page-title">Your joined events</h1>
      <p className="page-intro">
        Your volunteering plans, arranged by event date.
      </p>
      <EventList joined />
    </section>
  );
}
