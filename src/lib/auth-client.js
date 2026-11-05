"use client";
import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";
export const API_URL =
  process.env.NODE_ENV === "production"
    ? ""
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export const authClient = createAuthClient({
  // In production, /api/auth is proxied through Next.js so session cookies
  // belong to the website's domain instead of a separate hosting provider.
  ...(API_URL ? { baseURL: API_URL } : {}),
  fetchOptions: { credentials: "include" },
  plugins: [jwtClient()],
});
