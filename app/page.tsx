import Sidebar from "@/components/layout/Sidebar";

import ProjectFeed from "@/components/feed/ProjectFeed";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata = {
  openGraph: {
    title: "Switchwaters",
    description:
      "Discover work, projects, people, and opportunities worth switching for.",
    images: [
      {
        url: "https://switchwaters.com/assets/professional.jpg",
        width: 1200,
        height: 630,
        alt: "Switchwaters",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: [
      "https://switchwaters.com/assets/professional.jpg",
    ],
  },
};

  const structuredData = 
  {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Switchwaters",
  "url": "https://switchwaters.com",
  "description": "Discover work, projects, people, and opportunities worth switching for.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://switchwaters.com/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function HomePage({
  searchParams,
}: Props) {

  const {
    q,
    category,
  } = await searchParams;

  return (
        <>
      <Script
        id="switchwaters-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Switchwaters",
          url: "https://switchwaters.com",
          logo: "https://switchwaters.com/logo.png",
        })}
      </Script>

    <main className="min-h-screen">

      <div className="mx-auto flex max-w-6xl gap-4 p-4">

        <Sidebar />

        <ProjectFeed
          query={q}
          category={category}
        />

      </div>

    </main>
    </>
  );
}