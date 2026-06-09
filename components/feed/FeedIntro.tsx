// components/feed/FeedIntro.tsx

import { prisma } from "@/lib/prisma";

import FeedIntroActions from "./FeedIntroActions";

import LiveCurrents from "../ui/live-currents";

import LiveCurrentsShell from "../ui/live-currents-shell";

export default async function FeedIntro() {

  const totalProjects =
    await prisma.project.count();

  return (

    <section className="relative
    overflow-hidden
    rounded-t-md
    border border-neutral-200
    bg-neutral-50
    p-4 sm:p-6">

{/* BACKGROUND IMAGE */}

<div
  className="
    absolute inset-0
    hidden md:block
    pointer-events-none
  "
>

  {/* COLOR OVERLAY */}

  <div
    className="
      absolute inset-0
      z-10
      bg-neutral-50/10
    "
  />

  {/* IMAGE */}

  <div
    className="
      absolute inset-0
      bg-cover
      bg-center
    "
    style={{
      backgroundImage:
        "url('/assets/professional.jpg')",
    }}
  />

</div>

      <div
        className="relative z-10
          flex flex-col gap-5
          md:flex-row md:items-start md:justify-between
        "
      >

        {/* LEFT */}

        <div className="max-w-xl">

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
              max-w-2xl
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
              max-w-2xl
              text-base leading-6 text-blue-900
              sm:text-balance
            "
          >

            a habitat for marketers, operators, creators, freelancers and teams navigating changing waters.

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