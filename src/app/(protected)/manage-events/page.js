import Link from "next/link";
import { EventList } from "@/components/events/EventViews";
export default function ManagePage() {
  return (
    <section>
      <p className="eyebrow">Your ideas, in action</p>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="page-title">Manage your events</h1>
        <Link className="btn btn-success" href="/create-event">
          + Create event
        </Link>
      </div>
      <EventList manage />
    </section>
  );
}
