// components/feed/FeedIntro.tsx

import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function FeedIntro() {
  const totalProjects =
    await prisma.project.count();

  return (
    <section className="border border-gray-300 bg-white p-4">

      <div className="flex items-start justify-between gap-6">

        {/* LEFT */}

        <div className="max-w-2xl">

          <h1 className="text-lg font-bold">
            adflite listings
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-700">

            A focused hiring board for
            marketers, media buyers,
            ad-ops specialists, editors,
            designers, strategists and
            creative operators.

          </p>

          <div className="mt-4 flex items-center gap-4 text-sm">

            <Link
              href="/post"
              className="hover:underline"
            >
              + post a listing
            </Link>

            <Link
              href="/projects"
              className="hover:underline"
            >
              browse projects
            </Link>

          </div>

        </div>

        {/* RIGHT */}

        <div className="shrink-0 border border-gray-300 px-5 py-4 text-center">

          <p className="text-2xl font-bold">
            {totalProjects}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            active listings
          </p>

        </div>

      </div>

    </section>
  );
}