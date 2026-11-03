"use client";
import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export const authClient = createAuthClient({
  baseURL: API_URL,
  fetchOptions: { credentials: "include" },
  plugins: [jwtClient()],
});
