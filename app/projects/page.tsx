import Link from "next/link";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import ProjectCard from "@/components/cards/ProjectCard";

export default async function ProjectsPage() {
  const session =
    await getServerSession(authOptions);

  const projects =
    await prisma.project.findMany({
      select: {
        id: true,
        slug: true,

        title: true,
        description: true,

        budget: true,
        timeline: true,
        category: true,
        location: true,

        createdAt: true,

        user: {
          select: {
            id: true,

            name: true,
            username: true,
            email: true,

            image: true,

            headline: true,
          },
        },

        _count: {
          select: {
            pings: true,
            applications: true,
          },
        },

        ...(session?.user?.id && {
          savedProjects: {
            where: {
              userId:
                session.user.id,
            },

            select: {
              userId: true,
            },
          },

          applications: {
            where: {
              userId:
                session.user.id,
            },

            select: {
              userId: true,
            },
          },
        }),
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">

      {/* HEADER */}

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
          className="
            border border-gray-300
            px-4 py-2
            text-sm
            hover:bg-gray-50
          "
        >
          + post project
        </Link>

      </div>

      {/* LIST */}

      <section
        className="
          overflow-hidden
          border border-gray-300
          bg-white
        "
      >
        {projects.length > 0 ? (

          projects.map((
              project: typeof projects[number]
            ) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="directory"
              sessionUserId={
                session?.user?.id ?? null
              }
              sessionUserEmail={
                session?.user?.email ?? null
              }
            />
          ))

        ) : (

          <div className="p-10 text-sm text-gray-500">

            no listings yet

          </div>

        )}
      </section>

    </main>
  );
}