// components/feed/FeedIntro.tsx

import { prisma } from "@/lib/prisma";

import FeedIntroActions from "./FeedIntroActions";

import LiveCurrents from "../ui/live-currents";

import LiveCurrentsShell from "../ui/live-currents-shell";

export default async function FeedIntro() {

  const totalProjects =
    await prisma.project.count();

  return (

    <section className="border border-gray-300 bg-blue-50 p-4 sm:p-6">

      <div
        className="
          flex flex-col gap-5
          md:flex-row md:items-start md:justify-between
        "
      >

        {/* LEFT */}

        <div className="max-w-2xl">

          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-blue-800">

            <span>
              {totalProjects}+ live listings
            </span>

            <span className="text-blue-300">
              /
            </span>

            <span>
              find your waters
            </span>

          </div>

          <h1
            className="
              mt-2
              max-w-prose
              text-2xl font-bold leading-tight text-blue-950
              sm:text-3xl
              md:text-4xl
            "
          >

            dont drift currents,
            switchwaters.com

          </h1>

          <p
            className="
              mt-3
              max-w-prose
              text-base leading-6 text-blue-900
              sm:text-balance
            "
          >

            built for ad operators, marketers, media buyers, editors, strategists, creators and internet talent.

          </p>

          <FeedIntroActions />

        </div>

        {/* RIGHT */}

        <div className="w-full justify-end md:w-auto md:justify-start shrink-0 hidden md:block">

          <LiveCurrentsShell>
            <LiveCurrents />
          </LiveCurrentsShell>

        </div>

      </div>

    </section>
  );
}