"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";
export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function checkAPI() {
    setBusy(true);
    try {
      const data = await api("/api/me", { protected: true });
      setStatus(`JWT verified. You are signed in as ${data.user.email}.`);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="mx-auto max-w-xl space-y-5">
      <h1 className="text-3xl font-bold">Your account</h1>
      <p>Name: {session?.user.name}</p>
      <p>Email: {session?.user.email}</p>
      <button className="btn btn-outline" onClick={checkAPI} disabled={busy}>
        {busy ? "Checking…" : "Check protected API connection"}
      </button>
      <p role="status">{status}</p>
    </section>
  );
}
