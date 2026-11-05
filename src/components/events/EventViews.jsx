"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import JoinEventButton from "./JoinEventButton";
import DeleteEventDialog from "./DeleteEventDialog";

export const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Other",
];
export function EventImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  const valid = typeof src === "string" && /^https?:\/\//.test(src);
  return valid && !failed ? (
    <Image
      src={src}
      alt={alt}
      width={900}
      height={600}
      unoptimized
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  ) : (
    <div
      className={`flex items-center justify-center bg-success/10 text-success ${className}`}
      aria-label={alt}
    >
      Community in action
    </div>
  );
}
export function EventSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading events"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {[1, 2, 3].map((n) => (
        <div key={n} className="card border border-base-300 p-4">
          <div className="skeleton h-48 w-full" />
          <div className="skeleton mt-5 h-5 w-3/4" />
          <div className="skeleton mt-3 h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
export function dateLabel(date) {
  const value = new Date(date);
  return Number.isNaN(value.getTime())
    ? "Date unavailable"
    : value.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      });
}
function useResource(path, protectedRequest = false) {
  const [state, setState] = useState({ data: null, error: "", loading: true });
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    api(path, { protected: protectedRequest, signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted)
          setState({ data, error: "", loading: false, loadedAt: Date.now() });
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setState({ data: null, error: error.message, loading: false });
      });
    return () => controller.abort();
  }, [path, protectedRequest, revision]);
  function retry() {
    setState({ data: null, error: "", loading: true });
    setRevision((n) => n + 1);
  }
  return { ...state, retry };
}
function RequestError({ retry }) {
  return (
    <div role="alert" className="rounded-2xl border border-base-300 p-8">
      <h3 className="font-bold">We couldn’t load this right now.</h3>
      <p className="my-3 text-base-content/65">
        Please check your connection and try again.
      </p>
      <button onClick={retry} className="btn btn-outline btn-sm">
        Try again
      </button>
    </div>
  );
}
export function EventCard({ event }) {
  return (
    <article className="card h-full min-w-0 flex-1 overflow-hidden border border-base-300 bg-base-100">
      <EventImage
        src={event.image}
        alt={event.title}
        className="h-52 w-full shrink-0"
      />
      <div className="card-body flex-1 gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-success">
          {event.type}
        </span>
        <h3 className="card-title [overflow-wrap:anywhere]">{event.title}</h3>
        <p className="grow-0 text-sm text-base-content/65 [overflow-wrap:anywhere]">
          {event.location}
        </p>
        <p className="grow-0 text-sm">{dateLabel(event.date)}</p>
        <div className="card-actions mt-auto pt-4">
          <Link
            href={`/events/${event._id}`}
            className="btn btn-outline w-full"
          >
            View event <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
export function EventList({ home = false, joined = false, manage = false }) {
  const path = joined
    ? "/api/registrations/me"
    : manage
      ? "/api/events/mine"
      : home
        ? "/api/events?limit=6"
        : "/api/events";
  const resource = useResource(path, joined || manage);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();
  const hasFilters = query.length > 0 || filter !== "All";
  function clearFilters() {
    setQuery("");
    setFilter("All");
  }
  const events = Array.isArray(resource.data)
    ? resource.data
    : resource.data?.events || [];
  const displayed = events
    .filter(
      (event) =>
        (joined ||
          manage ||
          new Date(event.date).getTime() > resource.loadedAt) &&
        (filter === "All" || event.type === filter) &&
        `${event.title} ${event.location}`
          .toLowerCase()
          .includes(normalizedQuery),
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  async function remove() {
    setBusy(true);
    try {
      await api(`/api/events/${deleting._id}`, {
        method: "DELETE",
        protected: true,
      });
      toast.success("Event deleted.");
      setDeleting(null);
      resource.retry();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="space-y-6">
      {!home && (
        <div className="flex flex-wrap gap-3">
          <label className="input flex-1 min-w-48">
            <span className="sr-only">Search events</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or location"
            />
          </label>
          <label>
            <span className="sr-only">Event type</span>
            <select
              className="select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {["All", ...eventTypes].map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          {hasFilters && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          )}
        </div>
      )}
      {!home && !resource.loading && !resource.error && (
        <p role="status" className="text-sm text-base-content/65">
          {displayed.length} {displayed.length === 1 ? "event" : "events"} found
        </p>
      )}
      {resource.loading ? (
        <EventSkeleton />
      ) : resource.error ? (
        <RequestError retry={resource.retry} />
      ) : !displayed.length ? (
        <div className="rounded-2xl border border-dashed border-base-300 px-6 py-14 text-center">
          <h3 className="text-xl font-bold">
            {hasFilters
              ? "No events match these filters"
              : joined
                ? "Your next good deed starts here"
                : manage
                  ? "Your community is waiting"
                  : "No matching events yet"}
          </h3>
          <p className="mt-3 text-base-content/65">
            {hasFilters
              ? "Try another title or location, choose a different event type, or clear your filters."
              : manage
                ? "Create your first event and invite others to make a difference."
                : "Explore other categories or check back for new opportunities."}
          </p>
          {hasFilters ? (
            <button
              type="button"
              className="btn btn-success mt-5"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          ) : (
            <Link
              href={manage ? "/create-event" : "/events"}
              className="btn btn-success mt-5"
            >
              {manage ? "Create an event" : "Explore events"}
            </Link>
          )}
        </div>
      ) : (
        <div className="grid auto-rows-fr items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.slice(0, home ? 6 : undefined).map((event) => (
            <div key={event._id} className="flex min-w-0 flex-col gap-2">
              <EventCard event={event} />
              {manage && (
                <div className="flex gap-2">
                  <Link
                    href={`/update-event/${event._id}`}
                    className="btn btn-outline flex-1"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-ghost text-error"
                    onClick={() => setDeleting(event)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {deleting && (
        <DeleteEventDialog
          title={deleting.title}
          busy={busy}
          onCancel={() => setDeleting(null)}
          onConfirm={remove}
        />
      )}
    </div>
  );
}
export function EventDetails({ id }) {
  const resource = useResource(`/api/events/${encodeURIComponent(id)}`);
  if (resource.loading) return <EventSkeleton />;
  if (resource.error) return <RequestError retry={resource.retry} />;
  const event = resource.data?.event || resource.data;
  const past = new Date(event.date).getTime() <= resource.loadedAt;
  return (
    <article className="mx-auto max-w-4xl">
      <Link href="/events" className="link text-sm">
        ← All upcoming events
      </Link>
      <EventImage
        src={event.image}
        alt={event.title}
        className="mt-6 h-72 w-full rounded-3xl sm:h-96"
      />
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_260px]">
        <div>
          <p className="eyebrow">{event.type}</p>
          <h1 className="mt-3 text-4xl font-bold">{event.title}</h1>
          <p className="mt-6 whitespace-pre-wrap leading-8 text-base-content/75">
            {event.description}
          </p>
        </div>
        <aside className="h-fit rounded-2xl border border-base-300 p-6">
          <h2 className="font-bold">Be part of the change</h2>
          <p className="mt-4">{dateLabel(event.date)}</p>
          <p className="mt-2 text-base-content/65">{event.location}</p>
          <JoinEventButton eventId={id} ended={past} />
        </aside>
      </div>
    </article>
  );
}
export function EventEditor({ id }) {
  if (id) return <LoadedEditor id={id} />;
  return <EventForm />;
}
function LoadedEditor({ id }) {
  const resource = useResource(`/api/events/${encodeURIComponent(id)}`, true);
  if (resource.loading) return <EventSkeleton />;
  if (resource.error) return <RequestError retry={resource.retry} />;
  return <EventForm initial={resource.data?.event || resource.data} id={id} />;
}
function EventForm({ initial = {}, id }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minimum = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
  async function submit(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    for (const key of Object.keys(values)) values[key] = values[key].trim();
    let error = "";
    if (
      ["title", "description", "location", "image", "date"].some(
        (key) => !values[key],
      )
    )
      error = "Please complete every field.";
    else if (!eventTypes.includes(values.type)) error = "Select an event type.";
    else if (!/^https?:\/\//.test(values.image))
      error = "Use an image URL starting with https:// or http://.";
    else if (
      !Number.isFinite(new Date(values.date).getTime()) ||
      values.date < minimum
    )
      error = "Choose a future date, starting tomorrow.";
    if (error) {
      setMessage(error);
      toast.error(error);
      return;
    }
    setMessage("");
    setBusy(true);
    try {
      await api(id ? `/api/events/${id}` : "/api/events", {
        method: id ? "PATCH" : "POST",
        protected: true,
        body: JSON.stringify(values),
      });
      toast.success(id ? "Event updated." : "Your event is ready!");
      router.push(id ? "/manage-events" : "/events");
    } catch (error) {
      setMessage(error.message);
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-2xl space-y-6 rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-10"
    >
      <p className="eyebrow">
        {id ? "Keep everyone informed" : "Bring your community together"}
      </p>
      <h1 className="text-3xl font-bold">
        {id ? "Update your event" : "Create an event"}
      </h1>
      <p className="text-sm text-base-content/65">
        Organizing as {session?.user.email}
      </p>
      <label className="block">
        Event title
        <input
          className="input mt-2 w-full"
          name="title"
          required
          maxLength={120}
          defaultValue={initial.title}
          placeholder="A clear name for your community event"
        />
      </label>
      <label className="block">
        Description
        <textarea
          className="textarea mt-2 min-h-36 w-full"
          name="description"
          required
          maxLength={5000}
          defaultValue={initial.description}
          placeholder="What will volunteers do? What should they bring?"
        />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          Event type
          <select
            name="type"
            className="select mt-2 w-full"
            defaultValue={initial.type || "Cleanup"}
          >
            {eventTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Event date
          <input
            type="date"
            name="date"
            className="input mt-2 w-full"
            min={minimum}
            required
            defaultValue={initial.date?.slice(0, 10)}
          />
        </label>
      </div>
      <label className="block">
        Location
        <input
          name="location"
          className="input mt-2 w-full"
          required
          maxLength={200}
          defaultValue={initial.location}
          placeholder="Meeting point, area and city"
        />
      </label>
      <label className="block">
        Thumbnail image URL
        <input
          name="image"
          type="url"
          className="input mt-2 w-full"
          required
          defaultValue={initial.image}
          placeholder="https://example.com/event.jpg"
        />
      </label>
      {message && (
        <p role="alert" className="text-error">
          {message}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <button className="btn btn-success" disabled={busy}>
          {busy ? "Saving…" : id ? "Save changes" : "Publish event"}
        </button>
        <Link
          className="btn btn-ghost"
          href={id ? "/manage-events" : "/events"}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
