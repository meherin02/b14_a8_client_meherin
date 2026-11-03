import "./globals.css";
import AppProviders from "@/providers/AppProviders";
import Navbar from "@/components/shared/Navbar";

export const metadata = {
  title: "Community Events",
  description: "Local events that make a difference.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <AppProviders>
          <Navbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">
            {children}
          </main>
          <footer className="border-t border-base-300 px-5 py-7 text-center text-sm text-base-content/70">
            Community Events · Small actions. Stronger communities.
          </footer>
        </AppProviders>
      </body>
    </html>
  );
}
