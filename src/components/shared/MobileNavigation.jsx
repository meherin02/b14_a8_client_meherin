"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MobileNavigation({
  user,
  loading,
  pathname,
  onLogout,
}) {
  const menuRef = useRef(null);
  const menuId = useId();
  function closeMenu() {
    menuRef.current?.removeAttribute("open");
  }
  useEffect(() => {
    function closeOutside(event) {
      const menu = menuRef.current;
      if (menu?.open && !menu.contains(event.target))
        menu.removeAttribute("open");
    }
    function closeOnEscape(event) {
      const menu = menuRef.current;
      if (event.key === "Escape" && menu?.open) {
        event.preventDefault();
        menu.removeAttribute("open");
        menu.querySelector("summary")?.focus();
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);
  const links = [
    ["/", "Home"],
    ["/events", "Upcoming events"],
    ...(user
      ? [
          ["/create-event", "Create event"],
          ["/manage-events", "Manage events"],
          ["/joined-events", "Joined events"],
          ["/profile", "Your profile"],
        ]
      : []),
  ];
  return (
    <details ref={menuRef} className="dropdown dropdown-end relative">
      <summary
        className="btn btn-square btn-ghost relative h-11 w-11"
        aria-label={
          user
            ? `Open navigation and account menu for ${user.name}`
            : "Open navigation menu"
        }
        aria-controls={menuId}
        title={user?.name || "Navigation menu"}
      >
        {user?.image ? (
          <>
            <Image
              unoptimized
              src={user.image}
              width={36}
              height={36}
              alt={user.name}
              className="h-9 w-9 rounded-full object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-base-300 bg-base-100 text-xs"
            >
              ≡
            </span>
          </>
        ) : (
          <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </summary>
      <div
        id={menuId}
        className="dropdown-content absolute right-0 z-50 mt-4 w-[min(21rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-xl"
      >
        <div className="border-b border-base-300 px-5 py-4">
          <p className="eyebrow">Your community</p>
          <p className="mt-2 truncate text-sm font-semibold">
            {loading
              ? "Checking your account…"
              : user
                ? user.name
                : "A little time can make a difference."}
          </p>
        </div>
        <nav aria-label="Mobile navigation" className="space-y-1 p-2">
          {links.map(([href, label]) => {
            const selected =
              pathname === href ||
              (href === "/events" && pathname.startsWith("/events/")) ||
              (href === "/manage-events" &&
                pathname.startsWith("/update-event/"));
            return (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                aria-current={
                  pathname === href ? "page" : selected ? "location" : undefined
                }
                className={`flex min-h-11 items-center justify-between rounded-xl px-3 text-sm transition-colors ${selected ? "bg-success/10 font-semibold text-success" : "hover:bg-base-200"}`}
              >
                {label}
                {selected && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-success"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        {!loading && (
          <div className="border-t border-base-300 p-4">
            {user ? (
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onLogout();
                }}
                className="btn btn-outline min-h-11 w-full"
              >
                Log out
              </button>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="btn btn-success min-h-11 w-full"
                >
                  Log in
                </Link>
                <p className="text-center text-sm text-base-content/65">
                  New here?{" "}
                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="link font-semibold"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </details>
  );
}
