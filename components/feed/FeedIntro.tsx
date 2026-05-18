// components/feed/FeedIntro.tsx

import Link from "next/link";

import { prisma } from "@/lib/prisma";

import FeedIntroActions from "./FeedIntroActions";

export default async function FeedIntro() {

  const totalProjects =
    await prisma.project.count();

  return (
    <section className="border border-gray-300 bg-blue-50 p-4 sm:p-6">

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

        {/* LEFT */}

        <div className="max-w-prose">

          <h1 className="text-3xl font-bold leading-tight text-blue-950 sm:text-4xl">

            dont drift currents. switch waters

          </h1>

          <p className="mt-3 text-sm leading-6 text-blue-900">

            feed for ambitious people looking to switch roles, companies, careers, and industries. 
            find opportunities across startups, media, tech, agencies, and creative work.

            <span className="mt-2 block">

              built for ad operators, marketers,
              buyers, editors, strategists,
              creators and internet talent.

            </span>

          </p>

          <FeedIntroActions />

        </div>

        {/* RIGHT */}

        <div
          className="w-fit shrink-0 border border-blue-200 text-center bg-white px-3 py-1 text-xs text-blue-700">

          <p className="text-2xl font-bold text-blue-950">

            {totalProjects}+

          </p>

          <p className="mt-1 text-xs uppercase tracking-wide text-blue-700">

            active listings

          </p>

        </div>

      </div>

    </section>
  );
}