// /components/ui/live-currents.tsx

import { prisma } from "@/lib/prisma";

function getMarketTemperature(
  applications: number
) {
  if (applications > 40)
    return "overheated";

  if (applications > 20)
    return "warm";

  if (applications > 10)
    return "active";

  return "cooling";
}

function getRandomSignal() {

  const signals = [

    "good operators rarely stay still too long",

    "founders want hybrids now",

    "creative teams getting smaller",

    "media buyers moving independent",

    "everyone hiring. nobody training",

    "remote waters slowing down",

    "good editors disappearing in-house",

  ];

  return signals[
    Math.floor(
      Math.random() * signals.length
    )
  ];
}

export default async function LiveCurrents() {

  const now = new Date();

  const last7Days = new Date(
    now.getTime() -
      7 * 24 * 60 * 60 * 1000
  );

  const [
    recentProjects,
    recentApplications,
    activeUsers,
  ] = await Promise.all([

    prisma.project.count({
      where: {
        createdAt: {
          gte: last7Days,
        },
      },
    }),

    prisma.application.count({
      where: {
        createdAt: {
          gte: last7Days,
        },
      },
    }),

    prisma.user.count({
      where: {
        OR: [

          {
            projects: {
              some: {
                createdAt: {
                  gte: last7Days,
                },
              },
            },
          },

          {
            applications: {
              some: {
                createdAt: {
                  gte: last7Days,
                },
              },
            },
          },

          {
            sentMessages: {
              some: {
                createdAt: {
                  gte: last7Days,
                },
              },
            },
          },

        ],
      },
    }),

  ]);

  const marketTemperature =
    getMarketTemperature(
      recentApplications
    );

  const signal =
    getRandomSignal();

  return (

<aside
  className="
    w-full
    sm:w-64
    lg:w-72
    overflow-hidden

    border-2 border-dashed border-[#20384d]

    bg-[#08131d]

    font-mono
    text-[10px]
    leading-4
    tracking-tight

    text-[#b7d7f2]
  "
>

      {/* HEADER */}

      <div
        className="border-b border-[#173128]
        px-3 py-2"
      >

        <p
          className="text-xs
          uppercase tracking-wide
          text-[#7dd3fc]"
        >

          switchwaters.terminal

        </p>

        <div className="text-[#7fa38d] gap-2 mt-1">

  <span>
    rowing in open waters
  </span>


</div>


      </div>

      {/* TERMINAL FEED */}

<div
  className="
    max-h-60
    overflow-y-auto
    space-y-2
    p-3
    pb-3
    text-[10px]
    scrollbar-thin
    scrollbar-thumb-[#173128]
    scrollbar-track-transparent
  "
>

    <div className="text-[#7fa38d] flex items-center gap-2">
             <span className="text-[#39ff14]"> ● </span>
          switchwaters.sys//:live

        </div>

        {/* LIVE EVENTS */}

        <div className="space-y-2">

          <div>

            <p className="text-[#7ab7ff]">

              [11:44] new role

            </p>

            <p className="pl-3 text-[#7f9b89]">

              media buyer

            </p>

          </div>

          <div>

            <p className="text-[#7ab7ff]">

              [11:51] startup tides

            </p>

            <p className="pl-3 text-[#7f9b89]">

              increasing

            </p>

          </div>

          <div>

            <p className="text-[#7ab7ff]">

              [12:08] operators active

            </p>

            <p className="pl-3 text-[#7f9b89]">

              {activeUsers} online today

            </p>

          </div>

        </div>

        {/* CONDITIONS */}

        <div
          className="border-t
    border-dashed
    border-[#39ff14]/30
    pt-2"
        >

          <p className="text-[#39ff14]/60">

            currents active

            <span className="float-right text-white">

              {recentProjects}

            </span>

          </p>

          <p className="text-[#39ff14]/60">

            roles drifting

            <span className="float-right text-white">

              {recentApplications}

            </span>

          </p>

          <p className="text-[#39ff14]/60">

            market temp

            <span className="float-right text-white">

              {marketTemperature}

            </span>

          </p>

        </div>

        {/* SIGNAL */}

        <div
          className="border-t
    border-dashed
    border-[#39ff14]/30
    pt-3"
        >

          <p className="mb-1 text-[#7ab7ff]">

            last signal

          </p>

          <p className="text-[#7f9b89]">

            "{signal}"

          </p>

        </div>

{/* FOOTER */}

<div
  className="
    border-t
    border-dashed
    border-[#39ff14]/30
    pt-3
    font-mono
    text-[#7fa38d]
  "
>

  <div className="flex items-center gap-2">

    <span className="text-[#39ff14]/70">
      root@switchwaters:~
    </span>

    <span>
      live currents
    </span>

    <span
      className="
        inline-block
        h-2.5
        w-1.5
        animate-pulse
        bg-[#39ff14]/60
      "
    />

  </div>

</div>


      </div>

    </aside>

  );
}