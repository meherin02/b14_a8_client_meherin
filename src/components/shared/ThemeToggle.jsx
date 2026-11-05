"use client";
import { useSyncExternalStore } from "react";
function subscribe(callback) {
  window.addEventListener("community-theme", callback);
  return () => window.removeEventListener("community-theme", callback);
}
function snapshot() {
  return document.documentElement.dataset.theme || "light";
}
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, snapshot, () => "light");
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("community-theme", next);
    } catch {
      /* The theme still works when browser storage is unavailable. */
    }
    window.dispatchEvent(new Event("community-theme"));
  }
  return (
    <button
      className="btn btn-ghost min-h-11 px-3 text-sm"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? "☀ Light" : "☾ Dark"}
    </button>
  );
}
