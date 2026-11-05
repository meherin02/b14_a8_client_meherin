"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";

export default function JoinEventButton({ eventId, ended }) {
  const { data: session, isPending } = authClient.useSession();
  if (isPending)
    return (
      <button className="btn btn-success mt-6 w-full" disabled>
        Checking login…
      </button>
    );
  return (
    <JoinAction
      key={`${eventId}:${session?.user.id || "guest"}`}
      eventId={eventId}
      userId={session?.user.id}
      ended={ended}
    />
  );
}

function JoinAction({ eventId, userId, ended }) {
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const [checking, setChecking] = useState(Boolean(userId));
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    if (!userId) return;
    const controller = new AbortController();
    api(`/api/registrations/events/${encodeURIComponent(eventId)}/status`, {
      protected: true,
      signal: controller.signal,
    })
      .then((data) => {
        if (!controller.signal.aborted) {
          setJoined(data.joined === true);
          setError("");
        }
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setError(
            "We couldn’t check whether you have joined. Please try again.",
          );
      })
      .finally(() => {
        if (!controller.signal.aborted) setChecking(false);
      });
    return () => controller.abort();
  }, [eventId, userId, revision]);
  async function join() {
    if (!userId) {
      toast.info("Please log in to join this event.");
      router.push(`/login?next=${encodeURIComponent(`/events/${eventId}`)}`);
      return;
    }
    setBusy(true);
    try {
      await api("/api/registrations", {
        method: "POST",
        protected: true,
        body: JSON.stringify({ eventId }),
      });
      setJoined(true);
      toast.success("You have joined this event!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div>
      <button
        className="btn btn-success mt-6 w-full"
        disabled={busy || checking || ended || joined || Boolean(error)}
        onClick={join}
      >
        {checking
          ? "Checking registration…"
          : joined
            ? "Joined ✓"
            : ended
              ? "Event has ended"
              : busy
                ? "Joining…"
                : "Join event"}
      </button>
      {error && (
        <div role="alert" className="mt-3 text-sm">
          <p>{error}</p>
          <button
            className="btn btn-ghost btn-sm mt-2"
            onClick={() => {
              setChecking(true);
              setError("");
              setRevision((value) => value + 1);
            }}
          >
            Try again
          </button>
        </div>
      )}
      {joined && (
        <Link href="/joined-events" className="link mt-4 block text-sm">
          View your joined events
        </Link>
      )}
    </div>
  );
}
