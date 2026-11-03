"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
export default function Navbar() {
  const { data: session, isPending, error } = authClient.useSession();
  const router = useRouter();
  async function logout() {
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error(result.error.message);
      toast.success("You have logged out.");
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Could not log out. Try again.");
    }
  }
  return (
    <header className="border-b border-base-300">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4"
      >
        <Link href="/" className="text-xl font-bold tracking-tight">
          Community<span className="text-success"> Events</span>
        </Link>
        {isPending ? (
          <span
            className="loading loading-spinner loading-sm"
            aria-label="Checking login"
          />
        ) : session ? (
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              title={session.user.name}
              className="btn btn-ghost"
            >
              {session.user.name}
            </Link>
            <button onClick={logout} className="btn btn-outline btn-sm">
              Log out
            </button>
          </div>
        ) : (
          <Link href="/login" className="btn btn-outline btn-sm">
            {error ? "Log in / reconnect" : "Log in"}
          </Link>
        )}
      </nav>
    </header>
  );
}
