import { prisma } from "@/lib/prisma";

import Link from "next/link";

export default async function ProjectsPage() {
  const projects =
    await prisma.project.findMany({
      include: {
        user: true,
        pings: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            projects
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            explore all active listings
          </p>
        </div>

        <Link
          href="/post"
          className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          + post project
        </Link>

      </div>

      <div className="flex flex-col border border-gray-300 bg-white">

        {projects.length > 0 ? (
          projects.map((project) => (
            <article
              key={project.slug}
              className="border-b border-gray-200 p-5 transition hover:bg-gray-50"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="min-w-0 flex-1">

<Link
  href={`/projects/${project.slug}`}
  className="text-base font-bold leading-6 hover:underline"
>
  {project.title}
</Link>

<p className="mt-1 text-xs text-gray-500">

  posted by{" "}

  {project.user.username ? (

    <Link
      href={`/u/${project.user.username}`}
      className="hover:underline"
    >
      {project.user.username || "anonymous"}
    </Link>

  ) : (

    <span>
      {project.user.username || "anonymous"}
    </span>

  )}

</p>

                </div>

                <div className="shrink-0 text-right text-xs text-gray-400">

                  <p>
                    {new Date(
                      project.createdAt
                    ).toLocaleDateString()}
                  </p>

                  <p className="mt-2">
                    {project.pings.length} pings
                  </p>

                </div>

              </div>

<Link
  href={`/projects/${project.slug}`}
  className="block"
>

  <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-700">
    {project.description}
  </p>

</Link>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">

                {project.category && (
                  <span className="border border-gray-300 bg-gray-50 px-2 py-1">
                    {project.category}
                  </span>
                )}

                {project.budget && (
                  <span className="border border-gray-300 bg-gray-50 px-2 py-1">
                    budget: {project.budget}
                  </span>
                )}

                {project.timeline && (
                  <span className="border border-gray-300 bg-gray-50 px-2 py-1">
                    scope: {project.timeline}
                  </span>
                )}

              </div>

            </article>
          ))
        ) : (
          <div className="p-8 text-sm text-gray-500">
            no listings yet
          </div>
        )}

      </div>

    </main>
  );
}