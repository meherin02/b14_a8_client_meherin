import "./globals.css";
import AppProviders from "@/providers/AppProviders";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

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
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-base-100 focus:p-3 focus:font-semibold focus:shadow-lg"
          >
            Skip to content
          </a>
          <Navbar />
          <main
            id="main-content"
            tabIndex={-1}
            className="mx-auto w-full max-w-6xl flex-1 px-5 py-10"
          >
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
