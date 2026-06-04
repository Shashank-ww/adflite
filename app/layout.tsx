import AuthProvider from "@/components/providers/SessionProvider";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/components/providers/ToastProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://switchwaters.com"),

  title: {
    default: "Discover Work Worth Switching For",
    template: "%s | Switchwaters",
  },

  description:
    "Discover projects, freelance work, jobs, collaborators, services, and opportunities worth switching for.",

  keywords: [
    "switchwaters",
    "classifieds",
    "freelance marketplace",
    "remote jobs",
    "project marketplace",
    "freelancers",
    "creative talent",
    "marketing jobs",
    "tech jobs",
    "startup opportunities",
    "side projects",
    "contract work",
    "internet professionals",
  ],

  authors: [
    {
      name: "Switchwaters",
    },
  ],

  creator: "Switchwaters",
  publisher: "Switchwaters",

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "5rr8JiHBM8cHSaevK4DOeuKBU03QXDMhoUYZGQpK3qI",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://switchwaters.com",
    siteName: "Switchwaters",

    title: "Switchwaters — Discover Work Worth Switching For",

    description:
      "Find projects, jobs, collaborators, freelance work, and opportunities worth switching for.",

    images: [
      {
        url: "/assets/professional.jpg",
        width: 1200,
        height: 630,
        alt: "Switchwaters",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Switchwaters — Discover Work Worth Switching For",

    description:
      "Find projects, jobs, collaborators, freelance work, and opportunities worth switching for.",

    images: [
      "/assets/professional.jpg",
    ],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "Business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <AuthProvider>
            <Header />

            <main className="min-h-screen">
              {children}
            </main>

            <Footer />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}