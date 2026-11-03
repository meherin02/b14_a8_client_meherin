"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
export default function ProtectedLayout({ children }) {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const router = useRouter();
  useEffect(() => {
    if (!isPending && !error && !session) router.replace("/login");
  }, [isPending, error, session, router]);
  if (isPending)
    return (
      <p role="status" className="py-12 text-center">
        Checking your session…
      </p>
    );
  if (error)
    return (
      <div role="alert" className="alert alert-error flex-wrap">
        <span>
          Cannot check your session. Make sure the API server is running.
        </span>
        <button className="btn btn-sm" onClick={() => refetch()}>
          Try again
        </button>
      </div>
    );
  if (!session) return <p role="status">Opening login…</p>;
  return children;
}
