"use client";
import { authClient, API_URL } from "./auth-client";
export async function api(
  path,
  { protected: requiresAuth = false, ...options } = {},
) {
  const headers = new Headers(options.headers);
  if (options.body && !(options.body instanceof FormData))
    headers.set("Content-Type", "application/json");
  if (requiresAuth) {
    const { data, error } = await authClient.token();
    if (error || !data?.token) throw new Error("Please log in to continue.");
    headers.set("Authorization", `Bearer ${data.token}`);
  }
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(data.message || "The request failed. Please try again.");
  return data;
}
