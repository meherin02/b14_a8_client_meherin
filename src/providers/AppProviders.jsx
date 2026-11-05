"use client";
import { Toaster } from "sonner";
export default function AppProviders({ children }) {
  return (
    <>
      {children}
      <Toaster richColors position="top-right" duration={3000} />
    </>
  );
}
