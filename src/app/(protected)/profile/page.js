"use client";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { EventImage } from "@/components/events/EventViews";
import GoogleConnection from "@/components/auth/GoogleConnection";
export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const [busy, setBusy] = useState(false);
  async function save(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    values.name = values.name.trim();
    values.image = values.image.trim();
    if (!values.name || !/^https?:\/\//.test(values.image)) {
      toast.error("Enter your name and a valid photo URL.");
      return;
    }
    setBusy(true);
    try {
      const result = await authClient.updateUser(values);
      if (result.error) throw new Error(result.error.message);
      toast.success("Profile updated.");
    } catch (error) {
      toast.error(error.message || "Could not update your profile.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="mx-auto max-w-xl">
      <p className="eyebrow">A face behind the good</p>
      <h1 className="page-title mb-8">Your profile</h1>
      <form
        onSubmit={save}
        className="space-y-6 rounded-3xl border border-base-300 p-7"
      >
        <EventImage
          key={session?.user.image}
          src={session?.user.image}
          alt={session?.user.name || "Your profile"}
          className="h-24 w-24 rounded-full"
        />
        <label className="block">
          Name
          <input
            className="input mt-2 w-full"
            name="name"
            defaultValue={session?.user.name}
            required
            maxLength={100}
          />
        </label>
        <label className="block">
          Email
          <input
            className="input mt-2 w-full"
            value={session?.user.email || ""}
            readOnly
          />
        </label>
        <label className="block">
          Photo URL
          <input
            className="input mt-2 w-full"
            name="image"
            type="url"
            defaultValue={session?.user.image}
            required
          />
        </label>
        <button className="btn btn-success" disabled={busy}>
          {busy ? "Saving…" : "Save profile"}
        </button>
      </form>
      <GoogleConnection />
    </section>
  );
}
