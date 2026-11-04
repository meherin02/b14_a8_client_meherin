import Link from "next/link";
import { EventList, EventImage } from "@/components/events/EventViews";
const pictures = [
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
];
export default function HomeContent() {
  return (
    <div className="space-y-20 pb-8">
      <section className="grid overflow-hidden rounded-3xl bg-base-200 lg:grid-cols-2">
        <div className="p-8 py-14 sm:p-14">
          <p className="eyebrow">Small actions. Shared purpose.</p>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Good things
            <br />
            start with
            <br />
            <span className="text-success">showing up.</span>
          </h1>
          <p className="mt-6 max-w-md leading-7 text-base-content/70">
            Plant a tree. Share a meal. Care for a neighborhood. Find local
            people turning a little time into lasting change.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className="btn btn-success">
              Find your next event ↗
            </Link>
            <Link href="/create-event" className="btn btn-outline">
              Start something good
            </Link>
          </div>
          <p className="mt-10 text-xs font-bold uppercase tracking-widest text-base-content/50">
            Local people · Meaningful action · Everyone welcome
          </p>
        </div>
        <EventImage
          src={pictures[0]}
          alt="Volunteers working together for their community"
          className="h-80 w-full lg:h-full"
        />
      </section>
      <section>
        <div className="mb-9 max-w-xl">
          <p className="eyebrow">A simpler way to give back</p>
          <h2 className="section-title">
            Find your people.
            <br />
            Make your difference.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [
              "01",
              "Discover a cause",
              "Find upcoming cleanups, donation drives and planting days near you.",
            ],
            [
              "02",
              "Save your place",
              "Join an event and keep all your volunteering plans in one place.",
            ],
            [
              "03",
              "Bring people together",
              "Have an idea? Create your own event and invite your community to help.",
            ],
          ].map(([n, title, text]) => (
            <article key={n} className="rounded-2xl border border-base-300 p-7">
              <span className="text-sm font-bold text-success">{n} /</span>
              <h3 className="mt-8 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-base-content/65">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Make room for something meaningful</p>
            <h2 className="section-title">Coming up in the community</h2>
          </div>
          <Link href="/events" className="link font-semibold">
            Explore all events ↗
          </Link>
        </div>
        <EventList home />
      </section>
      <section>
        <p className="eyebrow">The spirit of giving back</p>
        <h2 className="section-title mb-9">Little moments. Lasting impact.</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {pictures.map((src, i) => (
            <figure key={src}>
              <EventImage
                src={src}
                alt={
                  [
                    "People coming together to volunteer",
                    "Fresh produce growing in a garden",
                    "Caring for a greener environment",
                  ][i]
                }
                className="h-64 w-full rounded-2xl"
              />
              <figcaption className="mt-4 text-sm text-base-content/65">
                {
                  [
                    "Together is a good place to start.",
                    "Growing something worth sharing.",
                    "A greener tomorrow starts today.",
                  ][i]
                }
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="rounded-3xl bg-success/10 p-8 sm:p-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow">Stay close to the good</p>
            <h2 className="section-title">
              A little inspiration
              <br />
              in your inbox.
            </h2>
            <p className="mt-4 text-base-content/65">
              Community stories and opportunities to make a difference.
            </p>
          </div>
          <div>
            <label
              htmlFor="newsletter"
              className="mb-3 block text-sm font-semibold"
            >
              Your email address
            </label>
            <div className="flex flex-wrap gap-3">
              <input
                id="newsletter"
                type="email"
                className="input flex-1 min-w-40"
                placeholder="you@example.com"
              />
              <button disabled className="btn btn-success">
                Subscribe
              </button>
            </div>
            <p className="mt-3 text-xs text-base-content/60">
              Our newsletter is coming soon.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
