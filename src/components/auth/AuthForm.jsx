"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient, API_URL } from "@/lib/auth-client";
import { validateAuth } from "@/lib/validation";
export default function AuthForm({ isRegister = false }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    fetch(`${API_URL}/api/config`)
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => setGoogleEnabled(Boolean(data.googleEnabled)))
      .catch(() => {});
  }, []);
  async function submit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    values.email = values.email.trim();
    const validation = validateAuth(values, isRegister);
    if (validation) {
      setMessage(validation);
      toast.error(validation);
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const result = isRegister
        ? await authClient.signUp.email({ ...values, name: values.name.trim() })
        : await authClient.signIn.email({
            email: values.email,
            password: values.password,
          });
      if (result.error) throw new Error(result.error.message);
      toast.success(isRegister ? "Your account is ready!" : "Welcome back!");
      router.replace("/profile");
      router.refresh();
    } catch (error) {
      const text =
        error.message || "Could not connect. Check that the server is running.";
      setMessage(text);
      toast.error(text);
    } finally {
      setBusy(false);
    }
  }
  async function googleLogin() {
    setBusy(true);
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/profile`,
      });
      if (result.error) throw new Error(result.error.message);
    } catch (error) {
      toast.error(error.message || "Google login failed.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="card mx-auto max-w-md border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body p-6 sm:p-8">
        <h1 className="text-3xl font-bold">
          {isRegister ? "Join your community" : "Welcome back"}
        </h1>
        <p className="mb-4 text-base-content/65">
          {isRegister
            ? "Create an account to take part in local events."
            : "Log in to take your next small action."}
        </p>
        <form onSubmit={submit} className="space-y-4">
          {isRegister && (
            <label className="block">
              Name
              <input
                className="input mt-1 w-full"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
              />
            </label>
          )}
          <label className="block">
            Email
            <input
              className="input mt-1 w-full"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </label>
          {isRegister && (
            <label className="block">
              Photo URL
              <input
                className="input mt-1 w-full"
                name="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                required
              />
            </label>
          )}
          <label className="block">
            Password
            <input
              className="input mt-1 w-full"
              name="password"
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              required
              maxLength={128}
            />
          </label>
          {isRegister && (
            <p className="text-sm text-base-content/65">
              At least 6 characters, including uppercase and lowercase letters.
            </p>
          )}
          {message && (
            <p role="alert" className="text-sm text-error">
              {message}
            </p>
          )}
          <button className="btn btn-success w-full" disabled={busy}>
            {busy ? "Please wait…" : isRegister ? "Create account" : "Log in"}
          </button>
        </form>
        {googleEnabled && (
          <>
            <div className="divider">or</div>
            <button
              className="btn btn-outline w-full"
              disabled={busy}
              onClick={googleLogin}
            >
              Continue with Google
            </button>
          </>
        )}
        <p className="mt-5 text-center text-sm">
          {isRegister ? "Already have an account? " : "New here? "}
          <Link
            className="link font-semibold"
            href={isRegister ? "/login" : "/register"}
          >
            {isRegister ? "Log in" : "Create an account"}
          </Link>
        </p>
      </div>
    </section>
  );
}
