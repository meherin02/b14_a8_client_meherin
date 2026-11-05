import "./globals.css";
import AppProviders from "@/providers/AppProviders";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://communityevents-mauve.vercel.app"),
  title: "Community Events",
  description:
    "Discover, create, and join local community service events. Small actions make stronger communities.",
  applicationName: "Community Events",
  openGraph: {
    type: "website",
    siteName: "Community Events",
    title: "Community Events — Small actions. Stronger communities.",
    description:
      "Find local volunteering opportunities, organize community events, and make a difference together.",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('community-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch(e){}",
          }}
        />
      </head>
      <body>
        <AppProviders>
          <Navbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">
            {children}
          </main>
          <footer className="border-t border-base-300 px-5 py-10 text-sm text-base-content/70">
            <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-6">
              <div>
                <p className="text-lg font-bold text-base-content">
                  Community Events ↗
                </p>
                <p className="mt-3">Small actions. Stronger communities.</p>
              </div>
              <div className="flex flex-wrap gap-6">
                <Link className="link" href="/events">
                  Find an event
                </Link>
                <Link className="link" href="/create-event">
                  Organize an event
                </Link>
                <Link className="link" href="/register">
                  Join the community
                </Link>
              </div>
            </div>
            <p className="mx-auto mt-8 max-w-6xl border-t border-base-300 pt-5 text-xs">
              Built for people who care about their communities.
            </p>
          </footer>
        </AppProviders>
      </body>
    </html>
  );
}
