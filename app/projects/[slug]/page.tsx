import { prisma } from "@/lib/prisma";

import Link from "next/link";

import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  const project =
    await prisma.project.findUnique({
      where: {
        slug,
      },

      include: {
        user: true,

        applications: {
          include: {
            user: true,
          },
        },

        pings: true,
      },
    });

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">

      <div className="mb-4">

        <Link
          href="/"
          className="text-sm hover:underline"
        >
          ← back home
        </Link>

      </div>

      <article className="border border-gray-200 bg-white p-6">

        <div className="mb-6 flex items-start justify-between gap-4">

          <div>

            <h1 className="text-2xl font-bold">
              {project.title}
            </h1>

<p className="mt-2 text-sm text-gray-500">

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

          <div className="text-right text-xs text-gray-500">

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

        <div className="mb-6 flex flex-wrap gap-2 text-xs">

          {project.category && (
            <span className="rounded-full border border-gray-300 px-3 py-1">
              {project.category}
            </span>
          )}

          {project.budget && (
            <span className="rounded-full border border-gray-300 px-3 py-1">
              budget: {project.budget}
            </span>
          )}

          {project.timeline && (
            <span className="rounded-full border border-gray-300 px-3 py-1">
              {project.timeline}
            </span>
          )}

        </div>

        <div className="whitespace-pre-line leading-7 text-gray-800">

          {project.description}

        </div>

      </article>

    </main>
  );
}