import AuthProvider from "@/components/providers/SessionProvider";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/components/providers/ToastProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://switchwaters.com"),

  title: {
    default: "Switchwaters",
    template: "%s | Switchwaters",
  },

  description:
    "Switchwaters is a modern classifieds platform for internet professionals. Discover projects, freelance work, jobs, collaborators, services, and opportunities worth switching for.",

  keywords: [
    "classifieds",
    "freelance marketplace",
    "jobs",
    "remote work",
    "projects",
    "internet professionals",
    "creative talent",
    "marketing jobs",
    "tech jobs",
    "startup opportunities",
    "freelancers",
    "contract work",
    "side projects",
    "Switchwaters",
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

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://switchwaters.com",
    siteName: "Switchwaters",
    title: "Switchwaters",
    description:
      "Discover projects, freelance work, jobs, collaborators, and opportunities worth switching for.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Switchwaters",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Switchwaters",
    description:
      "Discover projects, freelance work, jobs, collaborators, and opportunities worth switching for.",
    images: ["/og-image.jpg"],
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