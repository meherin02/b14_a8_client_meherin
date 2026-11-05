import Link from "next/link";
import BrandMark from "./BrandMark";

const footerLinks = [
  {
    title: "Explore",
    links: [
      ["/", "Home"],
      ["/events", "Upcoming events"],
      ["/register", "Join the community"],
    ],
  },
  {
    title: "Get involved",
    links: [
      ["/create-event", "Create an event"],
      ["/joined-events", "Joined events"],
      ["/manage-events", "Manage events"],
      ["/profile", "Your profile"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-8 bg-[#0b2922] text-[#b8cec5]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-5">
        <section
          aria-labelledby="footer-invitation"
          className="grid gap-7 border-b border-white/15 py-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12"
        >
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fe5b8]">
              A little time. A lasting difference.
            </p>
            <h2
              id="footer-invitation"
              className="mt-4 text-[1.625rem] font-bold leading-tight tracking-tight text-white sm:text-4xl"
            >
              Your next good deed
              <br />
              starts with showing up.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7">
              Find a cause close to your heart, meet people who care, and do
              something good together.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/events"
              className="inline-flex min-h-12 items-center justify-center gap-6 rounded-xl bg-[#7fe5b8] px-6 py-3 text-sm font-bold text-[#0b2922] transition-colors hover:bg-[#a0efcc] focus-visible:outline-white"
            >
              Explore events <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="/create-event"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5 focus-visible:outline-white"
            >
              Organize an event
            </Link>
          </div>
        </section>

        <div className="grid gap-x-8 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr] lg:gap-14 lg:py-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-lg text-white focus-visible:outline-[#7fe5b8]"
            >
              <BrandMark className="h-10 w-10 text-[#00a878]" />
              <span className="text-xl font-bold tracking-tight">
                Community Events
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7">
              A place for neighbors to turn small acts of kindness into
              stronger, greener communities.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-xs text-[#7fe5b8]">
              <span
                className="h-1.5 w-1.5 rounded-full bg-current"
                aria-hidden="true"
              />
              Local people. Shared purpose.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:col-span-2 lg:contents">
            {footerLinks.map((group) => (
              <nav
                key={group.title}
                aria-label={`Footer ${group.title.toLowerCase()}`}
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-1">
                  {group.links.map(([href, label]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="inline-flex min-h-10 items-center rounded-sm py-2 text-sm transition-colors hover:text-white hover:underline hover:underline-offset-4 focus-visible:outline-[#7fe5b8]"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 py-6 text-xs leading-6 text-[#93b4a5] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Community Events. All rights reserved.
          </p>
          <p>Small actions. Stronger communities.</p>
        </div>
      </div>
    </footer>
  );
}
