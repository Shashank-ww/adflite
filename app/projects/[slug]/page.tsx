import Link from "next/link";

import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import ProjectCard from "@/components/cards/ProjectCard";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailsPage({
  params,
}: Props) {

  const session =
    await getServerSession(authOptions);

  const { slug } =
    await params;

  const project =
    await prisma.project.findUnique({
      where: {
        slug,
      },

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
              userId: session.user.id,
            },

            select: {
              userId: true,
            },
          },

          applications: {
            where: {
              userId: session.user.id,
            },

            select: {
              userId: true,
            },
          },
        }),
      },
    });

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">

      {/* TOPBAR */}

      <div className="mb-6 flex items-center justify-between">

        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-black hover:underline"
        >
          ← back home
        </Link>

        <div className="flex items-center gap-2">


        <Link
          href="/post"
          className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          + post project
        </Link>

        </div>

      </div>

      {/* PROJECT */}

      <ProjectCard
        variant="detail"
        project={project}
        sessionUserId={
          session?.user?.id ?? null
        }
        sessionUserEmail={
          session?.user?.email ?? null
        }
      />

    </main>
  );
}