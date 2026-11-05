"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";
export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const path = usePathname();
  const browsingEvents = path === "/events" || path.startsWith("/events/");
  async function logout() {
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error(result.error.message);
      toast.success("You have logged out.");
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Could not log out.");
    }
  }
  return (
    <header className="border-b border-base-300">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4"
      >
        <Link
          href="/"
          aria-current={path === "/" ? "page" : undefined}
          className="text-lg font-bold tracking-tight sm:text-xl"
        >
          Community
          <span className="text-success">
            {" "}
            Events<span aria-hidden="true"> ↗</span>
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Link
            href="/events"
            aria-current={
              path === "/events"
                ? "page"
                : browsingEvents
                  ? "location"
                  : undefined
            }
            className={`text-sm font-semibold ${browsingEvents ? "text-success underline underline-offset-4" : ""}`}
          >
            Upcoming events
          </Link>
          <ThemeToggle />
          {isPending ? (
            <span
              className="loading loading-spinner loading-sm"
              aria-label="Checking login"
            />
          ) : session ? (
            <>
              <details className="dropdown dropdown-end">
                <summary
                  className="btn btn-circle btn-ghost"
                  title={session.user.name}
                  aria-label={`Account menu for ${session.user.name}`}
                >
                  {session.user.image ? (
                    <Image
                      unoptimized
                      src={session.user.image}
                      alt={session.user.name}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xl">
                      {session.user.name?.slice(0, 1)}
                    </span>
                  )}
                </summary>
                <ul className="menu dropdown-content z-20 mt-3 w-52 rounded-xl border border-base-300 bg-base-100 p-3 shadow-xl">
                  <li className="menu-title">{session.user.name}</li>
                  {[
                    ["/create-event", "Create event"],
                    ["/manage-events", "Manage events"],
                    ["/joined-events", "Joined events"],
                    ["/profile", "Your profile"],
                  ].map(([href, label]) => {
                    const selected =
                      path === href ||
                      (href === "/manage-events" &&
                        path.startsWith("/update-event/"));
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          aria-current={
                            path === href
                              ? "page"
                              : selected
                                ? "location"
                                : undefined
                          }
                          className={
                            selected
                              ? "bg-success/10 font-semibold text-success"
                              : undefined
                          }
                          onClick={(e) =>
                            e.currentTarget
                              .closest("details")
                              .removeAttribute("open")
                          }
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
              <button className="btn btn-outline btn-sm" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <Link
              aria-current={path === "/login" ? "page" : undefined}
              className="btn btn-success btn-sm"
              href="/login"
            >
              Log in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
