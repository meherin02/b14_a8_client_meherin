"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function GoogleConnection() {
  const [state, setState] = useState({
    loading: true,
    enabled: false,
    linked: false,
    error: "",
  });
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [config, accounts] = await Promise.all([
          api("/api/config"),
          authClient.listAccounts(),
        ]);
        if (accounts.error)
          throw new Error("Could not check your connected accounts.");
        const error = new URLSearchParams(window.location.search).get("error");
        if (active)
          setState({
            loading: false,
            enabled: config.googleEnabled,
            linked:
              accounts.data?.some(
                (account) => account.providerId === "google",
              ) || false,
            error: error
              ? "Google could not be connected. Choose the Google account with the same email as your profile and try again."
              : "",
          });
      } catch {
        if (active)
          setState({
            loading: false,
            enabled: false,
            linked: false,
            error: "Could not check your connected accounts. Please try again.",
          });
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [revision]);

  async function connect() {
    setBusy(true);
    try {
      const result = await authClient.linkSocial({
        provider: "google",
        callbackURL: `${window.location.origin}/profile`,
        errorCallbackURL: `${window.location.origin}/profile`,
      });
      if (result.error) throw new Error(result.error.message);
    } catch (error) {
      toast.error(
        error.message || "Could not connect Google. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      className="mt-6 space-y-4 rounded-3xl border border-base-300 p-7"
      aria-labelledby="google-title"
    >
      <h2 id="google-title" className="text-xl font-bold">
        Connected accounts
      </h2>
      {state.loading ? (
        <p role="status">Checking Google connection…</p>
      ) : (
        <>
          {state.error && (
            <div role="alert">
              <p className="text-sm text-error">{state.error}</p>
              <button
                className="btn btn-ghost btn-sm mt-2"
                onClick={() => setRevision((value) => value + 1)}
              >
                Check again
              </button>
            </div>
          )}
          {state.linked ? (
            <p className="text-success">
              Google connected. You can use Google to log in.
            </p>
          ) : state.enabled ? (
            <>
              <p className="text-sm text-base-content/65">
                Connect the Google account with the same email as your profile.
                After connecting, you can log in with Google.
              </p>
              <button
                className="btn btn-outline"
                onClick={connect}
                disabled={busy}
              >
                {busy ? "Opening Google…" : "Connect Google"}
              </button>
            </>
          ) : (
            !state.error && (
              <p className="text-sm text-base-content/65">
                Google login is not currently available.
              </p>
            )
          )}
        </>
      )}
    </section>
  );
}
