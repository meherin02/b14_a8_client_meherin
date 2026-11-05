import Link from "next/link";
import { EventList, EventImage } from "@/components/events/EventViews";
const pictures = [
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
];
export default function HomeContent() {
  return (
    <div className="space-y-12 pb-4 sm:space-y-16 lg:space-y-20 lg:pb-8">
      <section className="grid overflow-hidden rounded-3xl bg-base-200 lg:grid-cols-2">
        <div className="p-6 py-9 sm:p-10 lg:p-14">
          <p className="eyebrow">Small actions. Shared purpose.</p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:mt-6 lg:text-6xl">
            Good things
            <br />
            start with
            <br />
            <span className="text-success">showing up.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-base-content/70 sm:text-base lg:mt-6">
            Plant a tree. Share a meal. Care for a neighborhood. Find local
            people turning a little time into lasting change.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-8">
            <Link href="/events" className="btn btn-success min-h-12 sm:w-auto">
              Find your next event ↗
            </Link>
            <Link
              href="/create-event"
              className="btn btn-outline min-h-12 sm:w-auto"
            >
              Start something good
            </Link>
          </div>
          <p className="mt-7 text-[10px] font-bold uppercase leading-5 tracking-widest text-base-content/55 sm:text-xs lg:mt-10">
            Local people · Meaningful action · Everyone welcome
          </p>
        </div>
        <EventImage
          src={pictures[0]}
          eager
          alt="Volunteers working together for their community"
          className="h-56 w-full sm:h-72 lg:h-full"
        />
      </section>
      <section>
        <div className="mb-6 max-w-xl sm:mb-9">
          <p className="eyebrow">A simpler way to give back</p>
          <h2 className="section-title">
            Find your people.
            <br />
            Make your difference.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
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
            <article
              key={n}
              className="rounded-2xl border border-base-300 p-6 lg:p-7"
            >
              <span className="text-sm font-bold text-success">{n} /</span>
              <h3 className="mt-5 text-xl font-bold lg:mt-8">{title}</h3>
              <p className="mt-3 leading-7 text-base-content/65">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-9">
          <div>
            <p className="eyebrow">Make room for something meaningful</p>
            <h2 className="section-title">Coming up in the community</h2>
          </div>
          <Link
            href="/events"
            className="link inline-flex min-h-11 items-center text-sm font-semibold sm:text-base"
          >
            Explore all events ↗
          </Link>
        </div>
        <EventList home />
      </section>
      <section>
        <p className="eyebrow">The spirit of giving back</p>
        <h2 className="section-title mb-6 sm:mb-9">
          Little moments. Lasting impact.
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
          {pictures.map((src, i) => (
            <figure
              key={src}
              className={i === 0 ? "col-span-2 sm:col-span-1" : "min-w-0"}
            >
              <EventImage
                src={src}
                alt={
                  [
                    "People coming together to volunteer",
                    "Fresh produce growing in a garden",
                    "Caring for a greener environment",
                  ][i]
                }
                className={`${i === 0 ? "h-52" : "h-36"} w-full rounded-2xl sm:h-64`}
              />
              <figcaption className="mt-3 text-xs leading-6 text-base-content/65 sm:mt-4 sm:text-sm">
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
      <section className="rounded-3xl bg-success/10 p-6 sm:p-10 lg:p-12">
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
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter"
                type="email"
                className="input min-h-12 w-full min-w-0 sm:flex-1"
                placeholder="you@example.com"
              />
              <button
                disabled
                className="btn btn-success min-h-12 w-full sm:w-auto"
              >
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
