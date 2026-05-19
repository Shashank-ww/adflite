// components/feed/FeedIntro.tsx

import Link from "next/link";

import { prisma } from "@/lib/prisma";

import FeedIntroActions from "./FeedIntroActions";
import LiveCurrents from "../ui/live-currents";
import LiveCurrentsShell from "../ui/live-currents-shell";

export default async function FeedIntro() {

  const totalProjects =
    await prisma.project.count();

  return (
    <section className="border border-gray-300 bg-blue-50 p-4 sm:p-6">

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

        {/* LEFT */}

        <div className="max-w-prose">

          <h1 className="text-3xl font-bold leading-tight text-blue-950 sm:text-4xl">

            dont drift currents, switchwaters.com

          </h1>

          <p className="mt-3 text-sm leading-6 text-blue-900">

            a feed for ambitious people looking to switch roles, companies, careers, across industries. 
            you can find opportunities with startups, media, tech, agencies, and creative work.

            <span className="mt-2 block">

              built for ad operators, marketers,
              buyers, editors, strategists,
              creators and internet talent.

            </span>

          </p>

          <FeedIntroActions />

        </div>

        {/* RIGHT DO NOT SHOW COUNTER FOR NOW */}

        <div
          className="w-full sm:w-auto shrink-0">

            <LiveCurrentsShell>
  <LiveCurrents />
</LiveCurrentsShell>
        </div>



      </div>

    </section>
  );
}